import mongoose from "mongoose";

export type IVolunteerAddress = {
  districtId: mongoose.Types.ObjectId;
  address: string;
};

export type IVolunteer = {
  _id?: mongoose.Types.ObjectId;
  user_id?: mongoose.Types.ObjectId;
  volunteer_id?: string;
  name: string;
  isForeigner: boolean;
  phoneNumber: string;
  emergencyPhone: string;
  email: string;
  facebookProfile?: string;
  nidNumber: string;
  education: string;
  profession: string;
  volunteerArea: string;
  specialSkill?: string;
  permanentAddress: IVolunteerAddress;
  presentAddress: IVolunteerAddress;
  status: string;
  documents: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  isModified?(arg0: string): unknown;
  isNew?: any;
};