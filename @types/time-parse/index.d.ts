declare module "mytimeparser" {
    export interface IOptions {
        hoursPerDay: number;
        daysPerWeek: number;
        weeksPerMonth: number;
        monthsPerYear: number;
        daysPerYear: number;
    }
    export interface ITime {
        ms: number;
        s: number;
        m: number;
        h: number;
        d: number,
        w: number,
        mth: number,
        y: number
    }
    export type TTime = "d" | "w" | "mth" | "y"
    export type Abbreves = "ms" | "s" | "m" | "h" | "d" | "w" | "mth" | "y";
    export type TimeEx =
        | "ms"
        | "milli"
        | "millisecond"
        | "milliseconds"
        | "milisaniye"
        | "s"
        | "sec"
        | "secs"
        | "second"
        | "seconds"
        | "saniye"
        | "m"
        | "min"
        | "mins"
        | "minute"
        | "minutes"
        | "dak"
        | "dakika"
        | "h"
        | "hr"
        | "hrs"
        | "hour"
        | "hours"
        | "saat"
        | "saatler"
        | "d"
        | "day"
        | "days"
        | "gün"
        | "günler"
        | "w"
        | "week"
        | "weeks"
        | "hafta"
        | "haftalar"
        | "mth"
        | "mon"
        | "mths"
        | "month"
        | "months"
        | "ay"
        | "aylar"
        | "y"
        | "yr"
        | "yrs"
        | "year"
        | "years"
        | "yıl";
}
