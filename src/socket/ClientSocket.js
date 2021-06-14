import { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:4000/';

const ClientSocket = ({ username, room }) => {
    const socketRef = useRef();
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        socketRef.current = socketIOClient(ENDPOINT, {
            autoConnect: false,
            transports: ['websocket']
        });

        socketRef.current.emit('join', { username, room }, error => {
            if (error) {
                setError(error);
            }
        });

        return () => {
            socketRef.current.emit('disconnect');
        };
    }, [username, room]);

    useEffect(() => {
        socketRef.current.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socketRef.current.on('roomData', ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = message => {
        socketRef.current.emit('sendMessage', message, () => {});
    };

    const connectSocket = () => {
        socketRef.current.connect()
    }

    return { users, messages, sendMessage, error, connectSocket };
};

export default ClientSocket;