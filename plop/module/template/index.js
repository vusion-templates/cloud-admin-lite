import config from './module/base';
import routes from './routes';

export default {
    config,
    routes,
    services: require.context('./', true, /\/service\/(.*?)\.js/),
};
