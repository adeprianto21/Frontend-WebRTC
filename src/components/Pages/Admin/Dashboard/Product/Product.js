import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../../../../../axios/axios';

const initialValues = {
  name: '',
  description: '',
  price: '',
  stock: '',
  image: '',
  categoryId: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
  stock: Yup.number().required(),
  image: Yup.mixed().required(),
  categoryId: Yup.string().required(),
});

const Product = () => {
  const history = useHistory();

  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get('/product/categories')
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log(err));
  }, []);

  const submitHandler = (values) => {
    console.log(values);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('stock', values.stock);
    formData.append('image', values.image);
    formData.append('categoryId', values.categoryId);

    setLoading(true);
    axios
      .post('/product/createProduct', formData, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLoading(false);
        history.replace('/admin/dashboard/list-product');
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return categories ? (
    <Container className='mt-3 mb-5'>
      <Card>
        <Card.Body>
          <Card.Title className='text-center'>Tambah Product</Card.Title>
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
                      <Form.Label>Nama Barang</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Product Name'
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

                    <Form.Group controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows='3'
                        placeholder='Enter Description'
                        name='description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.description &&
                          formik.errors.description
                        }
                      />

                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='price'>
                      <Form.Label>Harga Barang</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Product Price'
                        name='price'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.price && formik.errors.price}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='stock'>
                      <Form.Label>Stock Barang</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Product Stock'
                        name='stock'
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.stock && formik.errors.stock}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.stock}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='categoryId'>
                      <Form.Label>Kategori Barang</Form.Label>
                      <Form.Control
                        as='select'
                        name='categoryId'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryId}
                        isInvalid={
                          formik.touched.categoryId && formik.errors.categoryId
                        }
                      >
                        <option value=''>Pilih Kategori...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.category}
                          </option>
                        ))}
                      </Form.Control>

                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.categoryId}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='image'>
                      <Form.Label>Gambar Barang</Form.Label>
                      <Form.Control
                        name='image'
                        type='file'
                        label='Product Image'
                        onChange={(event) => {
                          formik.setFieldValue(
                            'image',
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.image && formik.errors.image}
                      />

                      <Form.Control.Feedback type='invalid'>
                        {formik.errors.image}
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
  ) : (
    <div>loading...</div>
  );
};

export default Product;
