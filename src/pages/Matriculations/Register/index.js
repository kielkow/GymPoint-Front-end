import React, { useState, useEffect } from 'react';
import { Input, Select } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import api from '~/services/api';

export default function RegisterMatriculation() {
  const [studentsOptions, setStudentsOptions] = useState([]);
  const [plansOptions, setPlansOptions] = useState([]);
  const [planSelected, setPlanSelected] = useState({});

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

      const plans = data.map(element => {
        return {
          id: element.title,
          title: element.title,
          duration: element.duration,
          price: element.price,
        };
      });

      setPlansOptions(plans);
    }

    loadStudents();
    loadPlans();
  }, []);

  function handleChangePlanSelected(e) {
    const plan = e.target.value;

    const planCompare = plansOptions.filter(element => {
      return element.title === plan;
    });

    setPlanSelected(planCompare[0]);
  }

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
              onChange={handleChangePlanSelected}
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
              value={planSelected.price}
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
