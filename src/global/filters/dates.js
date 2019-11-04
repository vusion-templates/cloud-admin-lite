import { format, isYesterday, startOfToday, addDays, isSameDay } from 'date-fns';
const formatDate = function (value) {
    if (!value)
        return '-';
    const timestamp = isNaN(+value) ? Date.parse(value) : +value;
    if (isNaN(timestamp)) {
        return '-';
    }
    return new Date(timestamp);
};
const dateFormat = (value, formater = 'yyyy-MM-dd HH:mm:ss') => {
    const timestamp = formatDate(value);
    if (timestamp === '-') {
        return timestamp;
    }
    if (!formater)
        return value;
    return format(timestamp, formater);
};

const timeFormat = (value, type = 'day') => { // type 取值 day、minute, 默认day
    const timestamp = formatDate(value);
    if (timestamp === '-') {
        return timestamp;
    }
    const today = startOfToday();
    let [day, hm] = format(timestamp, 'yyyy-MM-dd HH:mm').split(' ');
    if (isSameDay(timestamp, today)) {
        return '今天 ' + hm;
    }
    if (isYesterday(timestamp)) {
        day = '昨天';
    } else if (isSameDay(addDays(today, -2), timestamp)) {
        day = '前天';
    }
    if (type === 'day') {
        return day;
    } else {
        return day + ' ' + hm;
    }
};

export default {
    dateFormat,
    timeFormat,
};
