
import mongoose from "mongoose";
import { UserRole } from "../../../enums/user";




export type IUser = {
    _id?: mongoose.Types.ObjectId;
    user_id?: string;
    name: string;
    email:string;
    phone_number: string;
    password:string;
    address: string;
    role:UserRole.USER;
  };
