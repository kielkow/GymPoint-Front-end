/* eslint-disable array-callback-return */
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

import * as StudentActions from '../../store/modules/student/actions';

export default function Students() {
  const [students, setStudents] = useState([]);
  let [page, setPage] = useState(1);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students', {
        params: {
          page,
        },
      });

      const { data } = response;

      setStudents(data);

      const checkFinalPage = await api.get('/students', {
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

    loadStudents();
  }, [page]);

  async function reloadStudents() {
    const response = await api.get('/students', {
      params: {
        page,
      },
    });

    const { data } = response;

    setStudents(data);

    const checkFinalPage = await api.get('/students', {
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

  async function deleteStudent(e) {
    const confirm = window.confirm('Do you really wish delete this student?');

    if (confirm) {
      try {
        await api.delete(`/students/${e}`);
        toast.info('Student deleted with success.');
        history.push('/students');
        reloadStudents();
      } catch (err) {
        toast.error(
          'Not possible delete a student, please check his matriculation'
        );
      }
    }
  }

  function editRequest(student) {
    dispatch(StudentActions.updateStudentRequest(student));
  }

  async function next() {
    setLoadingNext(true);

    setPage((page += 1));

    const pageStudents = await api.get('/students', {
      params: {
        page,
      },
    });

    const checkFinalPage = await api.get('/students', {
      params: {
        page: page + 1,
      },
    });

    if (checkFinalPage.data.length === 0) {
      setStudents(pageStudents.data);
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

    const pageStudents = await api.get('/students', {
      params: {
        page,
      },
    });

    setStudents(pageStudents.data);
    setLoadingNext(false);
  }

  async function searchStudent(e) {
    if (e.target.value === '' || e.target.value === null) {
      const originalStudents = await api.get('/students');
      setStudents(originalStudents.data);
      return;
    }
    const similarStudents = await api.get('/students', {
      params: {
        name: e.target.value,
      },
    });
    setStudents(similarStudents.data);
  }

  return (
    <Container>
      <header>
        <strong>Management Students</strong>
        <div>
          <Link to="/registerstudent">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </Link>
          <Input
            name="name"
            placeholder="Search by name..."
            onChange={searchStudent}
          />
        </div>
      </header>
      <Content>
        <header>
          <span>NAME</span>
          <span>E-MAIL</span>
          <span>AGE</span>
          <span />
        </header>
        <ul>
          {students.map(student => (
            <li key={student.id}>
              <span>{student.name}</span>
              <span>{student.email}</span>
              <span>{student.age}</span>
              <div>
                <Link
                  id="edit"
                  to="/editstudent"
                  onClick={() => editRequest(student)}
                >
                  edit
                </Link>
                <button
                  id="delete"
                  type="button"
                  onClick={() => deleteStudent(student.id)}
                  value={student.id}
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
