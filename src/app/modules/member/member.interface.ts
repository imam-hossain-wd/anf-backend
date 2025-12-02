import mongoose from "mongoose";

export type IMember = {
  _id?: mongoose.Types.ObjectId;
  user_id?: mongoose.Types.ObjectId;
  memberType: string;
  name: string;
  fatherName: string;
  isForeigner: boolean;
  phoneNumber: string;
  email: string;
  profession: string;
  reference: string;
  address: string;
  paymentType: string;
  membershipNumber: string;
  joinedAt: Date;
  status: string;
  createdBy: mongoose.Types.ObjectId;
  isModified?(arg0: string): unknown;
  isNew?: any;
};