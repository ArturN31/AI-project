import React from 'react';
import GetUserInput from '../components/text-analysis/GetUserInput';

import { Container } from 'react-bootstrap';

function TextAnalysis() {
  return (
    <Container fluid>
      <h1 className='text-center m-5 mb-3 text-white'>Find the emotion in your text</h1>
      <GetUserInput/>
    </Container>
  );
}

export default TextAnalysis;