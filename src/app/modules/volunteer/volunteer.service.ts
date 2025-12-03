/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IVolunteer } from './volunteer.interface';
import Volunteer from './volunteer.model';


// create volunteer
const createVolunteer = async (volunteer: IVolunteer): Promise<IVolunteer | null> => {
  const isVolunteerExistByEmail = await (Volunteer as any).isVolunteerExistByEmail(volunteer.email);
  if (isVolunteerExistByEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Volunteer with this email already exists');
  }

  // Check if volunteer exists by phone number
  const isVolunteerExistByPhone = await (Volunteer as any).isVolunteerExistByPhone(volunteer.phoneNumber);
  if (isVolunteerExistByPhone) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Volunteer with this phone number already exists');
  }


  // Check if NID already exists
  const isNidExist = await (Volunteer as any).isNidExist(volunteer.nidNumber);
  if (isNidExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Volunteer with this NID number already exists');
  }

  console.log("volunteer", volunteer)

  const createdVolunteer = await Volunteer.create(volunteer);
  return createdVolunteer;
};


// get all volunteers
const getAllVolunteers = async (): Promise<IVolunteer[] | null> => {
  const result = await Volunteer.find()
    console.log(result, 'result all vilunteer')
  return result;
};

// get single volunteer

const getSingleVolunteer = async (id: string): Promise<IVolunteer | null> => {
  const isVolunteerExist = await Volunteer.findById(id);
  if (!isVolunteerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Volunteer not found');
  }
  
  const singleVolunteer = await Volunteer.findById(id);
  return singleVolunteer;
};

const updateVolunteer = async (
  id: string,
  payload: Partial<IVolunteer>
): Promise<IVolunteer | null> => {
  const isVolunteerExist = await Volunteer.findById(id);
  if (!isVolunteerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Volunteer not found');
  }

  // If updating email, check for duplicates
  if (payload.email && payload.email !== isVolunteerExist.email) {
    const existingVolunteerWithEmail = await Volunteer.findOne({ 
      email: payload.email, 
      _id: { $ne: id } 
    });
    if (existingVolunteerWithEmail) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already in use by another volunteer');
    }
  }

  // If updating phone number, check for duplicates
  if (payload.phoneNumber && payload.phoneNumber !== isVolunteerExist.phoneNumber) {
    const existingVolunteerWithPhone = await Volunteer.findOne({ 
      phoneNumber: payload.phoneNumber, 
      _id: { $ne: id } 
    });
    if (existingVolunteerWithPhone) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number already in use by another volunteer');
    }
  }

  // If updating NID, check for duplicates
  if (payload.nidNumber && payload.nidNumber !== isVolunteerExist.nidNumber) {
    const existingVolunteerWithNid = await Volunteer.findOne({ 
      nidNumber: payload.nidNumber, 
      _id: { $ne: id } 
    });
    if (existingVolunteerWithNid) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'NID number already in use by another volunteer');
    }
  }

  const result = await Volunteer.findByIdAndUpdate(id, payload, {
    new: true,
  })
    .populate('user_id', 'name email phone_number')
    .populate('createdBy', 'name email')
    .populate('permanentAddress.districtId', 'name')
    .populate('presentAddress.districtId', 'name')
    .populate('documents', 'url title');
  
  return result;
};

const deleteVolunteer = async (id: string): Promise<IVolunteer | null> => {
  const isVolunteerExist = await Volunteer.findById(id);
  if (!isVolunteerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Volunteer not found');
  }

  const result = await Volunteer.findByIdAndDelete(id);
  return result;
};

// Additional service for status update
const updateVolunteerStatus = async (
  id: string,
  status: string
): Promise<IVolunteer | null> => {
  const isVolunteerExist = await Volunteer.findById(id);
  if (!isVolunteerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Volunteer not found');
  }

  const validStatuses = ['pending', 'approved', 'rejected'];
  if (!validStatuses.includes(status)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid status value');
  }

  const result = await Volunteer.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate('user_id', 'name email phone_number')
    .populate('createdBy', 'name email')
    .populate('permanentAddress.districtId', 'name')
    .populate('presentAddress.districtId', 'name')
    .populate('documents', 'url title');
  
  return result;
};

export const VolunteerService = {
  createVolunteer,
  getAllVolunteers,
  getSingleVolunteer,
  updateVolunteer,
  deleteVolunteer,
  updateVolunteerStatus,
};