import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

export default function Students() {
  return (
    <Container>
      <Form>
        <strong>Management Students</strong>
        <div>
          <button type="button">
            <MdAdd color="#fff" size={18} />
            <span>Register</span>
          </button>
          <Input name="name" placeholder="Search by name..." />
        </div>
      </Form>
    </Container>
  );
}
