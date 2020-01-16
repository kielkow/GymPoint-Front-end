/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Input, Select } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { addMonths, parseISO, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container, Content } from './styles';

import api from '~/services/api';

export default function RegisterMatriculation() {
  const [studentsOptions, setStudentsOptions] = useState([]);
  const [plansOptions, setPlansOptions] = useState([]);
  const [planSelected, setPlanSelected] = useState({});
  const [endDate, setEndDate] = useState('');
  const [matriculation, setMatriculation] = useState({
    student_id: null,
    plan_id: null,
    start_date: null,
  });

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
          id: element.id,
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
    const planId = e.target.value;
    const plan = e.target.options[e.target.options.selectedIndex].text;

    const planCompare = plansOptions.filter(element => {
      return element.title === plan;
    });

    setPlanSelected(planCompare[0]);

    setMatriculation({
      student_id: matriculation.student_id,
      plan_id: Number(planId),
      start_date: matriculation.start_date,
    });
  }

  function handleChangeStudentSelected(e) {
    const studentId = Number(e.target.value);

    const studentCompare = studentsOptions.filter(element => {
      return element.id === studentId;
    });

    setMatriculation({
      student_id: studentCompare[0].id,
      plan_id: matriculation.plan_id,
      start_date: matriculation.start_date,
    });
  }

  function handleChangeStartedDate(e) {
    const startDate = format(
      zonedTimeToUtc(parseISO(e.target.value), 'America/Sao_Paulo'),
      "yyyy-MM-dd'T'H3:mm:ss.SSS"
    );

    setMatriculation({
      student_id: matriculation.student_id,
      plan_id: matriculation.plan_id,
      start_date: `${startDate}Z`,
    });

    if (planSelected.duration) {
      setEndDate(
        format(
          addMonths(
            zonedTimeToUtc(parseISO(startDate), 'America/Sao_Paulo'),
            planSelected.duration
          ),
          'dd-MM-yyyy'
        ).replace(/-/g, '/')
      );
    }
  }

  async function saveMatriculation() {
    const arrayMatriculation = Object.values(matriculation);
    let isNull = false;
    arrayMatriculation.forEach(propMatriculation => {
      if (propMatriculation === null || propMatriculation === '') isNull = true;
    });

    if (isNull) return toast.error('Please check the matriculation');

    try {
      await api.post('/matriculations', matriculation);
      toast.success('Matriculation created with success!');
      history.push('/matriculations');
    } catch (err) {
      toast.error('This matriculation already exists!');
    }
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
          <button type="button" onClick={saveMatriculation}>
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
            onChange={handleChangeStudentSelected}
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
              onChange={handleChangeStartedDate}
            />
          </div>
          <div className="childDiv">
            <span>END DATE</span>
            <Input
              name="enddate"
              readOnly
              value={endDate}
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
