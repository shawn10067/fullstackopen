import React, { useState } from "react";

const ToggleAble = (props) => {
  let [visible, changeVisibility] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={() => changeVisibility(!visible)}
          className="showButton"
        >
          {props.showName}
        </button>
      </div>
      <div style={showWhenVisible} className={"innerBlog"}>
        {props.children}
        <button
          onClick={() => changeVisibility(!visible)}
          className="hideButton"
        >
          {props.hideName}
        </button>
      </div>
    </div>
  );
};

export default ToggleAble;
