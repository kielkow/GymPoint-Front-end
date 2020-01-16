import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full name..." />
        <Input name="email" type="email" placeholder="Your e-mail..." />

        <hr />

        <Input type="password" name="oldPassword" placeholder="Your password" />
        <Input type="password" name="password" placeholder="New password..." />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password..."
        />

        <button type="submit">Update Profile</button>
      </Form>

      <button type="button">Sign out</button>
    </Container>
  );
}
