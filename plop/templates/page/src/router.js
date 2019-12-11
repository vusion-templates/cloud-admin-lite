import router from '@/global/page/router';
import appConfig from './app.config';
import routes from './routes';
export default router(routes, (title) => title + ' - ' + appConfig.title);
