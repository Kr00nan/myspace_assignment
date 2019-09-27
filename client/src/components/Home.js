import React, { Component } from 'react';
import Blogs from './Blogs';
import axios from 'axios';
import { Header, Image, Card, Button, Icon } from 'semantic-ui-react';

class Home extends Component {
  state = { people: [] };

  componentDidMount() {
    axios.get('/api/people')
      .then(res => this.setState({ people: res.data }))
      .catch(err => console.log('hello from Home componentDidMount catch...'));
  }

  unFriend = (id) => {
    const { people } = this.state;
    this.setState({ people: people.filter(p => p.id !== id) });
  }

  Friend = (id) => {
    const { people } = this.state;
    axios.put(`/api/people/${id}`)
      .then(() => this.setState({ people: people.filter(p => p.id !== id) }))
      .catch(err => console.log('hello from Home Friend catch...'));
  }

  render() {
    if (this.state.people.length > 0) {
      return (
        <>
          <br />
          <Blogs />
          <Header as='h1' textAlign='center'>Suggested Friends</Header>
          <Card.Group itemsPerRow={4}>
            <br />
            {this.state.people.map(
              person => (
                <Card key={person.id}>
                  <Image src={person.avatar} />
                  <Card.Content>
                    <Card.Header>
                      {person.name}
                    </Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Button color='red' icon basic onClick={() => this.unFriend(person.id)}>
                      <Icon name='thumbs down' />
                    </Button>
                    <Button color='green' icon basic onClick={() => this.Friend(person.id)}>
                      <Icon name='thumbs up' />
                    </Button>
                  </Card.Content>
                </Card>
              )
            )}
          </Card.Group>
        </>
      )
    } else {
      return <Header textAlign='center'>Go find some friends!</Header>
    }
  }
}

export default Home
