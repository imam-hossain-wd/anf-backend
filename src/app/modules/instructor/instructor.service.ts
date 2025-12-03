/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IInstructor } from './instructor.interface';
import Instructor from './instructor..model';


const createInstructor = async (instructor: IInstructor): Promise<IInstructor | null> => {
  // Check if instructor exists with same name and contact
//   const isInstructorExist = await (Instructor as any).isInstructorExist(
//     instructor?.name, 
//     instructor?.phone_number
//   );
  
//   if (isInstructorExist) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST, 
//       'Instructor with this name and contact already exists'
//     );
//   }

  const createdInstructor = await Instructor.create(instructor);
  return createdInstructor;
};

const getAllInstructors = async (): Promise<IInstructor[] | null> => {
  const result = await Instructor.find()
    .populate('photo', 'url title alt')
    .sort({ createdAt: -1 });
  return result;
};

const getSingleInstructor = async (id: string): Promise<IInstructor | null> => {
  const isInstructorExist = await Instructor.findById(id);
  if (!isInstructorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Instructor not found');
  }
  
  const singleInstructor = await Instructor.findById(id)
    .populate('photo', 'url title alt');
  return singleInstructor;
};

const updateInstructor = async (
  id: string,
  payload: Partial<IInstructor>
): Promise<IInstructor | null> => {
  const isInstructorExist = await Instructor.findById(id);
  if (!isInstructorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Instructor not found');
  }

  // If updating name and contact, check for duplicates
  if (payload.name && payload.contact) {
    const existingInstructor = await Instructor.findOne({ 
      name: payload.name, 
      contact: payload.contact,
      _id: { $ne: id } 
    });
    
    if (existingInstructor) {
      throw new ApiError(
        httpStatus.BAD_REQUEST, 
        'Another instructor with this name and contact already exists'
      );
    }
  }

  const result = await Instructor.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('photo', 'url title alt');
  
  return result;
};

const deleteInstructor = async (id: string): Promise<IInstructor | null> => {
  const isInstructorExist = await Instructor.findById(id);
  if (!isInstructorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Instructor not found');
  }

  const result = await Instructor.findByIdAndDelete(id);
  return result;
};

// Get instructors by speciality
const getInstructorsBySpeciality = async (speciality: string): Promise<IInstructor[] | null> => {
  const result = await Instructor.find({ speciality })
    .populate('photo', 'url title alt')
    .sort({ createdAt: -1 });
  
  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No instructors found with this speciality');
  }
  
  return result;
};

// Get featured instructors (most recent)
const getFeaturedInstructors = async (limit: number = 6): Promise<IInstructor[] | null> => {
  const result = await Instructor.find()
    .populate('photo', 'url title alt')
    .sort({ createdAt: -1 })
    .limit(limit);
  
  return result;
};

export const InstructorService = {
  createInstructor,
  getAllInstructors,
  getSingleInstructor,
  updateInstructor,
  deleteInstructor,
  getInstructorsBySpeciality,
  getFeaturedInstructors,
};