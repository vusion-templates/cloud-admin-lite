<script>
import { IIcon } from 'cloud-ui.vusion';

export default {
    name: 'i-icon',
    extends: IIcon,
};
</script>

<style module>
@import 'cloud-ui.vusion/src/components/i-icon.vue/module.css';

.root::before {
    font-size: inherit;
    vertical-align: initial;
    margin: 0;
}

.root[name="notice"]::before {
    icon-font: url('i-material-design.vue/assets/outlined/notifications.svg');
}
</style>
