import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

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

      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </Container>
  );
}
