import React from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../../../redux/actions';
import isLoggedIn from '../../../../hooks/useIsLoggedIn';

const initialValues = {
  identifier: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  isLoggedIn();

  const dispatch = useDispatch();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const submitHandler = (values) => {
    dispatch(actions.authAdmin(values.identifier, values.password));
  };

  return (
    <Container className='mt-5'>
      <Card style={{ width: '50%', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className='text-center'>User Login</Card.Title>
          <Card.Subtitle className='mb-2 text-muted text-center'>
            Apo-Tech
          </Card.Subtitle>
          <div className='mt-5'>
            {error && (
              <Alert
                variant='danger'
                onClose={() => {
                  dispatch(actions.clearError());
                }}
                dismissible
                className='mb-4'
              >
                <p className='text-center font-weight-bold'>{error}</p>
              </Alert>
            )}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              {(formik) => {
                return (
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId='identifier'>
                      <Form.Label>Username / Email</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Username / Email'
                        name='identifier'
                        value={formik.values.identifier}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.identifier && formik.errors.identifier
                        }
                      />
                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.identifier}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                      />

                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className='text-center mt-3'>
                      {loading ? (
                        <Spinner animation='border' variant='primary' />
                      ) : (
                        <Button variant='primary' type='submit'>
                          Login
                        </Button>
                      )}
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
