import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from "react-bootstrap"

const CLIENT_ID = "4adad9c162f3453b93420edd59b35a11"
const CLIENT_SECRET = "676a8b9020464773a5b13252f72f29c7"

function App() {
  const [searchInput, setSearchInput] = useState("")
  const [accessToken, setAccessToken] = useState("")
  useEffect(() => {
    let authParametrs = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials&client_id=" + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
     fetch('https:accounts.spotify.com/api/token', authParametrs)
     .then(response => response.json())
     .then(data => setAccessToken(data.access_token))
    },[])
    async function search()  {
      console.log("Search for"  + searchInput);

      let artistParametrs = {
      method: 'GET',
      headers: {
        'Contente-type': 'application/json',
        'Authorization': 'Bearer' + accessToken,
      }
    }
    var artistID = await fetch ('https://api.spotify.com/v1/search' + searchInput + '&type=artist', artistParametrs)
     .then(response => response.json())
     .then(data => { return data.artist.items[0].id })

     console.log("Artist Id is " +  artistID);
     
     let artist  = await fetch('https://api.spotify.com/v1/artists/{id}')
     .then(response => response.json())
     .then(data =>  console.log(data))
  }
  return (
    <div className="App">
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search For Artists'
            type='input'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className='mx-2 row row-cols-4'>
          <Card>
            <Card.Img src='#' />
            <Card.Body>
              <Card.Title>Album Name Here</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default App;
