import React from 'react';
import { Input, Select } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function EditMatriculation() {
  const studentsOptions = [
    { id: 'matheuskielkowski', title: 'Matheus Kielkowski' },
    { id: 'lucassilva', title: 'Lucas Silva' },
    { id: 'thiagotakayama', title: 'Thiago Takayama' },
  ];

  const plansOptions = [
    { id: 'start', title: 'Start' },
    { id: 'gold', title: 'Gold' },
    { id: 'platinum', title: 'Platinum' },
  ];

  return (
    <Container>
      <header>
        <strong>Edit Matriculation</strong>
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
          <Select
            name="students"
            options={studentsOptions}
            placeholder="Search student..."
            value="Matheus Kielkowski"
          />
        </div>
        <div className="paternDiv">
          <div className="childDiv">
            <span>PLAN</span>
            <Select
              name="plans"
              options={plansOptions}
              placeholder="Search plan..."
              value="Start"
            />
          </div>
          <div className="childDiv">
            <span>START DATE</span>
            <Input
              name="startdate"
              // type="date"
              placeholder="Start date matriculation..."
              value="03/06/2019"
            />
          </div>
          <div className="childDiv">
            <span>END DATE</span>
            <Input
              name="enddate"
              value="03/07/2019"
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
              type="number"
              value="129.00"
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