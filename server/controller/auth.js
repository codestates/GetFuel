import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as usersRepository from '../data/auth.js'
import { config } from '../configuration/config.js';

export async function signup(req, res) {
  const { email, nickname, password } = req.body
  console.log(email, nickname, password);
  const found = await usersRepository.findByEmail(email);
  if(found) {
    return res.status(409).json({ message: `${email}은 이미 가입된 유저 입니다.` })
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds)
  const userId = await usersRepository.createUser({
    email,
    nickname,
    password: hashed,
  })

  res.status(201).json({ userId, email });
};

export async function signin(req, res) {
  const { email, password } = req.body;
  const user = await usersRepository.findByEmail(email);
  if(!user) {
    return res.status(401).json( { message: 'email 또는 비밀번호가 일치하지 않습니다.' } )
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if(!isValidPassword) {
    return res.status(401).json( { message: 'email 또는 비밀번호가 일치하지 않습니다.' } )
  }

  const accessToken = jwt.sign(
    { id: user.id },
    config.jwt.access_secret,
    { expiresIn: config.jwt.access_expiresInSec }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    config.jwt.refresh_secret,
    { expiresIn: config.jwt.refresh_expiresInSec }
  );

  res.cookie('refreshToken', refreshToken, { httpOnly: true })
  res.status(200).json( { accessToken, email } );
};

export async function signout(req, res) {

}

export async function deleteAccount(req, res) {
  
}
