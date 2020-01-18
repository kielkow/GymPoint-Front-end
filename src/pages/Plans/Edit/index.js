/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function EditPlan() {
  const plan = useSelector(state => state.plan.plan);

  const [planEdit, setPlanEdit] = useState(plan);

  function handleChangeTitle(e) {
    setPlanEdit({
      id: planEdit.id,
      title: e.target.value,
      duration: planEdit.duration,
      price: planEdit.price,
      canceled_at: planEdit.canceled_at,
      createdAt: planEdit.createdAt,
      updatedAt: planEdit.updatedAt,
    });
  }

  function handleChangeDuration(e) {
    setPlanEdit({
      id: planEdit.id,
      title: planEdit.title,
      duration: e.target.value,
      price: planEdit.price,
      canceled_at: planEdit.canceled_at,
      createdAt: planEdit.createdAt,
      updatedAt: planEdit.updatedAt,
    });
  }

  function handleChangePrice(e) {
    setPlanEdit({
      id: planEdit.id,
      title: planEdit.title,
      duration: planEdit.duration,
      price: e.target.value,
      canceled_at: planEdit.canceled_at,
      createdAt: planEdit.createdAt,
      updatedAt: planEdit.updatedAt,
    });
  }

  async function updatePlan() {
    const updatedPlan = {
      title: planEdit.title,
      duration: planEdit.duration,
      price: planEdit.price,
    };
    const arrayPlan = Object.values(updatedPlan);
    let isNull = false;
    arrayPlan.forEach(propPlan => {
      if (propPlan === null || propPlan === '' || propPlan === 0) isNull = true;
    });

    if (isNull) return toast.error('Please check plan´s information');

    try {
      await api.put(`/plans/${planEdit.id}`, updatedPlan);
      toast.success('Plan updated with success!');
      history.push('/plans');
    } catch (err) {
      toast.error('Not possible update this plan');
    }
  }

  return (
    <Container>
      <header>
        <strong>Edit Plan</strong>
        <div>
          <Link type="button" to="/plans">
            <MdArrowBack color="#fff" size={18} />
            <span>Back</span>
          </Link>
          <button type="button" onClick={updatePlan}>
            <MdSave color="#fff" size={18} />
            <span>Save</span>
          </button>
        </div>
      </header>
      <Content>
        <div>
          <span>TITLE PLAN</span>
          <Input
            name="title"
            placeholder="Title plan..."
            value={planEdit.title}
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
              value={planEdit.duration}
              onChange={handleChangeDuration}
            />
          </div>
          <div className="childDiv">
            <span>PRICE</span>
            <Input
              name="price"
              placeholder="Price plan..."
              value={planEdit.price}
              onChange={handleChangePrice}
            />
          </div>
          <div className="childDiv">
            <span>TOTAL PRICE</span>
            <Input
              name="totalprice"
              value={`$${planEdit.duration * planEdit.price},00`}
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
