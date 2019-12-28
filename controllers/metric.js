import express from 'express';
import { promises as fs } from 'fs';
import moment from 'moment';

const router = express.Router();

// @route   GET api/metric/:key/sum
// @params  Key - any key 
// @desc    GET sum metrics by key
// @access  Public
// @returns Object { "value": sum }
router.get('/:key/sum', async (req, res) => {
  let value = 0;
  const key = req.params.key;
  const now = moment();
  const oneHourBefore = moment().subtract(1, 'hours')
  try {
    (await fs.readFile('metric.js', 'utf8'))
      .split('\n')
      .filter(elem => elem.includes(`key: ${key}`))
      .filter(elem =>
        moment(elem.match(/timeStamp: [0-9:\/\s]+/)[0].slice(11), 'HH:mm DD/MM/YYYY').isBetween(oneHourBefore, now)
      )
      .forEach(elem => {
        value += +elem.match(/value: [0-9]+$/)[0].slice(7);
      });
  } catch (err) {
    console.log('Read file error: ', err);
  }

  await res.json({ value })
})

// @route  POST api/metric/:key
// @params Key - any key 
// @body   Object - { "value": value } 
// @desc   Create a metric
// @access Public
// @returns Empty object
router.post('/:key', async (req, res) => {
  try {
    await fs.appendFile('metric.js', `timeStamp: ${moment().format('HH:mm DD/MM/YYYY')} key: ${req.params.key} value: ${Math.round(req.body.value)}\n`);
  } catch (err) {
    console.log('Write file error: ', err);
  }

  await res.json({});
})

export default router;
