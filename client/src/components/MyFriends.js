import React, { Component } from 'react';
import axios from 'axios';
import { Card, Image, Header } from 'semantic-ui-react';

class MyFriends extends Component {
  state = { people: [] };

  componentDidMount() {
    axios.get('/api/my_friends')
      .then(res => this.setState({ people: res.data }))
      .catch(err => console.log('hello from MyFriends componenetDidMount catch...'));
  }

  render() {
    const { people } = this.state;
    return (
      <>
        <br />
        <Header as='h2' textAlign='center'>My Friends</Header>
        <Card.Group itemsPerRow={4}>
          {people.map(person =>
            <Card key={person.id}>
              <Image src={person.avatar} />
              <Card.Content>
                <Card.Header>
                  {person.name}
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta>
                  Location: {person.location}
                  <br />
                  Birthday: {person.birthday}
                </Card.Meta>
              </Card.Content>
            </Card>
          )}
        </Card.Group>
      </>
    )
  }
}

export default MyFriends;