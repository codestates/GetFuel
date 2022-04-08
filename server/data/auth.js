import Mongoose from 'mongoose';
import { userVirtualId } from '../database/database.js';

const userSchema = new Mongoose.Schema({
  email: { type: String, required: true },
  nickname: { type: String, required: true },
  password: { type: String, required: true },
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
