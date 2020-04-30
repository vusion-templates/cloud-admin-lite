import getModules from '@/global/page/modules';
import modulesOrder from './modules.order';
export default getModules(
    require.context('./', true, /\.\/([^/]*?)\/index\.js$/),
    modulesOrder,
);
