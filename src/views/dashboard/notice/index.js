import routes from '!@vusion/routes-loader?scopeName=notice!./routesMap';
import config from './module/base';
export default {
    routes,
    config,
    services: require.context('./', true, /\/service\/(.*?)\.js$/),
};
