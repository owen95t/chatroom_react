import {Button, Textarea} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import socket from '../socket/Socket'

const ChatPage = ({name, roomID, onRoomChange, isJoin, isCreate}) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messageRef = useRef()

    useEffect(() => {
        socket.connect()

        if (isJoin && !isCreate) {
            //JOIN ROOM
            console.log('JOIN ROOM')
            socket.emit('join', {name, room: roomID})
        } else if (isCreate && !isJoin) {
            //CREATE ROOM
            console.log('CREATE ROOM')
            socket.emit('create', name)
        }

        socket.on('roomID', room => {
            console.log(room)
            onRoomChange(room)
        })

        socket.on('message', response => {
            console.log('Responses: '+response)
            setMessages(messages => [...messages, response.message])
        });

        socket.on('event-message', response => {
            console.log(response)
            setMessages(messages => [...messages, response])
        })



        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        messageRef.current.scrollIntoView({behavior: 'smooth'})
    })

    //SEND ON ENTER
    const handleKey = (e) => {
        if(e.key === 'Enter'){
            sendMessage(message)
        }
    }
    //SEND ON CLICK SEND BUTTON
    const handleClick = () => {
        sendMessage(message)
    }
    //HANDLE SOCKET SEND OPERATION
    const sendMessage = (msg) => {
        socket.emit('sendMessage', msg)
        setMessages(messages => [...messages, msg])
        setMessage('')
    }

    return (
        <div>
            <div>ROOM ID: {roomID}</div>
            <div className='chat-wrapper'>
                <div className='chat-form'>
                    <div className='text-area' style={{overflow: 'auto'}}>
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                        <div ref={messageRef}/>
                    </div>
                    <div>
                        <div className='chat-text'>
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => handleKey(e)}
                                bg='white'
                                placeholder='Enter a message...'/>
                            <Button
                                colorScheme='blue'
                                style={{marginLeft: '25px'}}
                                onClick={handleClick}
                            >Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage