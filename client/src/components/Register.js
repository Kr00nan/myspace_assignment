import React, { Component } from 'react';
import { AuthConsumer } from '../providers/AuthProvider';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation } = this.state;
    const { auth: { handleRegister }, history } = this.props;

    if (password === passwordConfirmation)
      handleRegister({ email, password, passwordConfirmation }, history);
    else
      alert('Passwords Do Not Match!');
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    const { email, password, passwordConfirmation } = this.state;

    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='Email'
            required
            autoFocus
            name='email'
            value={email}
            placeholder='Email'
            onChange={this.handleChange}
          />
          <Form.Input
            label='Password'
            required
            autoFocus
            name='password'
            placeholder='Password'
            type='password'
            value={password}
            onChange={this.handleChange}
          />
          <Form.Input
            label='Password Confirmation'
            required
            autoFocus
            name='passwordConfirmation'
            placeholder='Password Confirmation'
            type='password'
            value={passwordConfirmation}
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

export default class ConnectedRegister extends Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <Register {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  };
};
