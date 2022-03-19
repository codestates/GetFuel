import jwt from 'jsonwebtoken';
import { config } from '../configuration/config.js';
import * as usersRepository from '../data/auth.js';

export const isAuth = async (req, res, next) => {

  const authHeader = req.get('Authorization')
  if(!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json({ message: 'Authentication Error' })
  }

  const token = authHeader.split(' ')[1]; //access token


  jwt.verify(token, config.jwt.access_secret, async(error, decoded) => {
    if(error) {
      return res.status(401).json( { message: 'Authentication Error' } )
    };
  
    const user = await usersRepository.findById(decoded.id);
    if(!user) {
      return res.status(401).json( { message: 'Authentication Error' })
    }

    req.userId = user.id // req에 userId 추가 (custom)
    next();
  })

} 