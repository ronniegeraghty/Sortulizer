import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
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
  const [savedArrayLength, setSavedArrayLength] = useState(props.arrayLength);
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
  });
  const inputBox = useRef(null);

  const randomizeArray = e => {
    e.preventDefault();
    let arrayLengthInt = parseInt(arrayLength, 10);
    if (props.sortStatus === "active") {
      setTooltip({
        show: true,
        content: "Pause sort first!",
      });
    } else {
      // If sort status is inactive
      if (arrayLength === undefined || arrayLength === "") {
        //If input empty use last array length used.
        //Need to test if undefined or "" before isNaN because underfined will also cause isNaN to be true
        props.radArrCB(savedArrayLength);
      } else if (isNaN(arrayLength)) {
        setTooltip({
          show: true,
          content: "Must be an Integer!",
        });
      } else {
        props.radArrCB(arrayLengthInt);
        setSavedArrayLength(arrayLengthInt);
      }
    }
  };

  const sortArray = () => {
    setTooltip({ show: false });
    props.sortButtonCB();
  };

  useEffect(() => {}, [props.sortType]);

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
                  setTooltip(prev => ({
                    ...prev,
                    show: false,
                  }));
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
                show={tooltip.show}
                placement={"bottom"}
              >
                {props => (
                  <Tooltip
                    id="needs-to-be-num"
                    {...props}
                    show={props.show.toString()}
                  >
                    {tooltip.content}
                  </Tooltip>
                )}
              </Overlay>
            </Form>
          </div>
          <div className="selectors">
            <NavDropdown
              title={
                "Algorithm: " +
                props.sortType.charAt(0).toUpperCase() +
                props.sortType.slice(1)
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={e => {
                  props.sortTypeCB("bubble");
                }}
              >
                Bubble Sort
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={e => {
                  props.sortTypeCB("merge");
                }}
              >
                Merge Sort
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <Button onClick={sortArray} variant="outline-info">
            {props.sortStatus === "active" ? "Pause Sort" : "Start Sort"}
          </Button>
        </Nav>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  arrayLength: PropTypes.number,
  sortStatus: PropTypes.string,
  radArrCB: PropTypes.func,
  sortButtonCB: PropTypes.func,
  sortType: PropTypes.string,
  sortTypeCB: PropTypes.func,
};

export default NavBar;
