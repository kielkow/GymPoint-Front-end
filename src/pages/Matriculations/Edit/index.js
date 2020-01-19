/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input, Select } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { addMonths, parseISO, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container, Content } from './styles';

import api from '~/services/api';

export default function EditMatriculation() {
  const matriculationEdit = useSelector(
    state => state.matriculation.matriculation
  );

  const [plansOptions, setPlansOptions] = useState([]);
  const [planSelected, setPlanSelected] = useState({
    id: null,
    title: '',
    duration: 0,
    price: 0,
  });
  const [matriculation, setMatriculation] = useState(matriculationEdit);

  useEffect(() => {
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
      active: matriculation.active,
      id: matriculation.id,
      student_id: matriculation.student_id,
      student_name: matriculation.student_name,
      plan_id: Number(planId),
      plan_name: planCompare[0].title,
      start_date: matriculation.start_date,
      end_date: matriculation.end_date,
      price: matriculation.price,
    });
  }

  function handleChangeStartedDate(e) {
    const startDate = format(
      zonedTimeToUtc(parseISO(e.target.value), 'America/Sao_Paulo'),
      "yyyy-MM-dd'T'H3:mm:ss.SSS"
    );

    const endDate = addMonths(
      zonedTimeToUtc(parseISO(startDate), 'America/Sao_Paulo'),
      planSelected.duration
    );

    setMatriculation({
      active: matriculation.active,
      id: matriculation.id,
      student_id: matriculation.student_id,
      student_name: matriculation.student_name,
      plan_id: matriculation.plan_id,
      plan_name: matriculation.plan_name,
      start_date: `${startDate}Z`,
      end_date:
        planSelected.duration !== 0
          ? `${endDate}Z`
          : format(
              zonedTimeToUtc(
                parseISO(matriculation.end_date),
                'America/Sao_Paulo'
              ),
              "yyyy-MM-dd'T'H3:mm:ss.SSS"
            ),
      price: matriculation.price,
    });
  }

  async function updateMatriculation() {
    const matriculationEdited = {
      plan_id: matriculation.plan_id,
      start_date: matriculation.start_date,
    };

    const arrayMatriculation = Object.values(matriculationEdited);
    let isNull = false;
    arrayMatriculation.forEach(propMatriculation => {
      if (propMatriculation === null || propMatriculation === '') isNull = true;
    });

    if (isNull) return toast.error('Please check the matriculation');

    try {
      await api.put(`/matriculations/${matriculation.id}`, matriculationEdited);
      toast.success('Matriculation updated with success!');
      history.push('/matriculations');
    } catch (err) {
      toast.error('Not possible update this matriculation');
    }
  }

  return (
    <Container>
      <header>
        <strong>Edit Matriculation</strong>
        <div>
          <Link to="/matriculations">
            <MdArrowBack color="#fff" size={18} />
            <span>Back</span>
          </Link>
          <button type="button" onClick={updateMatriculation}>
            <MdSave color="#fff" size={18} />
            <span>Save</span>
          </button>
        </div>
      </header>
      <Content type="submit">
        <div>
          <span>STUDENT</span>
          <Input
            name="student"
            readOnly
            value={matriculation.student_name}
            style={{
              backgroundColor: '#e6e3e3',
            }}
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
              value={format(
                zonedTimeToUtc(
                  parseISO(matriculation.start_date),
                  'America/Sao_Paulo'
                ),
                'yyyy-MM-dd'
              )}
              onChange={handleChangeStartedDate}
            />
          </div>
          <div className="childDiv">
            <span>END DATE</span>
            <Input
              name="enddate"
              readOnly
              value={
                planSelected.duration !== 0
                  ? format(
                      addMonths(
                        zonedTimeToUtc(
                          parseISO(matriculation.start_date),
                          'America/Sao_Paulo'
                        ),
                        planSelected.duration
                      ),
                      'dd-MM-yyyy'
                    ).replace(/-/g, '/')
                  : format(
                      zonedTimeToUtc(
                        parseISO(matriculation.end_date),
                        'America/Sao_Paulo'
                      ),
                      'dd-MM-yyyy'
                    ).replace(/-/g, '/')
              }
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
              value={
                planSelected.price !== 0
                  ? `$${planSelected.price * planSelected.duration},00`
                  : `$${matriculation.price},00`
              }
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
