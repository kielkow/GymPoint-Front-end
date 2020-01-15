import React, { useState, useEffect } from 'react';
import { Input, Select } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import api from '~/services/api';

export default function RegisterMatriculation() {
  const [studentsOptions, setStudentsOptions] = useState([]);
  const [plansOptions, setPlansOptions] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      const { data } = response;

      const students = data.map(element => {
        return { id: element.id, title: element.name };
      });

      setStudentsOptions(students);
    }
    async function loadPlans() {
      const response = await api.get('/plans');

      const { data } = response;

      setPlansOptions(data);
    }

    loadStudents();
    loadPlans();
  }, []);

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
          <Select
            name="students"
            options={studentsOptions}
            placeholder="Search student..."
          />
        </div>
        <div className="paternDiv">
          <div className="childDiv">
            <span>PLAN</span>
            <Select
              name="plans"
              options={plansOptions}
              placeholder="Search plan..."
            />
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
