import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import NewsFetch from "./NewsFetch";
import Calendar from "react-calendar";

// used to update the state of the params. Uses onSubmit
function SetNewsParams() {
  const [params, setParams] = useState({
    year: 2023,
    month: 1,
    count: 1,
  });

  // new date sets to current date upon refresh but should ideally be set to whatever the user last entered prior to refresh
  const [date, setDate] = useState(new Date());

  // sets params for themes
  const handleDateChange = (date) => {
    setParams({ ...params, year: date.getFullYear(), month: date.getMonth() + 1 });
  };

  // sets params for count
  const handleCountChange = (e) => {
    setParams({ ...params, count: e.target.value });
  };

  const onChange = (date) => {
    setDate(date);
    handleDateChange(date);
  }

  // used to handle form submission (params are updated)
  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:3001/news';
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params)
    };
    await fetch(url, options).catch(error => console.error(error))
    window.location.reload(false);
  };

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} className="col-6 mx-auto user-input-div text-center">
            <Row className="text-center">
              <Col>
                  <p>First choose the date on the calendar presented bellow, then press submit and enter the article count to be displayed.</p>
              </Col>
            </Row>
            <Form.Group controlId="f_themes">
              <Calendar 
              onChange={onChange} 
              value={date} 
              maxDetail={"year"} 
              minDate={new Date("01-01-2000")}
              maxDate={new Date()}
              className='mx-auto'/>
                <p className="mt-3">Chosen date: {date.toDateString().split(' ')[1]} {date.toDateString().split(' ')[3]}</p>
            </Form.Group>
            <Button type="submit" className="m-4 mt-2 btn-submit">
              Submit
            </Button>
            <Form.Group controlId="f_count">
              <Form.Label>Article Count:</Form.Label>
              <Form.Control
                type="number"
                onChange={handleCountChange}
                min='0'
                max='20'
                className="w-50 mx-auto"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <NewsFetch count={params.count}/>
        </Col>
      </Row>
    </>
  );
}

export default SetNewsParams;