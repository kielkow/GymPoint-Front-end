/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid e-mail')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
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
        <button type="submit">Enter</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
