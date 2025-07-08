import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  password: string;
  email?: string;
  age?: number;
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
    email: { type: String, unique: true, sparse: true },
    age: { type: Number },
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
