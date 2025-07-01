import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] },
  },
  { timestamps: true, versionKey: false },
);

export const UserModel = mongoose.model('User', UserSchema);