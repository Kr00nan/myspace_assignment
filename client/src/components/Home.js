import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header, Image, Card, Button, Icon } from 'semantic-ui-react';

class Home extends Component {
  state = { people: [] };

  componentDidMount() {
    axios.get('/api/people')
      .then(res => this.setState({ people: res.data }))
      .catch(err => console.log('hello from Home componentDidMount catch...'));
  }

  sample = () => {
    const { people } = this.state;

    if (people.length) {
      const index = Math.floor(Math.random() * people.length);
      return people[index];
    } else {
      return null;
    }
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
    const person = this.sample();
    if (person) {
      return (
        <div>
          <br />
          <Header as='h1' textAlign='center'>MySpace</Header>
          <br />
          <Card key={person.id}>
            <Image src={person.avatar} />
            <Card.Content>
              <Card.Header>
                {person.name}
              </Card.Header>
              <Card.Meta>
                Location: {person.location}
                <br />
                Birthday: {person.birthday}
              </Card.Meta>
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
          <Link to='/my_friends'>
            <Button color='blue'>Go to Friends List</Button>
          </Link>
        </div>
      )
    } else {
      return <Header textAlign='center'>Go find a friend!</Header>
    }
  }
}

export default Home
