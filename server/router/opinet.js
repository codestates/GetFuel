import axios from 'axios';
import express from 'express';
import 'express-async-errors';
import { config } from '../configuration/config.js';

const router = express.Router();

router.get('/around', async (req, res) => {
  const { x, y, radius } = req.query;
  const url = `https://www.opinet.co.kr/api/aroundAll.do?code=${config.opinet.code}&x=${x}&y=${y}&radius=${radius}&sort=1&prodcd=B027&out=json`;
  const result = await axios.get(url);
  try {
    if (result) {
      res.status(200).json(result.data.RESULT.OIL);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/stationinfo', async (req, res) => {
  const { id } = req.query;
  const url = `http://www.opinet.co.kr/api/detailById.do?code=${config.opinet.code}&id=${id}&out=json`;
  const result = await axios.get(url);
  try {
    if (result) {
      res.status(200).json(...result.data.RESULT.OIL);
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
