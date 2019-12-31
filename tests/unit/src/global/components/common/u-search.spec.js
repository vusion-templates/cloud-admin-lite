import { mount } from '@vue/test-utils';
import '@/views/dashboard/library';
import '@/global/page/library';
import USearch from '@/global/components/common/u-search.vue';

describe('global/components/common/u-search', () => {
    const wrapper = mount(USearch, {
        propsData: {
            value: 'test',
        },
    });
    it('renders a input', () => {
        expect(wrapper.contains('input')).toBe(true);
    });
    it('set value', () => {
        expect(wrapper.props().value).toBe('test');
    });
    it('reset value', () => {
        wrapper.vm.$on('input', (value) => {
            expect(value).toBe('test1');
        });
        wrapper.setProps({
            value: 'test1',
        });
    });
    const wrapper2 = mount(USearch, {
        propsData: {
            value: 'test',
        },
    });
    it('type input trigger blur', () => {
        wrapper2.vm.$once('input', (value) => {
            expect(value).toBe('test2');
        });
        wrapper2.find('input').setValue('test2');
        expect(wrapper2.props().value).toBe('test');
        wrapper2.find('input').trigger('blur');
    });
    const wrapper3 = mount(USearch, {
        propsData: {
            value: 'test2',
        },
    });
    it('type input trigger keyup.enter', () => {
        wrapper3.vm.$once('input', (value) => {
            expect(value).toBe('test3');
        });
        wrapper3.find('input').setValue('test3');
        expect(wrapper3.props().value).toBe('test2');
        wrapper3.find('input').trigger('keyup.enter');
    });
});

