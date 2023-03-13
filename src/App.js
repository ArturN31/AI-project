import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
import SetNewsParams from './components/News/SetNewsParams';

function App() {
  return (
    <Container fluid>
      <SetNewsParams/>
    </Container>
  );
}

export default App;
