/* eslint-disable prefer-const */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';
import { AiTwotoneAlert } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import history from '~/services/history';
import { Container, Content, Pagination, Previous, Next } from './styles';

import api from '~/services/api';

import * as MatriculationActions from '../../store/modules/matriculation/actions';

export default function Matriculations() {
  const [matriculations, setMatriculations] = useState([]);
  let [page, setPage] = useState(1);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadMatriculations() {
      const response = await api.get('/matriculations', {
        params: {
          page,
        },
      });

      const { data } = response;

      setMatriculations(data);

      const checkFinalPage = await api.get('/matriculations', {
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

    loadMatriculations();
  }, [page]);

  async function reloadMatriculations() {
    const response = await api.get('/matriculations', {
      params: {
        page,
      },
    });

    const { data } = response;

    setMatriculations(data);

    const checkFinalPage = await api.get('/matriculations', {
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

  function editRequest(matriculation) {
    dispatch(MatriculationActions.updateMatriculationRequest(matriculation));
  }

  async function deleteMatriculation(e) {
    const confirm = window.confirm(
      'Do you really wish delete this matriculation?'
    );

    if (confirm) {
      try {
        await api.delete(`/matriculations/${e}`);
        toast.success('Matriculation deleted with success!');
        history.push('/matriculations');
        reloadMatriculations();
      } catch (err) {
        toast.error('Not possible delete this matriculation');
      }
    }
  }

  async function next() {
    setLoadingNext(true);

    setPage((page += 1));

    const pageMatriculations = await api.get('/matriculations', {
      params: {
        page,
      },
    });

    const checkFinalPage = await api.get('/matriculations', {
      params: {
        page: page + 1,
      },
    });

    if (checkFinalPage.data.length === 0) {
      setMatriculations(pageMatriculations.data);
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

    const pageMatriculations = await api.get('/matriculations', {
      params: {
        page,
      },
    });

    setMatriculations(pageMatriculations.data);
    setLoadingNext(false);
  }

  async function searchMatriculation(e) {
    if (e.target.value === '' || e.target.value === null) {
      const originalMatriculations = await api.get('/matriculations');
      setMatriculations(originalMatriculations.data);
      return;
    }
    const similarMatriculations = await api.get('/matriculations', {
      params: {
        student_name: e.target.value,
      },
    });
    setMatriculations(similarMatriculations.data);
  }

  return (
    <Container>
      <header>
        <strong>Management Matriculations</strong>
        <div>
          <Link to="/registermatriculation">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </Link>
          <Input
            name="name"
            placeholder="Search by student..."
            onChange={searchMatriculation}
          />
        </div>
      </header>
      <Content>
        <header>
          <span>NAME</span>
          <span>PLANO</span>
          <span>START</span>
          <span>END</span>
          <span>ACTIVE</span>
          <span />
        </header>
        <ul>
          {matriculations.map(matriculation => (
            <li key={matriculation.id}>
              <span>{matriculation.student_name}</span>
              <span>{matriculation.plan_name}</span>
              <span>
                {format(new Date(matriculation.start_date), 'dd/MM/yyyy')}
              </span>
              <span>
                {format(new Date(matriculation.end_date), 'dd/MM/yyyy')}
              </span>
              <span>
                <AiTwotoneAlert
                  size={24}
                  color={matriculation.active ? '#50d250' : '#eee'}
                />
              </span>
              <span />
              <div>
                <Link
                  id="edit"
                  to="/editmatriculation"
                  onClick={() => editRequest(matriculation)}
                >
                  edit
                </Link>
                <button
                  id="delete"
                  type="button"
                  onClick={() => deleteMatriculation(matriculation.id)}
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
