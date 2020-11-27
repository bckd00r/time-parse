import { TimeEx, IOptions, Abbreves, ITime, TTime } from 'mytimeparser';

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
	ms: ['ms', 'milli', 'millisecond', 'milliseconds', 'milisaniye'],
	s: ['s', 'sec', 'secs', 'second', 'seconds', 'saniye'],
	m: ['m', 'min', 'mins', 'minute', 'minutes', 'dak', 'dakika'],
	h: ['h', 'hr', 'hrs', 'hour', 'hours', 'saat', 'saatler'],
	d: ['d', 'day', 'days', 'gün', 'günler'],
	w: ['w', 'week', 'weeks', 'hafta', 'haftalar'],
	mth: ['mon', 'mth', 'mths', 'month', 'months', 'ay', 'aylar'],
	y: ['y', 'yr', 'yrs', 'year', 'years', 'yıl'],
};

export default function parse(
	timeString: string,
	timeName?: TimeEx,
	options?: IOptions,
): number {
	options = Object.assign({}, standartOptions, options || {});
	let total = 0;
	const timeValues = getTimeValues(options);
	const list = timeString
		.toLowerCase()
		.replace(/[^.\w+-]+/g, '')
		.match(/[-+]?[0-9.]+[a-zA-Z\u0080-\uFFFF]+/g);
	if (!list || list.length < 1)
		throw new Error(`Unexpected time string, ${timeString}`);
	list.forEach((e) => {
		const value = (e.match(/[0-9.]+/g) as RegExpMatchArray)[0];
		const time = (e.match(/[a-zA-Z\u0080-\uFFFF]+/g) as RegExpMatchArray)[0];
		total += getSeconds(
			(value as unknown) as number,
			time as TimeEx,
			timeValues,
		);
	});
	if (timeName) return convert(total, timeName, timeValues);
	return total * 1000;
}

function getTimeValues(options: IOptions): ITime {
	const day = options.hoursPerDay * smallValues.h;
	const week = options.daysPerWeek * day;
	const month = (options.daysPerYear / options.monthsPerYear) * day;
	const year = options.daysPerYear * day;
	const timeValues = {
		d: day,
		w: week,
		mth: month,
		y: year,
	};
	return { ...smallValues, ...timeValues };
}

function getStringKey(timeName: TimeEx) {
	for (const key in TimeAbbreve) {
		const abbreve = TimeAbbreve[key as Abbreves];
		if (abbreve.includes(timeName)) return key;
	}
	throw new Error(`Unexpected abbreve, ${timeName}`);
}

function getSeconds(value: number, time: TimeEx, values: ITime): number {
	return value * values[getStringKey(time) as TTime];
}

function convert(value: number, time: TimeEx, timeValues: ITime) {
	return value / timeValues[getStringKey(time) as TTime];
}
