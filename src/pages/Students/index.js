/* eslint-disable prefer-const */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';

import { Link } from 'react-router-dom';
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
    }

    loadStudents();
  }, [page]);

  function deleteStudent() {
    confirm('Do you really wish delete this student?');
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

  return (
    <Container>
      <header>
        <strong>Management Students</strong>
        <div>
          <Link to="/registerstudent">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </Link>
          <Input name="name" placeholder="Search by name..." />
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
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
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
      </Content>
    </Container>
  );
}
