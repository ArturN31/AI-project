import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
import GetUserInput from './components/GetUserInput';

function App() {
  return (
    <Container fluid>
      <GetUserInput/>
    </Container>
  );
}

export default App;
