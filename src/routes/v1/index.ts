import express from 'express';
import { config } from '@config/index';
import { pingRouter } from './ping.route';

const baseRouter = express.Router();

const defaultRoutes = [
  {
    path: '/ping',
    route: pingRouter,
  },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
  baseRouter.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.ENV === 'development') {
  devRoutes.forEach((route) => {
    baseRouter.use(route.path, route.route);
  });
}

export const routes = baseRouter;
