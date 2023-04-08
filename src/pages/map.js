import React from 'react';
import SetNewsParams from '../components/map/SetNewsParams';

import { Container } from 'react-bootstrap';

function Map() {
  return (
    <Container fluid>
      <h1 className='text-center m-5 mb-3 text-white'>INTERACTIVE MAP</h1>
      <SetNewsParams/>
    </Container>
  );
}

export default Map;