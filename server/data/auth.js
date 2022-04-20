import Mongoose from 'mongoose';
import { userVirtualId } from '../database/database.js';

const userSchema = new Mongoose.Schema({
  type: {
    type: String,
    default: 'user',
    enum: ['user', 'kakao', 'google'],
  },
  email: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  password: { type: String },
  kakaoAccessToken: String,
});

userVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);

export async function findByEmail(email) {
  return User.findOne({ email });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

export async function update(id, password) {
  return User.findByIdAndUpdate(id, { password }, { returnOriginal: false });
}

export async function removeUser(id) {
  return User.findByIdAndDelete(id);
}

export async function findAndUpdateUser(filter, update, options) {
  return User.findOneAndUpdate(filter, update, options);
}

export default User;
