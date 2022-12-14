import Koa from 'koa';
import koaHelmet from 'koa-helmet';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import budgetRoutes from './budget-routes';
import { logger } from '../../extlib/@npg-logger';

const _addRouter = (app: Koa, router: Router) => {
    app.use(router.routes());
    router.stack.forEach((r: Router.Layer) => {
        logger.http(`Added rest route: [${r.methods}] ${r.path}`);
    });
};

/**
 *
 */
const init = () => {
    const app = new Koa();

    app.use(koaHelmet());
    app.use(bodyParser());

    _addRouter(app, budgetRoutes);

    const servicePort = process.env.SERVICE_PORT || 4000;
    const serviceName = process.env.SERVICE_NAME || 'finance-service';

    app.listen(4000).addListener('listening', () => {
        logger.info(`${serviceName} - REST listening on port : ${servicePort}`);
    });
};
export default {
    init
};
