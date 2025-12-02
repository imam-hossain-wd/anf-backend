/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { generateRamdonUserId } from '../../../shared/generateRamdomId';
import User from './user.model';



// type SortOrder = 1 | -1 | 'asc' | 'desc';



const createUser = async (user: IUser): Promise<IUser | null> => {

  console.log(user, 'user service')
  //@ts-ignore
  const isUserExist = await User.isUserExist(user.email);
  console.log(isUserExist, 'isUserExist')

  if (isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is already exits');
  }

  const userId = generateRamdonUserId();
  //@ts-ignore
  user.user_id = userId;
  const createdUser = await User.create(user);
  console.log(createdUser, 'createdUser successsfully----')
  return createdUser;
};



// const getAllUsers = async (options:any,filters:any) => {
//   const { page, limit, skip, sortBy, sortOrder } =
//   paginationHelpers.calculatePagination(options);
// const { searchTerm, ...filtersData } = filters;
// const andConditions: any[] = [];

// if (searchTerm) {
//   const orConditions = userSearchAbleFields.map(field => ({
//     [field]: {
//       $regex: searchTerm,
//       $options: 'i',
//     },
//   }));
//   andConditions.push({ $or: orConditions });
// }

// Object.keys(filtersData).forEach(field => {
//   if (userFilterableFields.includes(field) && filtersData[field]) {
//     andConditions.push({
      
//       [field]: filtersData[field],
//     });
//   }
// });

// // Combine all conditions
// const whereConditions =
//   andConditions.length > 0 ? { $and: andConditions } : {};

// // Ensure sortOrder is of the correct type
// const sortConditions: { [key: string]: SortOrder } = {};
// if (sortBy && sortOrder) {
//   const validSortOrder: SortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : (sortOrder === '1' ? 1 : -1);
//   sortConditions[sortBy] = validSortOrder;
// }

// // Querying the database
// const [data, total] = await Promise.all([
//   User.find(whereConditions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit),
//     User.countDocuments(whereConditions),
// ]);

// return {
//   meta: {
//     page,
//     limit,
//     total,
//     count: data.length,
//   },
//   data,
// };
// };


const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};



const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isUserExits = await User.findOne({ _id: id });
  if (!isUserExits) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found');
  }
  const singleUser = await User.findOne({ _id: id });
  return singleUser;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
