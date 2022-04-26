import {ICurrency} from "./currency-interface";
import {IUser} from "./user-interface";

export interface IResponseExchange {
    status:     string;
    models:     IExchange[];
    message:    string;
  }

export interface IExchange {
    id:                 number;
    currency:           ICurrency;
    user:               IUser;
    exchange_date:      Date;
    sale_value:         null | number;
    purchase_value:     null | number;
    sale_amount:        null | number;
    purchase_amount:    null | number;
    sale_total:         null | number;
    purchase_total:     null | number;
    status:             boolean;
    created:            Date;
    created_by:         string;
    updated:            null | Date;
    updated_by:         null | string;
}

export const defaultExchange: IExchange[]= []