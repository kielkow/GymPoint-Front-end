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

export default function EditStudent() {
  const draftStudents = useSelector(state => state.student);
  const student = draftStudents[draftStudents.length - 1];

  const [stundetEdit, setStudentEdit] = useState(student);

  function handleChangeName(e) {
    setStudentEdit({
      id: stundetEdit.id,
      name: e.target.value,
      email: stundetEdit.email,
      age: stundetEdit.age,
      weigth: stundetEdit.weigth,
      heigth: stundetEdit.heigth,
      createdAt: stundetEdit.createdAt,
      updatedAt: stundetEdit.updatedAt,
    });
  }
  function handleChangeEmail(e) {
    setStudentEdit({
      id: stundetEdit.id,
      name: stundetEdit.name,
      email: e.target.value,
      age: stundetEdit.age,
      weigth: stundetEdit.weigth,
      heigth: stundetEdit.heigth,
      createdAt: stundetEdit.createdAt,
      updatedAt: stundetEdit.updatedAt,
    });
  }
  function handleChangeAge(e) {
    setStudentEdit({
      id: stundetEdit.id,
      name: stundetEdit.name,
      email: stundetEdit.email,
      age: e.target.value,
      weigth: stundetEdit.weigth,
      heigth: stundetEdit.heigth,
      createdAt: stundetEdit.createdAt,
      updatedAt: stundetEdit.updatedAt,
    });
  }
  function handleChangeWeigth(e) {
    setStudentEdit({
      id: stundetEdit.id,
      name: stundetEdit.name,
      email: stundetEdit.email,
      age: stundetEdit.age,
      weigth: e.target.value,
      heigth: stundetEdit.heigth,
      createdAt: stundetEdit.createdAt,
      updatedAt: stundetEdit.updatedAt,
    });
  }
  function handleChangeHeigth(e) {
    setStudentEdit({
      id: stundetEdit.id,
      name: stundetEdit.name,
      email: stundetEdit.email,
      age: stundetEdit.age,
      weigth: stundetEdit.weigth,
      heigth: e.target.value,
      createdAt: stundetEdit.createdAt,
      updatedAt: stundetEdit.updatedAt,
    });
  }

  async function updateStudent() {
    const updatedStudent = {
      provider: true,
      name: stundetEdit.name,
      email: stundetEdit.email,
      age: stundetEdit.age,
      weigth: stundetEdit.weigth,
      heigth: stundetEdit.heigth,
    };
    const arrayStudent = Object.values(updatedStudent);
    let isNull = false;
    arrayStudent.forEach(propStudent => {
      if (propStudent === null || propStudent === '') isNull = true;
    });

    if (isNull) return toast.error('Please check student´s information');

    try {
      await api.put(`/students/${stundetEdit.id}`, updatedStudent);
      toast.success('Student updated with success!');
      history.push('/students');
    } catch (err) {
      toast.error('Not possible update this student');
    }
  }

  return (
    <Container>
      <header>
        <strong>Edit Student</strong>
        <div>
          <Link type="button" to="/students">
            <MdArrowBack color="#fff" size={18} />
            <span>Back</span>
          </Link>
          <button type="button" onClick={updateStudent}>
            <MdSave color="#fff" size={18} />
            <span>Save</span>
          </button>
        </div>
      </header>
      <Content>
        <div>
          <span>FULL NAME</span>
          <Input
            name="name"
            placeholder="Student name..."
            value={stundetEdit.name}
            onChange={handleChangeName}
          />
        </div>
        <div>
          <span>E-MAIL</span>
          <Input
            name="email"
            type="email"
            placeholder="Student e-mail..."
            value={stundetEdit.email}
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
              value={stundetEdit.age}
              onChange={handleChangeAge}
            />
          </div>
          <div className="childDiv">
            <span>WEIGTH (kg)</span>
            <Input
              name="weigth"
              type="number"
              placeholder="Student weigth..."
              value={stundetEdit.weigth}
              onChange={handleChangeWeigth}
            />
          </div>
          <div className="childDiv">
            <span>HEIGTH (m)</span>
            <Input
              name="heigth"
              type="number"
              placeholder="Student heigth..."
              value={stundetEdit.heigth}
              onChange={handleChangeHeigth}
            />
          </div>
        </div>
      </Content>
    </Container>
  );
}
