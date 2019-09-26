import React, { Component } from 'react'
import { AuthConsumer } from '../providers/AuthProvider';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

export default class Login extends Component {
  state = { email: '', password: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.auth.handleLogin({ email, password }, this.props.history);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;

    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Login</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='Email'
            autoFocus
            required
            name='email'
            placeholder='Email'
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            label='Password'
            autoFocus
            required
            name='password'
            placeholder='Password'
            value={password}
            onChange={this.handleChange}
          />
          <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    );
  };
};

export default class ConnectedLogin extends Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Login {...props} auth={auth} />}
      </AuthConsumer>
    );
  };
};
