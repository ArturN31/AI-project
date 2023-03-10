import React, { useState } from "react";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";

import Calendar from "react-calendar";

// used to update the state of the params. Uses onSubmit
export function SetNewsParams({ onSubmit }) {
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
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...params });
  };


  // note: Max date is temporarily capped at 2024 for the purpose of the app.
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="f_themes">
          <Calendar onChange={onChange} value={date} maxDetail={"year"} minDate={new Date("01-01-1852")}
          maxDate={new Date("01-01-2024")}/>
            
            {console.log(date)}
            {date.toDateString()}
        </Form.Group>
        
         <Form.Group controlId="f_count">
             <Form.Label>Article Count:</Form.Label>
             <Form.Control
                 type="text"
                 onChange={handleCountChange}
             />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sort-By Params Above
        </Button>
      </Form>


    </div>
   
  );
}



//WILL REMOVE BELOW CODE SOON


 // <Form onSubmit={handleSubmit}>
    //     <Form.Group controlId="f_themes">
    //         <Form.Label>Theme:</Form.Label>
    //         <DropdownButton id="dropdown-themes" title={params.themes}>
    //             {/* maps through themes array for drop down box */}
    //             {themes.map((theme, index) => (
    //                 <Dropdown.Item
    //                 key={index}
    //                 onClick={() => handleDropdownSelection(theme)}>
    //                     {theme}
    //                 </Dropdown.Item>
    //             ))}
    //         </DropdownButton>
    //     </Form.Group>

    //     <Form.Group controlId="f_count">
    //         <Form.Label>Article Count:</Form.Label>
    //         <Form.Control
    //             type="text"
    //             onChange={handleCountChange}
    //         />
    //     </Form.Group>

    //     <Button variant="primary" type="submit">
    //         Sort-By Params Above
    //     </Button>
    // </Form>