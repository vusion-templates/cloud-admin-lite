import routes from './routes.map.js?scopeName=exception';
import config from './module/base';
export default {
    routes,
    config,
    services: require.context('./', true, /\/services\/(.*?)\.js$/),
};
