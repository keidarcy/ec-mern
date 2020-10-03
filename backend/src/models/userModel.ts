import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: String,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
