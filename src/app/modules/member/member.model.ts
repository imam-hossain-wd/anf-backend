import mongoose, { Schema } from 'mongoose';
import { IMember } from './member.interface';
import { MemberStatus, MemberType, PaymentType } from '../../../enums/member';

const MemberSchema: Schema = new Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: false 
    },
    memberType: { 
      type: String, 
      enum: Object.values(MemberType), 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    fatherName: { 
      type: String, 
      required: true 
    },
    isForeigner: { 
      type: Boolean, 
      default: false 
    },
    phoneNumber: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    profession: { 
      type: String, 
      required: true 
    },
    reference: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    paymentType: { 
      type: String, 
      enum: Object.values(PaymentType), 
      required: true 
    },
    membershipNumber: { 
      type: String, 
      required: true, 
      unique: true 
    },
    joinedAt: { 
      type: Date, 
      required: true 
    },
    status: { 
      type: String, 
      enum: Object.values(MemberStatus), 
      default: MemberStatus.ACTIVE 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }
  },
  {
    timestamps: true,
  }
);



// Static method to check if member exists by email
MemberSchema.statics.isMemberExist = async function (
  email: string
): Promise<IMember | null> {
  return await this.findOne(
    { email },
    { _id: 1, membershipNumber: 1, status: 1, email: 1 }
  );
};

// Static method to check if member exists by phone number
MemberSchema.statics.isPhoneNumberExist = async function (
  phoneNumber: string
): Promise<IMember | null> {
  return await this.findOne(
    { phoneNumber },
    { _id: 1, membershipNumber: 1, status: 1, phoneNumber: 1 }
  );
};

const Member = mongoose.model<IMember>('Member', MemberSchema);

export default Member;