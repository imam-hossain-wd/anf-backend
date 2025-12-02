import mongoose, { Schema } from 'mongoose';
import { UserRole } from '../../../enums/user';
import { IUser } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';




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

//Pre-Save Hook: password hashing
UserSchema.pre(
  'save',
  async function (this: IUser) {
    if (this.isModified('password') || this.isNew) {
      this.password = await bcrypt.hash(
        this.password,
        Number(config.bycrypt_salt_rounds)
      );
    }
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

// check  password match  Static Method

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


const User = mongoose.model<IUser>('User', UserSchema);

export default User;
