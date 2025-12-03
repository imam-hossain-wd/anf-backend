import mongoose from "mongoose";

export type IInstructor = {
  _id?: mongoose.Types.ObjectId;
  instructor_id?: string;
  name: string;
  bio: string;
  photo: string;
  speciality: string;
  contact: string;
  email: string;
  phone_number: string;
  password: string;
  need_password_change?: boolean;
  role: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};