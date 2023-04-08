import React from 'react';
import SetNewsParams from '../components/news-analysis-date/SetNewsParams';

import { Container } from 'react-bootstrap';

function NewsAnalysisDate() {
  return (
    <Container fluid>
      <h1 className='text-center m-5 mb-3 text-white'>Analysis by date</h1>
      <SetNewsParams/>
    </Container>
  );
}

export default NewsAnalysisDate;