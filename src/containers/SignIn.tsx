import {useFormik} from 'formik'
import {Button} from '../components'
import {Link} from 'react-router-dom'
import api from '../common/api'
import { history } from '../common/route';
import * as Yup from "yup";
import {useDispatch} from 'react-redux'
import {LOGIN} from "../constants/constants";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons'
import {faEnvelopeOpen} from "@fortawesome/free-regular-svg-icons";

const SignInForm = () => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const dispatch = useDispatch()
  const loginFormik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('El Username es requerido'),
      password: Yup.string()
        .min(3, 'La contraseña debe tener al menos 3 caracteres')
        .required('La Contraseña es requerida'),
    }),
    onSubmit: (values) => {
      api
        .post('/auth/signin', values)
        .then(res => {
          const {data} = res;
          window.localStorage.setItem('accessToken', data.token);
          window.localStorage.setItem('refreshToken', '');
          dispatch({type: LOGIN,
            payload: {
              isLoggedIn: true,
              username: data.username,
              accessToken: data.token,
              refreshToken: data.token,
            }
          })
          history.push('/exchange');
        })
        .catch(err => {
          const {status} = err;
          if (status !== 401) {
            console.log(err);
            let messageSplit: string[] = (err.response.data.message).split(":");
            let message = messageSplit[messageSplit.length - 1].trim()
            setErrorMessage(message)
          }
        });
    }
  })

  return (
    <>
      <section></section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card">
                <div className="card-body border-top-10 p-5">
                  <form onSubmit={loginFormik.handleSubmit}>
                    <div className="form-group">
                      <h3 className="text-center">Iniciar Sesión</h3>
                    </div>
                    <div className="form-group">
                      <label>Usuario</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text"><FontAwesomeIcon icon={faEnvelopeOpen} /></div>
                        </div>
                        <input type="text" defaultValue={loginFormik.values.username}
                               onChange={(e) =>loginFormik.handleChange(e)} name="username"
                               className="form-control form-control-lg"
                               placeholder="usuario"/>
                      </div>
                      {loginFormik.errors.username && (
                        <label className="text-danger">{loginFormik.errors.username}</label>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Contraseña</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text"><FontAwesomeIcon icon={faUnlockAlt} /></div>
                        </div>
                        <input type="password" defaultValue={loginFormik.values.password}
                               onChange={(e) =>loginFormik.handleChange(e)} name="password"
                               className="form-control form-control-lg"
                               placeholder="********"/>
                      </div>
                      {loginFormik.errors.password && (
                        <label className="text-danger">{loginFormik.errors.password}</label>
                      )}
                    </div>
                    {errorMessage && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert"> {errorMessage} </div>
                      </div>
                    )}

                    <Button type="submit" block size="lg" typeStyle="primary"><span className="text-capitalize">Iniciar sesión</span></Button>
                    <div className="d-block d-sm-flex justify-content-center align-items-center mt-4"><span
                      className="font-weight-normal">Si no está registrado, por favor <Link to="/sign-up" className="font-weight-bold"> cree una cuenta</Link></span></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignInForm
