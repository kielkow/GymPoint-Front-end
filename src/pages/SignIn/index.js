/* eslint-disable no-console */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid e-mail')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <div>
          <span>E-MAIL</span>
          <Input name="email" type="email" placeholder="Your e-mail..." />
        </div>
        <div>
          <span>PASSWORD</span>
          <Input
            name="password"
            type="password"
            placeholder="Your password..."
          />
        </div>
        <button type="submit">{loading ? 'Loading...' : 'Enter'}</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
