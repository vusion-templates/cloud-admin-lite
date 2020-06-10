import App from './index.vue';
import Vue from 'vue';
export default {
    init(initRouter) {
        const microApp = window.microApp;
        const { subscribe, publish } = microApp.message;
        let instance = null;
        const topic = 'app:' + microApp.microName;
        subscribe(topic + ':mount', (data) => {
            if (instance) {
                console.error('repeat trigger');
                return;
            }
            microApp.customProps = data.customProps;
            instance = new Vue({
                name: 'app',
                router: initRouter(data.customProps.prefix),
                ...App,
            }).$mount(data.customProps.node);
            publish(topic + ':mounted', new Date());
        });
        subscribe(topic + ':unmount', (data) => {
            const el = instance.$el;
            instance.$destroy();
            instance = null;
            microApp.customProps = null;
            el.parentNode.removeChild(el);
            publish(topic + ':unmounted', new Date());
        });
    },
};
