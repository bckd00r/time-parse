"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = exports.getSeconds = exports.getStringKey = exports.getTimeValues = void 0;
const standartOptions = {
    hoursPerDay: 24,
    daysPerWeek: 7,
    weeksPerMonth: 4,
    monthsPerYear: 12,
    daysPerYear: 365.25,
};
const smallValues = {
    ms: 0.001,
    s: 1,
    m: 60,
    h: 3600,
};
const TimeAbbreve = {
    ms: ["ms", "milli", "millisecond", "milliseconds", "milisaniye"],
    s: ["s", "sec", "secs", "second", "seconds", "saniye"],
    m: ["m", "min", "mins", "minute", "minutes", "dak", "dakika"],
    h: ["h", "hr", "hrs", "hour", "hours", "saat", "saatler"],
    d: ["d", "day", "days", "gün", "günler"],
    w: ["w", "week", "weeks", "hafta", "haftalar"],
    mth: ["mon", "mth", "mths", "month", "months", "ay", "aylar"],
    y: ["y", "yr", "yrs", "year", "years", "yıl"],
};
function parse(timeString, timeName, options) {
    options = Object.assign({}, standartOptions, options || {});
    let total = 0;
    const timeValues = getTimeValues(options);
    const list = timeString
        .toLowerCase()
        .replace(/[^.\w+-]+/g, "")
        .match(/[-+]?[0-9.]+[a-z]+/g);
    if (!list || list.length < 1)
        throw new Error(`Unexpected time string, ${timeString}`);
    list.forEach((e) => {
        const value = e.match(/[0-9.]+/g)[0];
        const time = e.match(/[a-z]+/g)[0];
        total += getSeconds(value, time, timeValues);
    });
    if (timeName)
        return convert(total, timeName, timeValues);
    return total * 1000;
}
exports.default = parse;
function getTimeValues(options) {
    const day = options.hoursPerDay * smallValues.h;
    const week = options.daysPerWeek * day;
    const month = (options.daysPerYear / options.monthsPerYear) * day;
    const year = options.daysPerYear * day;
    const timeValues = {
        d: day,
        w: week,
        mth: month,
        y: year
    };
    return Object.assign(Object.assign({}, smallValues), timeValues);
}
exports.getTimeValues = getTimeValues;
function getStringKey(timeName) {
    for (const key in TimeAbbreve) {
        const abbreve = TimeAbbreve[key];
        if (abbreve.includes(timeName))
            return key;
    }
    throw new Error(`Unexpected abbreve, ${timeName}`);
}
exports.getStringKey = getStringKey;
function getSeconds(value, time, values) {
    return value * values[getStringKey(time)];
}
exports.getSeconds = getSeconds;
function convert(value, time, timeValues) {
    return value / timeValues[getStringKey(time)];
}
exports.convert = convert;
//# sourceMappingURL=index.js.map