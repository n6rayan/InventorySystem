import { Router } from 'express';
import * as healthcheck from './healthcheck';
import * as item from './item';

const routes = Router();

routes.use(healthcheck.router);
routes.use(item.router);

export { routes };