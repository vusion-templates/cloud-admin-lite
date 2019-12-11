import moduleInfos from '../../../modules';
import LDashboard from '@/global/layouts/l-dashboard.vue';
import SNavbarRight from '../../components/s-navbar-right.vue';
export default {
    components: {
        LDashboard,
        SNavbarRight,
    },
    data() {
        return {
            logo: {
                sub: '模板',
            },
            userInfo: {
                username: 'username',
            },
            navbarConfig: [
                {
                    title: 'Cloud UI',
                    href: 'https://vusion.github.io/cloud-ui/components/quickstart',
                },
                {
                    title: 'Vusion 官网',
                    href: 'https://vusion.github.io',
                },
                '|',
                {
                    title: '模板文档',
                    href: 'https://vusion-templates.github.io/cloud-admin-site',
                },
                {
                    title: 'GitHub',
                    href: 'https://github.com/vusion-templates/cloud-admin-template',
                },
            ],
            sidebarConfig: moduleInfos.sortedModules.filter((item) => (item && item.module && item.exist !== false && item.sidebar)).map((item) => item.sidebar),
        };
    },
    computed: {
        layoutComponent() {
            return this.hasSideBar ? 'l-dashboard' : 'l-page';
        },
        hasSideBar() {
            return this.sidebarConfig && this.sidebarConfig.length;
        },
    },
};
