import React, { useState } from "react";
import { Row, Col, Form, DropdownButton, Dropdown } from "react-bootstrap";
import NewsFetch from "./NewsFetch";

const themes = ["arts", "automobiles", "books", "business", "fashion", "food", "health", "home", "insider", "magazine", "movies", "nyregion", "obituaries", "opinion", "politics", "realestate", "science", "sports", "sundayreview", "technology", "theater", "t-magazine", "travel", "upshot", "us", "world"];


// used to update the state of the params. Uses onSubmit
function SetNewsParams() {
    const [params, setParams] = useState({
        themes: "home",
        count: 1
    });

    // sets params for themes
    const handleDropdownSelection = (e) => {
        setParams({ ...params, themes: e });
    };

    // sets params for count
    const handleCountChange = (e) => {
        setParams({ ...params, count: e.target.value });
    };

    // used to handle form submission (params are updated)
    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.reload(false);
    };

    return (
        <Row>
            <Col>
                <Form onSubmit={handleSubmit} className='col-6 mx-auto'>
                    <Form.Group controlId="f_themes" className='m-4'>
                        <Form.Label>Theme:</Form.Label>
                        <DropdownButton 
                        id="dropdown-themes" 
                        title={params.themes} 
                        variant="secondary"
                        menuVariant="dark"
                        >
                            {/* maps through themes array for drop down box */}
                            {themes.map((theme, index) => (
                                <Dropdown.Item
                                key={index}
                                onClick={() => handleDropdownSelection(theme)}>
                                    {theme}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group controlId="f_count">
                        <Form.Label>Article Count:</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={handleCountChange}
                            min='0'
                        />
                    </Form.Group>
                </Form>
                <NewsFetch params={params}/>
            </Col>
        </Row>
    );
};

export default SetNewsParams;