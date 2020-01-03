import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="GymPoint" />

      <form>
        <div>
          <span>FULL NAME</span>
          <input type="text" placeholder="Your full anme..." />
        </div>
        <div>
          <span>E-MAIL</span>
          <input type="email" placeholder="Your e-mail..." />
        </div>
        <div>
          <span>PASSWORD</span>
          <input type="password" placeholder="Your password..." />
        </div>

        <button type="submit">Create account</button>
        <Link to="/">I already have an account</Link>
      </form>
    </>
  );
}
