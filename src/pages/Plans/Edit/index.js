import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdArrowBack, MdSave } from 'react-icons/md';

import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

export default function EditPlan() {
  return (
    <Container>
      <header>
        <strong>Edit Plan</strong>
        <div>
          <Link type="button" to="/plans">
            <MdArrowBack color="#fff" size={18} />
            <span>Back</span>
          </Link>
          <button type="button">
            <MdSave color="#fff" size={18} />
            <span>Save</span>
          </button>
        </div>
      </header>
      <Content type="submit">
        <div>
          <span>TITLE PLAN</span>
          <Input name="title" placeholder="Title plan..." value="Start" />
        </div>
        <div className="paternDiv">
          <div className="childDiv">
            <span>DURATION (mounths)</span>
            <Input
              name="duration"
              type="number"
              placeholder="Duration plan..."
              value="1"
            />
          </div>
          <div className="childDiv">
            <span>PRICE</span>
            <Input
              name="price"
              type="number"
              placeholder="Price plan..."
              value="129.00"
            />
          </div>
          <div className="childDiv">
            <span>TOTAL PRICE</span>
            <Input
              name="totalprice"
              type="number"
              value="129.00"
              readOnly
              style={{
                backgroundColor: '#e6e3e3',
              }}
            />
          </div>
        </div>
      </Content>
    </Container>
  );
}
