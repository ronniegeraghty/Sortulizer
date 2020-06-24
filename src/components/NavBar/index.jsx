import React, { useState, useEffect, useRef, useContext } from "react";
import { SortStateContext } from "../../App";
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

const NavBar = ({ radArrCB, sortTypeCB, sortButtonCB, arrayLength }) => {
  // const [arrayLength] = useState(undefined);
  const [arrayLengthInput, setArrayLengthInput] = useState(undefined);
  const [savedArrayLength, setSavedArrayLength] = useState(arrayLength);
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
  });
  const [sortState] = useContext(SortStateContext);
  const inputBox = useRef(null);

  /**
   * Checks that input in text feild is a number and will deploy appropriate tool tip
   * if not. Calls callback function to make new random array.
   * @param {*} e
   */
  const randomizeArray = e => {
    e.preventDefault();
    let arrayLengthInt = parseInt(arrayLengthInput, 10);
    if (sortState.status === "active") {
      setTooltip({
        show: true,
        content: "Pause sort first!",
      });
    } else {
      // If sort status is inactive
      if (arrayLengthInput === undefined || arrayLengthInput === "") {
        //If input empty use last array length used.
        //Need to test if undefined or "" before isNaN because underfined will also cause isNaN to be true
        radArrCB(savedArrayLength);
      } else if (isNaN(arrayLengthInput)) {
        setTooltip({
          show: true,
          content: "Must be an Integer!",
        });
      } else {
        radArrCB(arrayLengthInt);
        setSavedArrayLength(arrayLengthInt);
      }
    }
  };

  /**
   * Calls sort button call back function from props, to start sorting the array.
   */
  const sortArray = () => {
    setTooltip({ show: false });
    sortButtonCB();
  };

  useEffect(() => {}, [sortState.type]);

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
                value={arrayLengthInput || ""}
                onChange={e => {
                  setArrayLengthInput(e.target.value);
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
                sortState.type.charAt(0).toUpperCase() +
                sortState.type.slice(1)
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={e => {
                  sortTypeCB("bubble");
                }}
              >
                Bubble Sort
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={e => {
                  sortTypeCB("merge");
                }}
              >
                Merge Sort
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <Button onClick={sortArray} variant="outline-info">
            {sortState.status === "active" ? "Pause Sort" : "Start Sort"}
          </Button>
        </Nav>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  radArrCB: PropTypes.func,
  sortButtonCB: PropTypes.func,
  sortTypeCB: PropTypes.func,
  arrayLenght: PropTypes.number,
};

export default NavBar;
