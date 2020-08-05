import React from 'react';
import { Container, Jumbotron, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className='mt-5'>
      <Jumbotron className='text-center'>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant='primary'>Learn more</Button>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default Home;
