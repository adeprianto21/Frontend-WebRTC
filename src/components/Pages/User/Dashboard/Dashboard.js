import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Card, ListGroup, Alert, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import style from './Dashboard.module.css';

import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

const Dashboard = () => {
  const socket = useRef(null);
  const userVideo = useRef(null);
  const partnerVideo = useRef();

  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

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

    socket.current.on('hey', (data) => {
      console.log('hey');
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const callPeer = useCallback(
    (id) => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {
          iceServers: [
            {
              urls: 'stun:numb.viagenie.ca',
              username: 'sultan1640@gmail.com',
              credential: '98376683',
            },
            {
              urls: 'turn:numb.viagenie.ca',
              username: 'sultan1640@gmail.com',
              credential: '98376683',
            },
          ],
        },
        stream: stream,
      });

      peer.on('signal', (data) => {
        socket.current.emit('callUser', {
          userToCall: id,
          signalData: data,
          from: yourID,
        });
      });

      peer.on('stream', (stream) => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream;
        }
      });

      socket.current.on('callAccepted', (signal) => {
        setCallAccepted(true);
        peer.signal(signal);
      });
    },
    [stream, yourID]
  );

  const acceptCall = useCallback(() => {
    setReceivingCall(false);
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.current.emit('acceptCall', { signal: data, to: caller });
    });

    peer.on('stream', (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }, [caller, callerSignal, stream]);

  let usersComponent = (
    <Alert variant='danger'>
      <h5 className='text-center font-weight-bold'>
        Tidak Ada User Yang Online
      </h5>
    </Alert>
  );

  const otherUser = Object.keys(users).find((key) => key !== yourID);

  if (otherUser) {
    usersComponent = (
      <Card>
        <ListGroup variant='flush'>
          {Object.keys(users).map((key) => {
            if (key === yourID) {
              return null;
            }
            return (
              <ListGroup.Item
                key={key}
                className='d-flex justify-content-between align-items-center'
              >
                {key}
                <Button variant='success' onClick={() => callPeer(key)}>
                  Call
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    );
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <video
        className={style['my-video']}
        playsInline
        muted
        autoPlay
        ref={userVideo}
      />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video
        className={style['other-video']}
        playsInline
        autoPlay
        ref={partnerVideo}
      />
    );
  }

  return (
    <div className={style.dashboard}>
      <Header />
      <Sidebar />
      <Switch>
        <Route path='/user/dashboard'>
          <div className={style['video-container']}>
            {UserVideo}
            {PartnerVideo}
          </div>
          {receivingCall ? (
            <Alert variant='primary' className='text-center'>
              <h5 className='font-weight-bold'>{caller} is calling you</h5>
              <hr />
              <Button variant='success' onClick={acceptCall}>
                Accept
              </Button>
            </Alert>
          ) : null}
          <div className='my-5'>{usersComponent}</div>
        </Route>
      </Switch>
    </div>
  );
};

export default Dashboard;
