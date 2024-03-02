
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs' // Import the missing BsSearch component

const SearchInput = () => {
    return (
        <InputGroup>
                <InputLeftElement children={<BsSearch />}/>
                <Input borderRadius={20} placeholder='Search movies...' variant='filled'/>
        </InputGroup>
    )
}

export default SearchInput