import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
    await fetch(url, options).catch(error => console.error(error));
    window.location.reload(false);
  };

  // Return today's date and time
  let currentTime = new Date()
  // returns the month (from 0 to 11)
  let month = currentTime.getMonth() + 1
  // returns the day of the month (from 1 to 31)
  let day = currentTime.getDate()
  // returns the year (four digits)
  let year = currentTime.getFullYear()

  // note: Max date is temporarily capped at 2024 for the purpose of the app.
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="f_themes">
          <Calendar 
          onChange={onChange} 
          value={date} 
          maxDetail={"year"} 
          minDate={new Date("01-01-1852")}
          maxDate={new Date(month + "/" + day + "/" + year)}/>
            Chosen date: {date.toDateString()}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Form.Group controlId="f_count">
          <Form.Label>Article Count:</Form.Label>
          <Form.Control
            type="number"
            onChange={handleCountChange}
            min='0'
            max='20'
          />
        </Form.Group>
      </Form>
      <NewsFetch count={params.count}/>
    </div>
  );
}

export default SetNewsParams;