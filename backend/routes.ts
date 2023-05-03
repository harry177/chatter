import express from 'express';

const router = express.Router();

//Get all Method
router.get('/getAll', (req, res) => {
  res.send('Get All API');
});

export default router;
