import React from 'react';
import SetNewsParams from '../components/news-analysis-theme/SetNewsParams'

import { Container } from 'react-bootstrap';

function NewsAnalysisTheme() {
  return (
    <Container fluid>
      <h1 className='text-center m-5 mb-3 text-white'>Analysis by theme</h1>
      <SetNewsParams/>
    </Container>
  );
}

export default NewsAnalysisTheme;