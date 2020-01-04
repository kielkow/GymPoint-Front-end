import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logoHeader.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link id="gympoint" to="/students">
            GYMPOINT
          </Link>
          <Link to="/students">STUDENTS</Link>
          <Link to="/plans">PLANS</Link>
          <Link to="/matriculations">MATRICULATIONS</Link>
          <Link to="/helporders">HELPORDERS</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Matheus Kielkowski</strong>
              <Link to="/profile">My Profile</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Matheus Kielkowski"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
