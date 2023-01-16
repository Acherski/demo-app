export type FetchStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

export interface CurrentExchangeRate {
    table: string;
    no: string;
    effectiveDate: string;
    rates: Rate[];
} 

export interface Rate {
    currency: string;
    code: string;
    mid: number;
}