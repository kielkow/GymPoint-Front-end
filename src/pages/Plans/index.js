/* eslint-disable prefer-const */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container, Content, Pagination, Previous, Next } from './styles';

import api from '~/services/api';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  let [page, setPage] = useState(1);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);

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
  }, [page, plans]);

  async function deletePlan(e) {
    const confirm = window.confirm('Do you really wish delete this plan?');

    if (confirm) {
      try {
        await api.delete(`/plans/${e}`);
        toast.success('Plan deleted with success!');
        history.push('/plans');
      } catch (err) {
        toast.error('Not possible delete this student');
      }
    }
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

  return (
    <Container>
      <header>
        <strong>Management Plans</strong>
        <div>
          <Link to="/registerplan">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </Link>
          <Input name="name" placeholder="Search by name..." />
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
              <span>{plan.price}</span>
              <div>
                <Link id="edit" to="/editplan">
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
