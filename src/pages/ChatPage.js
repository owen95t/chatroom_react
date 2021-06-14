import {Button, Textarea} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import socket from '../socket/Socket'

const ChatPage = ({name, roomID, onRoomChange, isJoin, isCreate}) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        console.log(name)
        socket.connect()

        if (isJoin && !isCreate) {
            //JOIN ROOM
            socket.emit('join', {name, roomID})
        } else if (isCreate && !isJoin) {
            //CREATE ROOM
            socket.emit('create', name)
        }

        socket.on('roomID', room => {
            console.log(room)
            onRoomChange(room)
        })

        socket.on('message', msg => {
            setMessages(messages => [...messages, msg])
        });

        socket.on('sendMessage', message)

    }, [])

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
    }

    return (
        <div>
            <div>ROOM ID: {roomID}</div>
            <div className='chat-wrapper'>
                <div className='chat-form'>
                    <div className='text-area'>
                        {messages.map(msg => (
                            <p>{msg}</p>
                        ))}
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