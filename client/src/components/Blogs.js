import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from './BlogForm';
import { Card, List, Header, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
        <Card.Header as='h3' style={{backgroundColor: 'lightblue', padding: '10px'}}>{blog.title}</Card.Header>
        <Card.Description>
          {blog.body}
        </Card.Description>
        <br />
        <Button color='linkedin' as={Link} to={`/users/${blog.user_id}/blogs/${blog.id}`}>View Blog</Button>
      </Segment>
    ))
  }

  const addBlog = (blog) => setBlogs([blog, ...blogs]);

  return (
    <div>
      <Header as='h1'>Blogs</Header>
      <br />
      {showForm && <BlogForm addBlog={addBlog} toggleForm={setShowform} />}
      <Button onClick={() => setShowform(!showForm)}>
        {showForm ? 'Close' : 'New Blog?'}
      </Button>
      <List>
        {renderBlogs()}
      </List>
    </div>
  )
}
