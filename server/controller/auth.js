import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
<<<<<<< HEAD
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
=======
import * as usersRepository from '../data/auth.js';
import { config } from '../configuration/config.js';

export async function signup(req, res) {
  const { email, nickname, password } = req.body;
  console.log(email, nickname, password);
  const found = await usersRepository.findByEmail(email);
  if (found) {
    return res
      .status(409)
      .json({ message: `${email}은 이미 가입된 유저 입니다.` });
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
  const userId = await usersRepository.createUser({
    email,
    nickname,
    password: hashed,
<<<<<<< HEAD
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

  res.cookie('refreshToken', refreshToken, { httpOnly: true });
  res.status(200).json( { accessToken, email } );
};
=======
  });
  res.status(201).json({ userId, email });
}

export async function signin(req, res) {
  const { email, password } = req.body;
  console.log(password)
  console.log(email)
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
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0

export async function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;

<<<<<<< HEAD
  if(!refreshToken) {
    return res.json( { data: null, message: ' refresh token not provided ' } )
=======
  if (!refreshToken) {
    return res.json({ data: null, message: ' refresh token not provided ' });
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.refresh_secret);
    const found = await usersRepository.findById(decoded.id);
<<<<<<< HEAD
    if(!found) {
      return res.status(403).json({ message: ' Forbidden ' })
    }
    const accessToken = jwt.sign(
      { id: found.id },
      config.jwt.access_secret,
      { expiresIn: config.jwt.access_expiresInSec }
    );
    res.json( { accessToken, id: found.id , message: ' complete access token issuance ' } )
  }
  catch(error) {
    console.log(error)
    if(
      error.name === 'TokenExpiredError'||
      error.name === 'invalid signature'||
      error.name === 'jwt malformed'
      ) {
      return res.status(401).json({ message: ' Unauthorized '})
=======
    if (!found) {
      return res.status(403).json({ message: ' Forbidden ' });
    }
    const accessToken = jwt.sign({ id: found.id }, config.jwt.access_secret, {
      expiresIn: config.jwt.access_expiresInSec,
    });
    res.json({
      accessToken,
      id: found.id,
      message: ' complete access token issuance ',
    });
  } catch (error) {
    console.log(error);
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'invalid signature' ||
      error.name === 'jwt malformed'
    ) {
      return res.status(401).json({ message: ' Unauthorized ' });
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
    }
    next(error);
  }
}

export async function signout(req, res) {
  const refreshToken = req.cookies.refreshToken;
<<<<<<< HEAD
  if(!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.clearCookie('refreshToken', { path: '/' } ).status(200).json({ message: 'Logout' })
}

export async function updateInfo(req, res) {
  const { password } = req.body
  const id = req.params.id
  const user = await usersRepository.findById(id);
  if(!user) {
    return res.status(404).json({ message: ' 회원 정보를 찾을 수 없습니다. ' })
  }

  if(user.id !== req.userId) {
=======
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
  const user = await usersRepository.findById(id);
  if (!user) {
    return res.status(404).json({ message: ' 회원 정보를 찾을 수 없습니다. ' });
  }

  if (user.id !== req.userId) {
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
    return res.sendStatus(403);
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const updated = await usersRepository.update(id, hashed);
  res.status(200).json(updated);
}

export async function deleteAccount(req, res) {
<<<<<<< HEAD
  const id = req.params.id
  const user = await usersRepository.findById(id);
  if(!user) {
    return res.status(404).json({ message: ' 회원 정보를 찾을 수 없습니다. ' })
  }

  if(user.id !== req.userId) {
    return res.sendStatus(403);
  }
  await usersRepository.removeUser(id);
  res.sendStatus(204)
=======
  const id = req.params.id;
  const user = await usersRepository.findById(id);
  if (!user) {
    return res.status(404).json({ message: ' 회원 정보를 찾을 수 없습니다. ' });
  }

  if (user.id !== req.userId) {
    return res.sendStatus(403);
  }
  await usersRepository.removeUser(id);
  res.sendStatus(204);
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
}
