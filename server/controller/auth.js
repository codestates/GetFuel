import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as usersRepository from '../data/auth.js';
import { config } from '../configuration/config.js';

export async function signup(req, res) {
  const { email, nickname, password } = req.body;
  console.log(email);

  const found = await usersRepository.findByEmail(email);
  if (found) {
    return res
      .status(409)
      .json({ message: `${email}은 이미 가입된 유저 입니다.` });
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await usersRepository.createUser({
    email,
    nickname,
    password: hashed,
  });
  res.status(201).json({ userId, email });
}

export async function signin(req, res) {
  const { email, password } = req.body;
  const user = await usersRepository.findByEmail(email);
  if (!user) {
    return res
      .status(401)
      .json({ message: 'email 또는 비밀번호가 일치하지 않습니다.' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: 'email 또는 비밀번호가 일치하지 않습니다.' });
  }

  const accessToken = jwt.sign({ id: user.id }, config.jwt.access_secret, {
    expiresIn: config.jwt.access_expiresInSec,
  });

  const refreshToken = jwt.sign({ id: user.id }, config.jwt.refresh_secret, {
    expiresIn: config.jwt.refresh_expiresInSec,
  });

  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.status(200).json({ accessToken, email, userId: user.id });
}

export async function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.json({ data: null, message: ' refresh token not provided ' });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.refresh_secret);
    const found = await usersRepository.findById(decoded.id);
    if (!found) {
      return res.status(403).json({ message: ' Forbidden ' });
    }
    const accessToken = jwt.sign({ id: found.id }, config.jwt.access_secret, {
      expiresIn: config.jwt.access_expiresInSec,
    });
    res.json({
      accessToken,
      userId: found.id,
      message: ' complete access token issuance ',
    });
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'invalid signature' ||
      error.name === 'jwt malformed'
    ) {
      return res.status(401).json({ message: ' Unauthorized ' });
    }
    next(error);
  }
}

export async function signout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res
    .clearCookie('refreshToken', { path: '/' })
    .status(200)
    .json({ message: 'Logout' });
}

export async function updateInfo(req, res) {
  const { password } = req.body;
  const id = req.params.id;
  // console.log('컨트롤러에 들어옴? ');
  // console.log(password);
  // console.log(id);

  const user = await usersRepository.findById(id);
  if (!user) {
    return res.status(404).json({ message: ' 회원 정보를 찾을 수 없습니다. ' });
  }

  if (user.id !== req.userId) {
    return res.sendStatus(403);
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const updated = await usersRepository.update(id, hashed);
  res.status(200).json(updated);
}

export async function deleteAccount(req, res) {
  const id = req.params.id;
  console.log('컨트롤러 작동중? ');
  console.log(id);

  const user = await usersRepository.findById(id);
  if (!user) {
    return res.status(404).json({ message: ' 회원 정보를 찾을 수 없습니다. ' });
  }

  if (user.id !== req.userId) {
    return res.sendStatus(403);
  }
  await usersRepository.removeUser(id);
  res.sendStatus(204);
}
