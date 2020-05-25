import routes from './routes';
import config from './module/base';
export default {
    routes,
    config,
    services: require.context('./', true, /\/service\/(.*?)\.js$/),
};
