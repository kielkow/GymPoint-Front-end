import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />

      <form>
        <div>
          <span>E-MAIL</span>
          <input type="email" placeholder="Your e-mail..." />
        </div>
        <div>
          <span>PASSWORD</span>
          <input type="password" placeholder="Your password..." />
        </div>
        <button type="submit">Enter</button>
        <Link to="/register">Create free account</Link>
      </form>
    </>
  );
}
