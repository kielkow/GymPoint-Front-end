import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';

import { Container, Content } from './styles';

export default function Students() {
  return (
    <Container>
      <header>
        <strong>Management Plans</strong>
        <div>
          <button type="button">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </button>
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
              <button id="edit" type="button">
                edit
              </button>
              <button id="delete" type="button">
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
