import routes from './routes.map.js?scopeName=notice';
import config from './module/base';
export default {
    routes,
    config,
    services: require.context('./', true, /\/services\/(.*?)\/index\.js$/),
};
