import {ICurrency} from "./currency-interface";

export interface IResponseExchangeRate {
    status:     string;
    models:     IExchangeRate[];
    message:    string;
  }

export interface IExchangeRate {
    id:                 number;
    currency:           ICurrency;
    exchange_date:      Date;
    sale_value:         null | number;
    purchase_value:     null | number;
    status:             boolean;
    created:            Date;
    created_by:         string;
    updated:            null | Date;
    updated_by:         null | string;
}

export const defaultExchangeRate: IExchangeRate[]= []