import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';
import { List, Header, Segment, Button } from "semantic-ui-react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [showForm, setShowform] = useState(false);

  useEffect(() => {
    axios.get('/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.log('hello from the Blog useEffect catch...'))
  }, [])

  const renderBlogs = () => {
    return blogs.map(blog => (
      <Segment key={blog.id}>
        <List.Header as='h3'>{blog.title}</List.Header>
        <List.Description>
          {blog.body}
        </List.Description>
      </Segment>
    ))
  }

  const addBlog = (blog) => setBlogs([blog, ...blogs]);

  return (
    <div>
      <Header as='h1'>My Blogs</Header>
      <br />
      {showForm && <BlogForm addBlog={addBlog} toggleForm={setShowform} />}
      <Button onClick={() => setShowform(!showForm)}>
        {showForm ? 'Close Form' : 'Show Form'}
      </Button>
      <List>
        {renderBlogs()}
      </List>
    </div>
  )
}
