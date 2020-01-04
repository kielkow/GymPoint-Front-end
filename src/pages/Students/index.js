import React from 'react';

// import { Container } from './styles';

import api from '~/services/api';

export default function Students() {
  api.get('matriculations');
  return <h1>Students</h1>;
}
