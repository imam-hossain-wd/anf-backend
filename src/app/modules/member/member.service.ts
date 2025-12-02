/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IMember } from './member.interface';
import Member from './member.model';

const createMember = async (member: IMember): Promise<IMember | null> => {
  // Check if member exists by email
  const isMemberExistByEmail = await (Member as any).isMemberExist(member.email);
  if (isMemberExistByEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Member with this email already exists');
  }

  // Check if member exists by phone number
  const isMemberExistByPhone = await (Member as any).isPhoneNumberExist(member.phoneNumber);
  if (isMemberExistByPhone) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Member with this phone number already exists');
  }

  const createdMember = await Member.create(member);
  return createdMember;
};

const getAllMembers = async (): Promise<IMember[] | null> => {
  const result = await Member.find()
    .populate('user_id', 'name email phone_number')
    .populate('createdBy', 'name email');
  return result;
};

const getSingleMember = async (id: string): Promise<IMember | null> => {
  const isMemberExist = await Member.findById(id);
  if (!isMemberExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
  }
  
  const singleMember = await Member.findById(id)
    .populate('user_id', 'name email phone_number')
    .populate('createdBy', 'name email');
  return singleMember;
};

const updateMember = async (
  id: string,
  payload: Partial<IMember>
): Promise<IMember | null> => {
  const isMemberExist = await Member.findById(id);
  if (!isMemberExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
  }

  // If updating email, check for duplicates
  if (payload.email && payload.email !== isMemberExist.email) {
    const existingMemberWithEmail = await Member.findOne({ 
      email: payload.email, 
      _id: { $ne: id } 
    });
    if (existingMemberWithEmail) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already in use by another member');
    }
  }

  // If updating phone number, check for duplicates
  if (payload.phoneNumber && payload.phoneNumber !== isMemberExist.phoneNumber) {
    const existingMemberWithPhone = await Member.findOne({ 
      phoneNumber: payload.phoneNumber, 
      _id: { $ne: id } 
    });
    if (existingMemberWithPhone) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number already in use by another member');
    }
  }

  const result = await Member.findByIdAndUpdate(id, payload, {
    new: true,
  })
    .populate('user_id', 'name email phone_number')
    .populate('createdBy', 'name email');
  
  return result;
};

const deleteMember = async (id: string): Promise<IMember | null> => {
  const isMemberExist = await Member.findById(id);
  if (!isMemberExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
  }

  const result = await Member.findByIdAndDelete(id);
  return result;
};

export const MemberService = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
};