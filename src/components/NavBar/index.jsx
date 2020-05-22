import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import "./navbar.css";

const NavBar = props => {
  const [arrayLength, setArrayLength] = useState(undefined);
  const [sortType, setSortType] = useState("bubble");
  const [algorithmTitle, setAlgorithmTitle] = useState("Algorithm: Bubble");

  const randomizeArray = e => {
    e.preventDefault();
    props.radArrCB(parseInt(arrayLength, 10));
  };

  const sortArray = () => {
    props.sortButtonCB(sortType);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <div className="nav-brand">
          <Navbar.Brand href="/">Sortulizer</Navbar.Brand>
        </div>

        <Nav className="mr-auto">
          <div className="selectors">
            <Form inline onSubmit={randomizeArray}>
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
            <NavDropdown title={algorithmTitle} id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={e => {
                  setSortType("bubble");
                  setAlgorithmTitle("Algorithm: Bubble");
                }}
              >
                Bubble Sort
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={e => {
                  setSortType("merge");
                  setAlgorithmTitle("Algorithm: Merge");
                }}
              >
                Merge Sort
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <Button onClick={sortArray} variant="outline-info">
            Sort Array
          </Button>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
