import React, { useEffect, useRef, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import io from 'socket.io-client';

import style from './Dashboard.module.css';

import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Product from './Product/Product';

const Dashboard = () => {
  const socket = useRef(null);
  const userVideo = useRef(null);

  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
  }, []);

  useEffect(() => {
    socket.current = io.connect('http://localhost:5000');

    socket.current.on('yourID', (id) => {
      setYourID(id);
    });

    socket.current.on('allUsers', (users) => {
      setUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className={style.dashboard}>
      <Header />
      <Sidebar />
      <Switch>
        <Route path='/admin/dashboard/add-product'>
          <Product />
        </Route>
        <Route path='/admin/dashboard'>
          <div className={style['video-container']}>
            <video
              className={style['other-video']}
              playsInline
              muted
              autoPlay
            />
            <video
              className={style['my-video']}
              playsInline
              muted
              autoPlay
              ref={userVideo}
            />
          </div>
          <div className='my-5'>
            <Card>
              <ListGroup variant='flush'>
                {Object.keys(users).map((key) => {
                  if (key === yourID) {
                    return null;
                  }
                  return <ListGroup.Item>{key}</ListGroup.Item>;
                })}
              </ListGroup>
            </Card>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default Dashboard;
