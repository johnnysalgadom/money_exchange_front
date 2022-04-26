import { useFormik } from 'formik'
import {Button} from '../components'
import { history } from '../common/route';
import api from '../common/api'
import React, { useState } from 'react';
import * as Yup from 'yup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons'
import {faEnvelopeOpen} from "@fortawesome/free-regular-svg-icons";

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Email es invalido')
        .required('Email es requerido'),
      password: Yup.string()
        .min(3, 'La contraseña debe tener al menos 3 caracteres')
        .required('Contrseña es requerido'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Confirmar contraseña es requerido'),
      acceptTerms: Yup.bool().oneOf([true], 'Teminos & Condiciones es requirido'),
    }),
    onSubmit: (values) => {
      const body = {
        tenant_code: 'happy_skin',
        email: values.email,
        password: values.confirmPassword,
      }
      api
        .post('/auth/register', body)
        .then(res => history.push('/'))
        .catch(err => {
          let messageSplit: string[] = (err.response.data.message).split(":");
          let message = messageSplit[messageSplit.length - 1].trim()
          setErrorMessage(message)
        });
    }
  })

  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card">
                <div className="card-body border-top-10 p-5">
                  <form onSubmit={loginFormik.handleSubmit}>
                    <div className="form-group">
                      <h3 className="text-center">Crear una cuenta</h3>
                    </div>
                    <div className="form-group">
                      <label>Correo</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text"><FontAwesomeIcon icon={faEnvelopeOpen} /></div>
                        </div>
                        <input onChange={loginFormik.handleChange} name="email" type="email" defaultValue={loginFormik.values.email} className="form-control form-control-lg" placeholder="Correo" />
                      </div>
                      {loginFormik.errors.email && (
                        <label className="text-danger">{ loginFormik.errors.email }</label>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Contraseña</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text"><FontAwesomeIcon icon={faUnlockAlt} /></div>
                        </div>
                        <input onChange={loginFormik.handleChange} name="password" type="password" defaultValue={loginFormik.values.password} className="form-control form-control-lg" placeholder="********" />
                      </div>
                      {loginFormik.errors.password && (
                        <label className="text-danger">{ loginFormik.errors.password }</label>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Confirmar Contraseña</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text"><FontAwesomeIcon icon={faUnlockAlt} /></div>
                        </div>
                        <input onChange={loginFormik.handleChange} name="confirmPassword" type="password" defaultValue={loginFormik.values.confirmPassword} className="form-control form-control-lg" placeholder="********" />
                      </div>
                      {loginFormik.errors.confirmPassword && (
                        <label className="text-danger">{ loginFormik.errors.confirmPassword }</label>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-checkbox m-0">
                        <input onChange={loginFormik.handleChange} className="form-checkbox-input mt-2" type="checkbox"
                               name="acceptTerms" id="acceptTerms" defaultChecked={loginFormik.values.acceptTerms} />
                        <label className="form-checkbox-label" htmlFor="acceptTerms">Acepto los términos y condiciones</label>
                      </div>
                    </div>
                    {loginFormik.errors.acceptTerms && (
                      <label className="text-danger">{ loginFormik.errors.acceptTerms }</label>
                    )}
                    <Button type="submit" block size="lg" typeStyle="primary"><span className="text-capitalize">Registrarse</span></Button>
                    <br/>
                    {errorMessage && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert"> { errorMessage } </div>
                      </div>
                    )}
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

export default SignUpForm
