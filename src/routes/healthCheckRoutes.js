import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.json(`Health check: API online...`);
});

export default router;
