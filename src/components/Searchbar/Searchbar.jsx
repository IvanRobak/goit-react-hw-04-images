import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  Header,
  Form,
  Button,
  Label,
  Input,
} from '../Searchbar/Searchbar.styled';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.currentTarget.value);
  };
  const handleSubmit = e => {
    if (query.trim() === '') {
      return toast.error('Введите слово для поиска');
    }
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <FaSearch />
          <Label>Search</Label>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </Form>
    </Header>
  );
};

export default SearchBar;
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
