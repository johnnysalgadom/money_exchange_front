export interface IResponseCurrency {
    status:     string;
    models:     ICurrency[];
    message:    string;
  }

export interface ICurrency {
    id:                 number;
    description:        string;
    abbreviation:       string;
    status:             boolean;
    created:            Date;
    created_by:         string;
    updated:            null | Date;
    updated_by:         null | string;
}

export const defaultCurrency: ICurrency[] = [];