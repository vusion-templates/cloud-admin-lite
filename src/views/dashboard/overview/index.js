import routes from './routes.map.js?scopeName=overview';
import config from './module/base';
export default {
    routes,
    config,
    services: require.context('./', true, /\/services\/(.*?)\.js$/),
};
