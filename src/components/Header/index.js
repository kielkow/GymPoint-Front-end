import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logoHeader.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

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
              <strong>{profile.name}</strong>
              <Link to="/profile">My Profile</Link>
            </div>
            <img
              src={
                profile.avatar !== null
                  ? profile.avatar.url
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt={profile.name}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
