import {Button, ButtonGroup, FormControl} from "@chakra-ui/react"
import {Link} from 'react-router-dom'

const HomePage = () => {
    return (
        <div className='home-page'>
            <div className='form-wrapper'>
                <div className='account-form'>
                    <FormControl className='form'>
                        <ButtonGroup>
                            <Link to='/create'>
                                <Button colorScheme='teal'>Create Room</Button>
                            </Link>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Link to='/enter'>
                                <Button colorScheme='blue'>Enter Room</Button>
                            </Link>
                        </ButtonGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default HomePage