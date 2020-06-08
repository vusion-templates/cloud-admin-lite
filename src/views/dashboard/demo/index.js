import routes from './routes.map.js?scopeName=demo';
import config from './module/base';
export default {
    routes,
    config,
    services: require.context('./', true, /\/services\/(.*?)\.js$/),
};
