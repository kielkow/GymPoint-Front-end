/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Input } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container, Content } from './styles';

import api from '~/services/api';

export default function RegisterStudent() {
  const [student, setStudent] = useState({
    provider: true,
    name: '',
    email: '',
    age: '',
    weigth: '',
    heigth: '',
  });

  async function saveStudent() {
    const arrayStudent = Object.values(student);
    let isNull = false;
    arrayStudent.forEach(propStudent => {
      if (propStudent === null || propStudent === '') isNull = true;
    });

    if (isNull) return toast.error('Please check student´s information');

    try {
      await api.post('/students', student);
      toast.success('Student created with success!');
      history.push('/students');
    } catch (err) {
      toast.error('This student already exists!');
    }
  }

  function handleChangeName(e) {
    const newStudent = {
      provider: true,
      name: e.target.value,
      email: student.email,
      age: student.age,
      weigth: student.weigth,
      heigth: student.heigth,
    };
    setStudent(newStudent);
  }
  function handleChangeEmail(e) {
    const newStudent = {
      provider: true,
      name: student.name,
      email: e.target.value,
      age: student.age,
      weigth: student.weigth,
      heigth: student.heigth,
    };
    setStudent(newStudent);
  }
  function handleChangeAge(e) {
    const newStudent = {
      provider: true,
      name: student.name,
      email: student.email,
      age: Number(e.target.value),
      weigth: student.weigth,
      heigth: student.heigth,
    };
    setStudent(newStudent);
  }
  function handleChangeWeigth(e) {
    const newStudent = {
      provider: true,
      name: student.name,
      email: student.email,
      age: student.age,
      weigth: Number(e.target.value),
      heigth: student.heigth,
    };
    setStudent(newStudent);
  }
  function handleChangeHeigth(e) {
    const newStudent = {
      provider: true,
      name: student.name,
      email: student.email,
      age: student.age,
      weigth: student.weigth,
      heigth: Number(e.target.value),
    };
    setStudent(newStudent);
  }

  return (
    <Container>
      <header>
        <strong>Register Student</strong>
        <div>
          <Link type="button" to="/students">
            <MdArrowBack color="#fff" size={18} />
            <span>Back</span>
          </Link>
          <button type="button" onClick={saveStudent}>
            <MdSave color="#fff" size={18} />
            <span>Save</span>
          </button>
        </div>
      </header>
      <Content type="submit">
        <div>
          <span>FULL NAME</span>
          <Input
            name="name"
            placeholder="Student name..."
            onChange={handleChangeName}
          />
        </div>
        <div>
          <span>E-MAIL</span>
          <Input
            name="email"
            type="email"
            placeholder="Student e-mail..."
            onChange={handleChangeEmail}
          />
        </div>
        <div className="paternDiv">
          <div className="childDiv">
            <span>AGE</span>
            <Input
              name="age"
              type="number"
              placeholder="Student age..."
              onChange={handleChangeAge}
            />
          </div>
          <div className="childDiv">
            <span>WEIGTH (kg)</span>
            <Input
              name="weigth"
              type="number"
              placeholder="Student weigth..."
              onChange={handleChangeWeigth}
            />
          </div>
          <div className="childDiv">
            <span>HEIGTH</span>
            <Input
              name="heigth"
              type="number"
              placeholder="Student heigth..."
              onChange={handleChangeHeigth}
            />
          </div>
        </div>
      </Content>
    </Container>
  );
}
