import router from '@/global/page/router';
import appConfig from './app.config';
import routes from './routes';
let routerInstance;
export default routerInstance;
export function initRouter(base) {
    if (routerInstance) {
        return routerInstance;
    }
    return (routerInstance = router(routes, (base || process.env.VUE_APP_BASEURL || '/dashboard'), (title) => title + ' - ' + appConfig.title));
}
