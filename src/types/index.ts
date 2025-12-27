import type { i18n, TFunction } from "i18next";

export interface TAndI18n {
    t: TFunction;
    i18n: i18n;
}

export interface TOnly {
    t: TFunction;
}