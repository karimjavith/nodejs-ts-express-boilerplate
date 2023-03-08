import express, { Request, Response } from 'express';

const pingRouter = express.Router();

pingRouter.route('/').get((_req: Request, res: Response) => {
  res.send('ping successful');
});

export { pingRouter };
