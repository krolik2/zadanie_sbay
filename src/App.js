import React, { useEffect, useState } from "react";
import { Container, Navbar, Row, Col, Card } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const data = await result.json();
      const { results } = data;
      setPokemons(results);
    };
    fetchData();
  }, []);

  

  useEffect(() => {
    setSearchResults(([...pokemons].filter((pokemon) => pokemon.name.includes(searchText))));
  }, [searchText, pokemons])


  return (
    <>
      <Navbar bg="dark">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="#home" style={{textAlign: "center", color: "white"}} >Kanto Pokemon</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center m-2">
            <input onChange={(e) => setSearchText(e.target.value)} />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
            {searchResults.map((pokemon, idx) => (
              <Card key={idx} style={{ width: "18rem" }} className="m-1">
                <Card.Img 
                  ariant="top"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx + 1}.png`}
                  alt="pokemon"
                />
                              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                <Card.Text>
                  {`#${idx}`}
                </Card.Text>
              </Card.Body>
              </Card>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
