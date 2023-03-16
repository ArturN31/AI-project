import React from 'react';
import MapPopup from '../components/map/MapPopup';

import { Container } from 'react-bootstrap';

function Map() {
  return (
    <Container fluid>
      <h1 className='text-center m-5 text-white'>INTERACTIVE MAP</h1>
      <MapPopup/>
    </Container>
    
  );
}

export default Map;