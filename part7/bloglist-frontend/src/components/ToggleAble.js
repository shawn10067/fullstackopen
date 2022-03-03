import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ToggleAble = (props) => {
  let [visible, changeVisibility] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={() => changeVisibility(!visible)}
          className="showButton"
        >
          {props.showName}
        </Button>
      </div>
      <div style={showWhenVisible} className={"innerBlog"}>
        {props.children}
        <Button
          onClick={() => changeVisibility(!visible)}
          className="hideButton"
        >
          {props.hideName}
        </Button>
      </div>
    </div>
  );
};

export default ToggleAble;
