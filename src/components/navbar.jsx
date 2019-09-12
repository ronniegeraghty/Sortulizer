import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown
} from "react-bootstrap";
import "./navbar.css";

const NavBar = () => {
  const [arrayLength, setArrayLength] = useState(undefined);
  const [subArrayLength, setSubArrayLength] = useState();
  const [sortType, setSortType] = useState();

  const randomizeArray = () => {
    setSubArrayLength(arrayLength);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <div className="nav-brand">
          <Navbar.Brand href="#home">Sortulizer</Navbar.Brand>
        </div>

        <Nav className="mr-auto">
          <div className="selectors">
            <Form inline className="">
              <FormControl
                type="text"
                placeholder="Array Length"
                className="mr-sm-2"
                value={arrayLength || ""}
                onChange={e => setArrayLength(e.target.value)}
              />
              <Button variant="outline-info" onClick={randomizeArray}>
                Randomize Array
              </Button>
            </Form>
          </div>
          <div className="selectors">
            <NavDropdown title="Algorithm" id="basic-nav-dropdown" className="">
              <NavDropdown.Item onClick={e => setSortType("bubble")}>
                Bubble Sort
              </NavDropdown.Item>
              <NavDropdown.Item onClick={e => setSortType("merge")}>
                Merge Sort
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <Button className="" variant="outline-info">
            Sort Array
          </Button>
        </Nav>
      </Navbar>
      <h1>SubArrayLength: {subArrayLength}</h1>
      <h1>SortType: {sortType}</h1>
    </div>
  );
};

export default NavBar;
