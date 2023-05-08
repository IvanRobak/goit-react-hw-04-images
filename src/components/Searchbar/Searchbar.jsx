import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Component } from 'react';
import {
  Header,
  Form,
  Button,
  Label,
  Input,
} from '../Searchbar/Searchbar.styled';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';

export class SearchBar extends Component {
  state = {
    search: '',
  };
  handleInputChange = e => {
    this.setState({ search: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      return toast.error('Введите слово для поиска');
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };
  render() {
    const { handleSubmit, handleInputChange } = this;
    const { search } = this.state;
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
            value={search}
            onChange={handleInputChange}
          />
        </Form>
      </Header>
    );
  }
}

export default SearchBar;
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
