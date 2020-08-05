import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const submitHandler = (values) => {
  console.log(values);
};

const Register = () => {
  return (
    <Container className='mt-5'>
      <Card style={{ width: '50%', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className='text-center'>User Register</Card.Title>
          <Card.Subtitle className='mb-2 text-muted text-center'>
            Apo-Tech
          </Card.Subtitle>
          <div className='mt-5'>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              {(formik) => {
                return (
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Fullname'
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.name && formik.errors.name}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.email && formik.errors.email}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='username'>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Username'
                        name='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.username && formik.errors.username
                        }
                      />
                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.username}
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

                    <div className='text-center'>
                      <Button variant='primary' type='submit' className='mt-3'>
                        Submit
                      </Button>
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

export default Register;
