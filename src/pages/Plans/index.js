/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function Plans() {
  function deletePlan() {
    confirm('Do you really wish delete this plan?');
  }

  return (
    <Container>
      <header>
        <strong>Management Plans</strong>
        <div>
          <Link to="/registerplan">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </Link>
          <Input name="name" placeholder="Search by name..." />
        </div>
      </header>
      <Content>
        <header>
          <span>TITLE</span>
          <span>DURATION</span>
          <span>VALUE p/MOUNTH</span>
          <span />
        </header>
        <ul>
          <li>
            <span>Start</span>
            <span>1 mounth</span>
            <span>R$ 129,00</span>
            <div>
              <Link id="edit" to="/editplan">
                edit
              </Link>
              <button id="delete" type="button" onClick={deletePlan}>
                delete
              </button>
            </div>
          </li>
          <li>
            <span>Gold</span>
            <span>3 mounth</span>
            <span>R$ 109,00</span>
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
            <span>Diamond</span>
            <span>6 mounth</span>
            <span>R$ 89,00</span>
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
