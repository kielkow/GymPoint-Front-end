import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function RegisterStudent() {
  return (
    <Container>
      <header>
        <strong>Register Student</strong>
        <div>
          <Link type="button" to="/students">
            <MdArrowBack color="#fff" size={18} />
            <span>Back</span>
          </Link>
          <button type="button">
            <MdSave color="#fff" size={18} />
            <span>Save</span>
          </button>
        </div>
      </header>
      <Content type="submit">
        <div>
          <span>FULL NAME</span>
          <Input name="name" placeholder="Student name..." />
        </div>
        <div>
          <span>E-MAIL</span>
          <Input name="email" type="email" placeholder="Student e-mail..." />
        </div>
        <div className="paternDiv">
          <div className="childDiv">
            <span>AGE</span>
            <Input name="age" type="number" placeholder="Student age..." />
          </div>
          <div className="childDiv">
            <span>WEIGTH (kg)</span>
            <Input
              name="weigth"
              type="number"
              placeholder="Student weigth..."
            />
          </div>
          <div className="childDiv">
            <span>HEIGTH</span>
            <Input
              name="heigth"
              type="number"
              placeholder="Student heigth..."
            />
          </div>
        </div>
      </Content>
    </Container>
  );
}
