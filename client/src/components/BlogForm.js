import React from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import { useFormInput } from './hooks/useFormInput';

const BlogForm = ({ addBlog, toggleForm }) => {
  // using custom hooks...
  const title = useFormInput('');
  const body = useFormInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/blogs', { title: title.value, body: body.value })
      .then(res => {
        addBlog(res.data);
        toggleForm();

      })
      .catch(err => console.log('hello from the BlogForm handleSubmit catch...'));
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input
          label='Title'
          placeholder='Title'
          name='title'
          required
          {...title}
        />
        <Form.Input
          label='Body'
          placeholder='Body'
          name='body'
          required
          {...body}
        />
        <Form.Button type='submit'>Submit</Form.Button>
      </Form.Group>
    </Form>
  );
};

export default BlogForm;
