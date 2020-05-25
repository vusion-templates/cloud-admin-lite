<template>
    <u-grid-layout>
        <u-grid-layout-row>
            <u-grid-layout-column :span="3"><u-portlet color="blue" class="f-tac"><u-text size="large">云主机 4/20</u-text></u-portlet></u-grid-layout-column>
            <u-grid-layout-column :span="3"><u-portlet color="green" class="f-tac"><u-text size="large">云硬盘 4/20</u-text></u-portlet></u-grid-layout-column>
            <u-grid-layout-column :span="3"><u-portlet color="purple" class="f-tac"><u-text size="large">IP 4/20</u-text></u-portlet></u-grid-layout-column>
            <u-grid-layout-column :span="3"><u-portlet color="gray" class="f-tac"><u-text size="large">负载均衡 4/20</u-text></u-portlet></u-grid-layout-column>
        </u-grid-layout-row>
        <u-grid-layout-row>
            <u-grid-layout-column :span="6">
                <u-panel title="云主机资源趋势">
                    <x-echarts :options="options1" style="height: 270px"></x-echarts>
                </u-panel>
            </u-grid-layout-column>
            <u-grid-layout-column :span="6">
                <u-panel title="虚拟资源容量">
                    <x-echarts :options="options2" style="height: 270px"></x-echarts>
                </u-panel>
            </u-grid-layout-column>
        </u-grid-layout-row>
        <u-grid-layout-row>
            <u-grid-layout-column :span="12">
                <u-panel title="监控">
                    <x-echarts :options="options3" style="height: 270px"></x-echarts>
                </u-panel>
            </u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
</template>
<script>
import UPortlet from '../components/u-portlet';
import XEcharts from '@/global/components/common/x-echarts.js';
export default {
    components: {
        UPortlet,
        XEcharts,
    },
    data() {
        return {
            options1: {
                legend: {
                    data: ['数量'],
                },
                tooltip: {},
                xAxis: [
                    {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                series: [
                    {
                        type: 'bar', name: '数量',
                        data: [80, 100, 282, 270, 74, 432, 920],
                    },
                ],
            },
            options2: {
                legend: {
                    data: ['数量'],
                },
                tooltip: {},
                xAxis: [
                    {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                series: [
                    {
                        type: 'bar', name: '数量',
                        data: [810, 100, 482, 670, 174, 432, 340],
                    },
                ],
            },
            options3: {
                legend: {
                    data: ['数量'],
                },
                tooltip: {},
                xAxis: [
                    {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                series: [
                    {
                        type: 'bar', name: '数量',
                        data: [310, 240, 382, 471, 174, 732, 240],
                    },
                ],
            },
        };
    },
};
</script>
<style module>

</style>
