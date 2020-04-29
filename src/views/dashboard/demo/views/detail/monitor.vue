<template>
    <u-grid-layout>
        <u-grid-layout-row>
            <u-grid-layout-column :span="6">
                <u-panel title="云主机资源趋势">
                    <u-line-chart :x-axis="{ key: 'week' }" :y-axis="{ min: 0 }" :smooth="true" :series="[{ key: 'number' }]" :data="[{ week: '星期一', number: 150 }, { week: '星期二', number: 300 }, { week: '星期三', number: 28 }, { week: '星期四', number: 200 }, { week: '星期五', number: 74 }, { week: '星期六', number: 532 }, { week: '星期日', number: 420 }]" legend
                        style="height: 270px">
                    </u-line-chart>
                </u-panel>
            </u-grid-layout-column>
            <u-grid-layout-column :span="6">
                <u-panel title="虚拟资源容量">
                    <u-line-chart :x-axis="{ key: 'week' }" :y-axis="{ min: 0 }" :series="[{ key: 'number' }]" :data="[{ week: '星期一', number: 150 }, { week: '星期二', number: 300 }, { week: '星期三', number: 28 }, { week: '星期四', number: 200 }, { week: '星期五', number: 74 }, { week: '星期六', number: 532 }, { week: '星期日', number: 420 }]" legend
                        style="height: 270px"
                    ></u-line-chart>
                </u-panel>
            </u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
</template>
