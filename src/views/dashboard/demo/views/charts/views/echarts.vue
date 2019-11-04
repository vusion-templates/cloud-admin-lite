<template>
    <div>
        <u-loading v-show="!libLoad.status"></u-loading>
        <div v-show="libLoad.status">
            <u-grid-layout gap="normal">
                <u-grid-layout-row :repeat="2">
                    <u-grid-layout-column :span="1">
                        <u-block>pie</u-block>
                        <x-echarts autoresize :options="pie" :class="$style.echarts"></x-echarts>
                    </u-grid-layout-column>
                    <u-grid-layout-column :span="1">
                        <u-block>bar</u-block>
                        <x-echarts autoresize :options="bar" :class="$style.echarts"></x-echarts>
                    </u-grid-layout-column>
                </u-grid-layout-row>
                <u-grid-layout-row :repeat="2">
                    <u-grid-layout-column :span="1">
                        <u-block>polar</u-block>
                        <x-echarts autoresize :options="polar" :class="$style.echarts"></x-echarts>
                    </u-grid-layout-column>
                    <u-grid-layout-column :span="1">
                        <u-block>radar</u-block>
                        <x-echarts autoresize :options="radar" :class="$style.echarts"></x-echarts>
                    </u-grid-layout-column>
                </u-grid-layout-row>
            </u-grid-layout>
        </div>
    </div>
</template>
<script>
const libLoad = {
    status: false,
};
export default {
    components: {
        XEcharts: () => import(/* webpackChunkName: "echarts" */ '../components/x-echarts').then((component) => {
            libLoad.status = true;
            return component;
        }),
    },
    data() {
        return {
            libLoad,
            bar: (() => {
                function randomize() {
                    return [0, 0, 0].map((v) => Math.round(300 + Math.random() * 700) / 10);
                }

                return {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        // Provide data.
                        source: [
                            ['Product', '2015', '2016', '2017'],
                            ['Matcha Latte', ...randomize()],
                            ['Milk Tea', ...randomize()],
                            ['Cheese Cocoa', ...randomize()],
                            ['Walnut Brownie', ...randomize()],
                        ],
                    },
                    // Declare X axis, which is a category axis, mapping
                    // to the first column by default.
                    xAxis: { type: 'category' },
                    // Declare Y axis, which is a value axis.
                    yAxis: {},
                    // Declare several series, each of them mapped to a
                    // column of the dataset by default.
                    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
                };
            })(),
            pie: {
                title: {
                    text: '饼图程序调用高亮示例',
                    x: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            },
            radar: (() => {
                const scores = [
                    { name: '进攻', max: 20, value: 19 },
                    { name: '防守', max: 20, value: 9 },
                    { name: '速度', max: 20, value: 18 },
                    { name: '力量', max: 20, value: 16 },
                    { name: '耐力', max: 20, value: 16 },
                    { name: '敏捷', max: 20, value: 20 },
                ];
                return {
                    title: {
                        text: '能力雷达图',
                    },
                    tooltip: {},
                    radar: {
                        indicator: scores.map(({ name, max }) => ({ name, max })),
                    },
                    series: [
                        {
                            name: '能力值',
                            type: 'radar',
                            data: [{ value: scores.map(({ value }) => value) }],
                        },
                    ],
                };
            })(),
            polar: (() => {
                const data = [];

                for (let i = 0; i <= 360; i++) {
                    const t = i / 180 * Math.PI;
                    const r = Math.sin(2 * t) * Math.cos(2 * t);
                    data.push([r, i]);
                }
                return {
                    title: {
                        text: '极坐标双数值轴',
                    },
                    legend: {
                        data: ['line'],
                    },
                    polar: {
                        center: ['50%', '54%'],
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                        },
                    },
                    angleAxis: {
                        type: 'value',
                        startAngle: 0,
                    },
                    radiusAxis: {
                        min: 0,
                    },
                    series: [
                        {
                            coordinateSystem: 'polar',
                            name: 'line',
                            type: 'line',
                            showSymbol: false,
                            data,
                        },
                    ],
                    animationDuration: 2000,
                };
            })(),
        };
    },
};
</script>
<style module>
.echarts[class] {
    width: 100%;
    height: 400px;
}
</style>
