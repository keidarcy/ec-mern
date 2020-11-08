import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

interface SearchBoxProps {}

export const SearchBox: React.FC<SearchBoxProps> = ({}) => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit} inline>
        <Form.Control
          type="text"
          name="q"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          placeholder="Search product..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button type="submit" variant="outline-success" className="p-2">
          Search
        </Button>
      </Form>
    </>
  );
};
