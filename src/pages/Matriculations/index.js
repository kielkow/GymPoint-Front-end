import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';
import { AiTwotoneAlert } from 'react-icons/ai';

import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function Students() {
  return (
    <Container>
      <header>
        <strong>Management Matriculations</strong>
        <div>
          <Link to="/registermatriculation">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </Link>
          <Input name="name" placeholder="Search by student..." />
        </div>
      </header>
      <Content>
        <header>
          <span>NAME</span>
          <span>PLANO</span>
          <span>START</span>
          <span>END</span>
          <span>ACTIVE</span>
          <span />
        </header>
        <ul>
          <li>
            <span>Matheus Kielkowski</span>
            <span>Start</span>
            <span>30 de abril de 2019</span>
            <span>30 de maio de 2019</span>
            <span>
              <AiTwotoneAlert size={24} color="#eee" />
            </span>
            <span />
            <div>
              <button id="edit" type="button">
                edit
              </button>
              <button id="delete" type="button">
                delete
              </button>
            </div>
          </li>
          <li>
            <span>Matheus Tottoli</span>
            <span>Gold</span>
            <span>30 de junho de 2019</span>
            <span>30 de agosto de 2019</span>
            <span>
              <AiTwotoneAlert size={24} color="#72e886" />
            </span>
            <span />
            <div>
              <button id="edit" type="button">
                edit
              </button>
              <button id="delete" type="button">
                delete
              </button>
            </div>
          </li>
          <li>
            <span>Lucas Silva</span>
            <span>Platinum</span>
            <span>30 de agosto de 2019</span>
            <span>30 de dezembro de 2019</span>
            <span>
              <AiTwotoneAlert size={24} color="#eee" />
            </span>
            <span />
            <div>
              <button id="edit" type="button">
                edit
              </button>
              <button id="delete" type="button">
                delete
              </button>
            </div>
          </li>
        </ul>
      </Content>
    </Container>
  );
}
