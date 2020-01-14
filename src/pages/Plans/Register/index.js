/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Input } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container, Content } from './styles';

import api from '~/services/api';

export default function RegisterPlan() {
  const [plan, setPlan] = useState({
    title: '',
    duration: 0,
    price: 0,
  });

  async function savePlan() {
    const arrayPlan = Object.values(plan);
    let isNull = false;
    arrayPlan.forEach(propPlan => {
      if (propPlan === null || propPlan === '') isNull = true;
    });

    if (isNull) return toast.error('Please check plan´s information');

    try {
      await api.post('/plans', plan);
      toast.success('Plan created with success!');
      history.push('/plans');
    } catch (err) {
      toast.error('This plan already exists!');
    }
  }

  function handleChangeTitle(e) {
    const newPlan = {
      title: e.target.value,
      duration: plan.duration,
      price: plan.price,
    };
    setPlan(newPlan);
  }
  function handleChangeDuration(e) {
    const newPlan = {
      title: plan.title,
      duration: Number(e.target.value),
      price: plan.price,
    };
    setPlan(newPlan);
  }
  function handleChangePrice(e) {
    const newPlan = {
      title: plan.title,
      duration: plan.duration,
      price: Number(e.target.value),
    };
    setPlan(newPlan);
  }

  return (
    <Container>
      <header>
        <strong>Register Plan</strong>
        <div>
          <Link type="button" to="/plans">
            <MdArrowBack color="#fff" size={18} />
            <span>Back</span>
          </Link>
          <button type="button" onClick={savePlan}>
            <MdSave color="#fff" size={18} />
            <span>Save</span>
          </button>
        </div>
      </header>
      <Content type="submit">
        <div>
          <span>TITLE PLAN</span>
          <Input
            name="title"
            placeholder="Title plan..."
            onChange={handleChangeTitle}
          />
        </div>
        <div className="paternDiv">
          <div className="childDiv">
            <span>DURATION (mounths)</span>
            <Input
              name="duration"
              type="number"
              placeholder="Duration plan..."
              onChange={handleChangeDuration}
            />
          </div>
          <div className="childDiv">
            <span>PRICE</span>
            <Input
              name="price"
              type="number"
              placeholder="Price plan..."
              onChange={handleChangePrice}
            />
          </div>
          <div className="childDiv">
            <span>TOTAL PRICE</span>
            <Input
              name="totalprice"
              type="number"
              readOnly
              style={{
                backgroundColor: '#e6e3e3',
              }}
              value={plan.duration * plan.price}
            />
          </div>
        </div>
      </Content>
    </Container>
  );
}
