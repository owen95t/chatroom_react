import {Link} from "react-router-dom";
import {AlertDialog, Button, ButtonGroup, FormControl, Input, InputGroup} from "@chakra-ui/react";

const CreateRoom = ({name, roomID, onNameChange, handleCreate}) => {

    return (
        <>
            <Link to='/'>Home</Link>
            <div className='form-wrapper'>
                <div className='account-form'>
                    <FormControl className='form'>
                        <InputGroup>
                            <p>Name:</p>
                            <Input
                                variant='outline'
                                value={name}
                                onChange={e => onNameChange(e)}
                                bg='white'
                                placeholder='Pick a name'
                            />
                        </InputGroup>
                        <ButtonGroup>
                            <Link to='/chat'>
                                <Button colorScheme='green' onClick={handleCreate}>Create room</Button>
                            </Link>
                        </ButtonGroup>
                    </FormControl>
                </div>
                {/*<AlertDialog isOpen={warn} onClose={onClose}>*/}
                {/*    <h3>No name entered</h3>*/}
                {/*    <Button>OK</Button>*/}
                {/*</AlertDialog>*/}
            </div>
        </>
    )
}

export default CreateRoom