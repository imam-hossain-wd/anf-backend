import mongoose, { Schema } from 'mongoose';
import { IVolunteer, IVolunteerAddress } from './volunteer.interface';
import { VolunteerArea, VolunteerStatus } from '../../../enums/volunteer';


const AddressSchema = new Schema<IVolunteerAddress>(
  {
    districtId: { 
      type: Schema.Types.ObjectId, 
      ref: 'District', 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    }
  },
  { _id: false }
);

const VolunteerSchema: Schema = new Schema(
  {
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: false 
    },
    volunteer_id: { 
      type: String, 
      unique: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    isForeigner: { 
      type: Boolean, 
      default: false 
    },
    phoneNumber: { 
      type: String, 
      required: true,
      unique: true 
    },
    emergencyPhone: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true,
      unique: true 
    },
    facebookProfile: { 
      type: String, 
      required: false 
    },
    nidNumber: { 
      type: String, 
      required: true,
      unique: true 
    },
    education: { 
      type: String, 
      required: true 
    },
    profession: { 
      type: String, 
      required: true 
    },
    volunteerArea: { 
      type: String, 
      enum: Object.values(VolunteerArea), 
      required: true 
    },
    specialSkill: { 
      type: String, 
      required: false 
    },
    permanentAddress: { 
      type: AddressSchema, 
      required: true 
    },
    presentAddress: { 
      type: AddressSchema, 
      required: true 
    },
    status: { 
      type: String, 
      enum: Object.values(VolunteerStatus), 
      default: VolunteerStatus.PENDING 
    },
    documents: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Media' 
    }],
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

// Pre-save hook to generate volunteer_id
// VolunteerSchema.pre('save', async function (next) {
//   const volunteer = this as any;
  
//   // Generate volunteer_id if not present
//   if (!volunteer.volunteer_id) {
//     volunteer.volunteer_id = await generateVolunteerId();
//   }
  
//   next();
// });

// Static method to check if volunteer exists by email
VolunteerSchema.statics.isVolunteerExistByEmail = async function (
  email: string
): Promise<IVolunteer | null> {
  return await this.findOne(
    { email },
    { _id: 1, volunteer_id: 1, status: 1, email: 1 }
  );
};

// Static method to check if volunteer exists by phone number
VolunteerSchema.statics.isVolunteerExistByPhone = async function (
  phoneNumber: string
): Promise<IVolunteer | null> {
  return await this.findOne(
    { phoneNumber },
    { _id: 1, volunteer_id: 1, status: 1, phoneNumber: 1 }
  );
};

// Static method to check if NID already exists
VolunteerSchema.statics.isNidExist = async function (
  nidNumber: string
): Promise<IVolunteer | null> {
  return await this.findOne(
    { nidNumber },
    { _id: 1, volunteer_id: 1, status: 1, nidNumber: 1 }
  );
};

const Volunteer = mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);

export default Volunteer;