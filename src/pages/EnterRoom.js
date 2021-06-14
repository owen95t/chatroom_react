import {Link} from "react-router-dom";
import {Button, ButtonGroup, FormControl, Input, InputGroup} from "@chakra-ui/react";

const EnterRoom = ({name, roomID, onNameChange, onRoomChange, onEnter}) => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <div className='form-wrapper'>
                <div className='account-form'>
                    <FormControl className='form'>
                        <InputGroup>
                            <label htmlFor='name'>Name: </label>
                            <Input
                                id='name'
                                value={name}
                                variant='outline'
                                onChange={(e) => onNameChange(e)} bg='white' placeholder='Pick a name'/>
                        </InputGroup>
                        <InputGroup>
                            <label htmlFor='secretID'>Enter Room ID: </label>
                            <Input
                                value={roomID}
                                onChange={e => onRoomChange(e)}
                                id='secretID'
                                variant='outline'
                                bg='white'/>
                        </InputGroup>
                        <ButtonGroup>
                            <Link to='/chat'>
                                <Button colorScheme='green' onClick={onEnter}>Enter room</Button>
                            </Link>
                        </ButtonGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default EnterRoom