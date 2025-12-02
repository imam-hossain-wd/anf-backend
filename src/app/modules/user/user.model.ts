import mongoose, { Schema } from 'mongoose';
import { UserRole } from '../../../enums/user';
import { IUser } from './user.interface';




const UserSchema: Schema = new Schema(
  {
    user_id: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    }
  },
  {
    timestamps: true,
  }
);

//check user exit  Static Method
UserSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await this.findOne(
    { email },
    { _id: 1, password: 1, role: 1, email: 1 }
  );
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
