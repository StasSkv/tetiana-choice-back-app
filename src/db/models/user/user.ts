import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  password: string;
  email: string;
  dateOfBirth: string;
  deliveryOption: {
    method: string;
    city: string;
    department: string;
  };
  paymentOption: {
    method: string;
    cardNumber: string;
    cardExpiration: string;
  };
  otp?: string;
  otpExpiresAt?: Date;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  toJSON(): any;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    dateOfBirth: { type: String, default: '' },
    deliveryOption: {
      method: {
        type: String,
        enum: ['nova_poshta', 'ukrposhta', 'self_pickup', ''],
        default: '',
      },
      city: { type: String, default: '' },
      department: { type: String, default: '' },
    },
    paymentOption: {
      method: {
        type: String,
        enum: ['card', 'cash', 'overpayment', ''],
        default: '',
      },
    },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  'User',
  userSchema,
);
