import mongoose, { Schema } from 'mongoose';
import { IInstructor } from './instructor.interface';
import config from '../../../config';
import bcrypt from "bcrypt";
import { ENUM_USER_ROLE } from '../../../enums/user';


const InstructorSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    bio: { 
      type: String, 
      required: true,
      trim: true 
    },
    photo: { 
      type: String, 
      required: true 
    },
    speciality: { 
      type: String, 
      required: true,
      trim: true 
    },
    contact: { 
      type: String, 
      required: true,
      trim: true 
    },
    // New fields added
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      default: '123456', // Default password
      minlength: 6
    },
    need_password_change: {
      type: Boolean,
      default: true // Default true, meaning they need to change password
    },
    role: {
      type: String,
      enum: ENUM_USER_ROLE.INSTRUCTOR,
    },
  },
  {
    timestamps: true
  }
);


// Check if instructor exists by email - Static Method
InstructorSchema.statics.isInstructorExistByEmail = async function (
  email: string
): Promise<IInstructor | null> {
  return await this.findOne(
    { email },
    { _id: 1, email: 1, role: 1, name: 1 }
  );
};

// Check if instructor exists by phone number - Static Method
InstructorSchema.statics.isInstructorExistByPhone = async function (
  phone_number: string
): Promise<IInstructor | null> {
  return await this.findOne(
    { phone_number },
    { _id: 1, phone_number: 1, role: 1, name: 1 }
  );
};



// Indexes for better query performance
// InstructorSchema.index({ email: 1 });
// InstructorSchema.index({ phone_number: 1 });
// InstructorSchema.index({ role: 1 });
// InstructorSchema.index({ status: 1 });

const Instructor = mongoose.model<IInstructor>('Instructor', InstructorSchema);

export default Instructor;