import React, { useEffect } from "react";
import PropTypes from "prop-types";

const WindowFocusHandler = ({ setFocusCB }) => {
  // User has switched back to the tab
  const onFocus = () => {
    setFocusCB(true);
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    setFocusCB(false);
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });

  return <></>;
};

WindowFocusHandler.propTypes = {
  setFocusCB: PropTypes.func,
};

export default WindowFocusHandler;
