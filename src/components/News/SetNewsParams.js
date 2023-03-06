import React, { useState } from "react";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";

const themes = ["arts", "automobiles", "books", "business", "fashion", "food", "health", "home", "insider", "magazine", "movies", "nyregion", "obituaries", "opinion", "politics", "realestate", "science", "sports", "sundayreview", "technology", "theater", "t-magazine", "travel", "upshot", "us", "world"];


// used to update the state of the params. Uses onSubmit
export function SetNewsParams({ onSubmit }) {
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
        onSubmit({ ...params });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="f_themes">
                <Form.Label>Theme:</Form.Label>
                <DropdownButton id="dropdown-themes" title={params.themes}>
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
                    type="text"
                    onChange={handleCountChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Sort-By Params Above
            </Button>
        </Form>
    );
};