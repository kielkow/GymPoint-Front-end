import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function RegisterMatriculation() {
  return (
    <Container>
      <header>
        <strong>Register Matriculation</strong>
        <div>
          <Link to="/matriculations">
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
          <span>STUDENT</span>
          <Input name="student" placeholder="Student matriculation..." />
        </div>
        <div className="paternDiv">
          <div className="childDiv">
            <span>PLAN</span>
            <Input name="plan" placeholder="Plan matriculation..." />
          </div>
          <div className="childDiv">
            <span>START DATE</span>
            <Input
              name="startdate"
              type="date"
              placeholder="Start date matriculation..."
            />
          </div>
          <div className="childDiv">
            <span>END DATE</span>
            <Input
              name="enddate"
              readOnly
              style={{
                backgroundColor: '#e6e3e3',
              }}
            />
          </div>
          <div className="childDiv">
            <span>FINAL PRICE</span>
            <Input
              name="finalprice"
              readOnly
              style={{
                backgroundColor: '#e6e3e3',
              }}
            />
          </div>
        </div>
      </Content>
    </Container>
  );
}
