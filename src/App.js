import logo from "./logo.svg";
import Chart from "./components/Chart"
import {Container, Accordion, Card, Button} from "react-bootstrap";
import "./App.css";

let symbols = {
  name: ['Apple Inc.', 'Microsoft Corp.', 'Amazon.com Inc.', 'Facebook Inc.', 'Tesla Inc.'],
  ticker: ['aapl', 'msft', 'amzn', 'fb', 'tsla']
}

function App() {
  return <Container>
    <h1>Jairo's Portfolio</h1>
    <Accordion>
      {symbols.name.map((item, i) => (
  <Card>
  <Card.Header>
    <Accordion.Toggle as={Button} variant="link" eventKey={i}>
      {item}
    </Accordion.Toggle>
  </Card.Header>
  <Accordion.Collapse eventKey={i}>
  <Chart symbol = {symbols.ticker[i]}></Chart>
  </Accordion.Collapse>
</Card>
      ))}

  </Accordion>
    </Container>;
}

export default App;
