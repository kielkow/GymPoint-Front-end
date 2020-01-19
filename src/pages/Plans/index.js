/* eslint-disable prefer-const */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container, Content, Pagination, Previous, Next } from './styles';

import api from '~/services/api';

import * as PlanActions from '../../store/modules/plan/actions';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  let [page, setPage] = useState(1);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans', {
        params: {
          page,
        },
      });

      const { data } = response;

      setPlans(data);

      const checkFinalPage = await api.get('/plans', {
        params: {
          page: page + 1,
        },
      });

      if (checkFinalPage.data.length === 0) {
        setLoadingNext(false);
        setFinalPage(true);
      } else {
        setLoadingNext(false);
        setFinalPage(false);
      }
    }

    loadPlans();
  }, [page]);

  async function reloadPlans() {
    const response = await api.get('/plans', {
      params: {
        page,
      },
    });

    const { data } = response;

    setPlans(data);

    const checkFinalPage = await api.get('/plans', {
      params: {
        page: page + 1,
      },
    });

    if (checkFinalPage.data.length === 0) {
      setLoadingNext(false);
      setFinalPage(true);
    } else {
      setLoadingNext(false);
      setFinalPage(false);
    }
  }

  async function deletePlan(e) {
    const confirm = window.confirm('Do you really wish delete this plan?');

    if (confirm) {
      try {
        await api.delete(`/plans/${e}`);
        toast.success('Plan deleted with success!');
        history.push('/plans');
        reloadPlans();
      } catch (err) {
        toast.error('Not possible delete this student');
      }
    }
  }

  function editRequest(plan) {
    dispatch(PlanActions.updatePlanRequest(plan));
  }

  async function next() {
    setLoadingNext(true);

    setPage((page += 1));

    const pagePlans = await api.get('/plans', {
      params: {
        page,
      },
    });

    const checkFinalPage = await api.get('/plans', {
      params: {
        page: page + 1,
      },
    });

    if (checkFinalPage.data.length === 0) {
      setPlans(pagePlans.data);
      setLoadingNext(false);
      setFinalPage(true);
    } else {
      setLoadingNext(false);
      setFinalPage(false);
    }
  }

  async function previous() {
    setLoadingNext(true);
    setFinalPage(false);

    if (page !== 1) {
      setPage((page -= 1));
    }

    const pagePlans = await api.get('/plans', {
      params: {
        page,
      },
    });

    setPlans(pagePlans.data);
    setLoadingNext(false);
  }

  async function searchPlan(e) {
    if (e.target.value === '' || e.target.value === null) {
      const originalPlans = await api.get('/plans');
      setPlans(originalPlans.data);
      return;
    }
    const similarPlans = await api.get('/plans', {
      params: {
        title: e.target.value,
      },
    });
    setPlans(similarPlans.data);
  }

  return (
    <Container>
      <header>
        <strong>Management Plans</strong>
        <div>
          <Link to="/registerplan">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </Link>
          <Input
            name="name"
            placeholder="Search by title..."
            onChange={searchPlan}
          />
        </div>
      </header>
      <Content>
        <header>
          <span>TITLE</span>
          <span>DURATION (month)</span>
          <span>VALUE p/MONTH</span>
          <span />
        </header>
        <ul>
          {plans.map(plan => (
            <li key={plan.id}>
              <span>{plan.title}</span>
              <span>{plan.duration}</span>
              <span>{`$${plan.price},00`}</span>
              <div>
                <Link
                  id="edit"
                  to="/editplan"
                  onClick={() => editRequest(plan)}
                >
                  edit
                </Link>
                <button
                  id="delete"
                  type="button"
                  onClick={() => deletePlan(plan.id)}
                  value={plan.id}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Content>
      <Pagination>
        <Previous
          type="button"
          onClick={() => previous()}
          page={page}
          loadingNext={loadingNext}
        >
          Previous
        </Previous>
        <Next
          type="button"
          onClick={() => next()}
          loadingNext={loadingNext}
          finalPage={finalPage}
        >
          Next
        </Next>
      </Pagination>
    </Container>
  );
}
