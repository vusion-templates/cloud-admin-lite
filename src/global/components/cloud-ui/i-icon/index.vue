<script>
import { IIcon } from 'cloud-ui.vusion';
export default {
    name: 'i-icon',
    extends: IIcon,
};
</script>
<style module>
@import 'cloud-ui.vusion/src/components/i-icon.vue/module.css';
.root[name="notice"]:before {
    font-size: inherit;
    margin: 0px;
    vertical-align: middle;
    icon-font: url(./assets/notice.svg);
}
</style>
