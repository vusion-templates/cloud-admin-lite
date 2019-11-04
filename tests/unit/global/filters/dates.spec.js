import Dates from '@/global/filters/dates';

describe('global/filters/dates', () => {
    test('dateFormat', () => {
        expect(Dates.dateFormat(new Date('2019-09-09 11:00:00'))).toBe('2019-09-09 11:00:00');
        expect(Dates.dateFormat(new Date('2019-09-09 11:00:00'), 'yyyy-MM-dd')).toBe('2019-09-09');
        expect(Dates.dateFormat(new Date('2019-09-09 11:00:00'), 'yyyy-MM-dd HH:mm')).toBe('2019-09-09 11:00');
        expect(Dates.dateFormat(new Date('2019-09-09 11:00:00'), 'yyyy-MM-dd HH:mm:ss')).toBe('2019-09-09 11:00:00');
        expect(Dates.dateFormat(new Date('2019-09-09 11:00:00'), 'yyyy-MM')).toBe('2019-09');
        expect(Dates.dateFormat(new Date('2019-09-09 11:00:00'), 'yyyy-M')).toBe('2019-9');

        expect(Dates.dateFormat()).toBe('-');
    });
    test('timeFormat', () => {
        expect(Dates.timeFormat(new Date('2019-09-09 11:00:00'))).toBe('2019-09-09');
        let now = new Date();
        expect(Dates.timeFormat(now)).toBe(Dates.dateFormat(now, '今天 HH:mm'));
        now.setDate(now.getDate() - 1);
        expect(Dates.timeFormat(now)).toBe(Dates.dateFormat(now, '昨天'));
        now.setDate(now.getDate() - 1);
        expect(Dates.timeFormat(now)).toBe(Dates.dateFormat(now, '前天'));

        now = new Date();
        expect(Dates.timeFormat(now, 'minute')).toBe(Dates.dateFormat(now, '今天 HH:mm'));
        now.setDate(now.getDate() - 1);
        expect(Dates.timeFormat(now, 'minute')).toBe(Dates.dateFormat(now, '昨天 HH:mm'));
        now.setDate(now.getDate() - 1);
        expect(Dates.timeFormat(now, 'minute')).toBe(Dates.dateFormat(now, '前天 HH:mm'));

        expect(Dates.timeFormat()).toBe('-');
    });
});
