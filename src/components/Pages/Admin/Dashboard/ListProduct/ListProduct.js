import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import axios from '../../../../../axios/axios';

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('/product/getAll')
      .then((products) => {
        setProducts(products.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Row>
        {products.length !== 0 ? (
          products.map((product) => (
            <Col sm className='my-3' key={product.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  src={`http://localhost:5000/product/image/${product.image}`}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Button variant='primary'>Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h5>Tidak Ada Product</h5>
        )}
      </Row>
    </Container>
  );
};

export default ListProduct;
