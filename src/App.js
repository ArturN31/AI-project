import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
import NewsFetch from './components/News/NewsFetch';

function App() {
  return (
    <Container fluid>
      <NewsFetch/>
    </Container>
  );
}

export default App;
