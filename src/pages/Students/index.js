/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

export default function Students() {
  function deleteStudent() {
    confirm('Do you really wish delete this student?');
  }

  return (
    <Container>
      <header>
        <strong>Management Students</strong>
        <div>
          <Link to="/registerstudent">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </Link>
          <Input name="name" placeholder="Search by name..." />
        </div>
      </header>
      <Content>
        <header>
          <span>NAME</span>
          <span>E-MAIL</span>
          <span>AGE</span>
          <span />
        </header>
        <ul>
          <li>
            <span>Matheus Kielkowski</span>
            <span>matheuskiel@fiorifer.com.br</span>
            <span>19</span>
            <div>
              <Link id="edit" to="/editstudent">
                edit
              </Link>
              <button id="delete" type="button" onClick={deleteStudent}>
                delete
              </button>
            </div>
          </li>
          <li>
            <span>Matheus Kielkowski</span>
            <span>matheuskiel@fiorifer.com.br</span>
            <span>19</span>
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
            <span>Matheus Kielkowski</span>
            <span>matheuskiel@fiorifer.com.br</span>
            <span>19</span>
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
            <span>Matheus Silva</span>
            <span id="span_email">matheuskiel@fiorifer.com.br</span>
            <span id="span_age">22</span>
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
            <span>Monica</span>
            <span id="span_email">monica@gmail.com.br</span>
            <span id="span_age">45</span>
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
