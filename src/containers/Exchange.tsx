import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootReducer} from "../redux/root-reducers";
import {history} from '../common/route';
import {useFormik} from "formik";
import * as Yup from "yup";
import api from "../common/api";
import {Button} from "../components";
import { Alert } from "react-bootstrap";
import {defaultExchangeRate, IExchangeRate, IResponseExchangeRate} from "../interfaces/exchange-rate-interface";
import {defaultExchange, IExchange, IResponseExchange} from "../interfaces/exchange-interface";

const Exchange = () => {
  const {isLoggedIn, username} = useSelector((state: RootReducer) => state.auth)
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [exchangeRate, setExchangeRate]: [IExchangeRate[], (exchangeRate: IExchangeRate[]) => void] = useState(defaultExchangeRate);
  const [exchange, setExchange]: [IExchange[], (exchange: IExchange[]) => void] = useState(defaultExchange);
  const insertExchangeFormik = useFormik({
    initialValues: {
      currency: '',
      purchase_amount: 0,
      sale_amount: 0,
    },
    validationSchema: Yup.object().shape({
      currency: Yup.string()
        .required('La moneda es requerida'),
    }),
    onSubmit: (values) => {
      const body = {
        currency: values.currency,
        purchase_amount: values.purchase_amount,
        sale_amount: values.sale_amount,
      }
      api
        .post('/exchange', body)
        .then(res => {
          setSuccessMessage("Intercambio ingresado")
          setErrorMessage('')
        })
        .catch(err => {
          const {status} = err
          if (status !== 401) {
            let messageSplit: string[] = (err.response.data.message).split(":");
            let message = messageSplit[messageSplit.length - 1].trim()
            setErrorMessage(message)
          }
        });
    }
  })

  React.useEffect(() => {
    console.log(isLoggedIn);
    console.log("accesstoken enexch.tsx: " + window.localStorage.getItem('accessToken'));
    if (!isLoggedIn) {
      history.push("/signin")
    } else {
      const current = new Date();
      const today = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      api.get<IResponseExchangeRate>(`/exchange-rate/date/${today}`).then(res => {
        setExchangeRate(res.data.models)
      })
    }
  }, [isLoggedIn])

/*  React.useEffect(() => {
    if (!isLoggedIn) {
      history.push("/signin")
    }
  }, [isLoggedIn])
*/

  return (
    <>
      <section className="container mt-4">
        <div className="row">
          <div className="col-md-6 col-xs-6">
            <div className="row card p-3">
              <div className="form-group text-left">
                <label className="form-label text-left font-weight-normal">Intercambio de moneda de [{username}]</label>
                <div className="input-group mb-2">
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className="row">
              <div className="col-md-2 col-xs-2">&nbsp;</div>
              <div className="col-md-10 col-xs-10">
                <div className="row card p-3">
                  <div className="row">
                    <div className="col-xs-2 col-md-2">
                      <strong className="text-dark">Moneda:</strong>
                    </div>
                    <div className="col-xs-2 col-md-2">
                      <select className="input-group mb-2" id="currency">
                      {exchangeRate && exchangeRate.map(rate => (
                        <option key={rate.currency.id} value={rate.currency.abbreviation}>
                        </option>
                      ))}
                      </select>
                    </div>
                    <div className="col-xs-2 col-md-2">
                      <strong className="text-dark">Valor venta:</strong>
                    </div>
                    <div className="col-xs-2 col-md-2">
                      <strong className="text-dark" id="sale_value"></strong>
                    </div>
                    <div className="col-xs-2 col-md-2">
                      <strong className="text-dark">Valor compra</strong>
                    </div>
                    <div className="col-xs-2 col-md-2">
                      <strong className="text-dark" id="purchase_value"></strong>
                    </div>
                  </div>
                </div>
                <div className="row card p-3">
                  <form onSubmit={insertExchangeFormik.handleSubmit}>
                    <div className="text-center"><h3 className="text-black-50">Cambio de moneda</h3></div>
                    <div className="form-group text-left">
                      <label className="form-label text-left font-weight-normal">Monto de compra</label>
                      <div className="input-group mb-2">
                        <input onChange={insertExchangeFormik.handleChange} name="purchase_amount" type="number" defaultValue={insertExchangeFormik.values.purchase_amount} className="form-control form-control-sm" />
                      </div>
                    </div>
                    <div className="form-group text-left">
                      <label className="form-label text-left font-weight-normal">Monto de venta</label>
                      <div className="input-group mb-2">
                        <input onChange={insertExchangeFormik.handleChange} name="sale_amount" type="number" defaultValue={insertExchangeFormik.values.sale_amount} className="form-control form-control-sm" />
                      </div>
                    </div>
                    <div className="form-group text-left">
                      <br/>
                      <Button type="submit" block size="lg" typeStyle="primary"><span className="text-capitalize">Ingresar intercambio</span></Button>
                      <br/>
                      {successMessage && (
                        <Alert className="alert-success">
                          {successMessage}
                        </Alert>
                      )}
                      {errorMessage && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert"> { errorMessage } </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-2 col-xs-2">&nbsp;</div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Exchange