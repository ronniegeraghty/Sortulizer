import React, { useState, useRef } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import "./navbar.css";

const NavBar = props => {
  const [arrayLength, setArrayLength] = useState(undefined);
  const [sortType, setSortType] = useState("bubble");
  const [algorithmTitle, setAlgorithmTitle] = useState("Algorithm: Bubble");
  const [showTooltip, setshowTooltip] = useState(false);
  const inputBox = useRef(null);

  const randomizeArray = e => {
    e.preventDefault();
    let arrayLengthInt = parseInt(arrayLength, 10);
    if (isNaN(arrayLengthInt)) {
      setshowTooltip(true);
    } else {
      props.radArrCB(arrayLengthInt);
    }
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
                onChange={e => {
                  setArrayLength(e.target.value);
                  setshowTooltip(false);
                }}
              />
              <Button
                ref={inputBox}
                variant="outline-info"
                onClick={randomizeArray}
              >
                Randomize Array
              </Button>
              <Overlay
                target={inputBox.current}
                show={showTooltip}
                placement={"bottom"}
              >
                {props => (
                  <Tooltip
                    id="needs-to-be-num"
                    {...props}
                    show={props.show.toString()}
                  >
                    Must be an integer!
                  </Tooltip>
                )}
              </Overlay>
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
