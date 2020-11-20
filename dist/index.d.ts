/// <reference types="time-converter" />
import { TimeEx, IOptions, ITime } from "mytimeparser";
export default function parse(timeString: string, timeName?: TimeEx, options?: IOptions): number;
export declare function getTimeValues(options: IOptions): ITime;
export declare function getStringKey(timeName: TimeEx): string;
export declare function getSeconds(value: number, time: TimeEx, values: ITime): number;
export declare function convert(value: number, time: TimeEx, timeValues: ITime): number;
