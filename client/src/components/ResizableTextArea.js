import React, { useState } from "react";
import PropTypes from "prop-types";

const ResizableTextarea = (props) => {
  const [rows, setRows] = useState(1);
  const [value, setValue] = useState("");
  const minRows = 1,
    maxRows = 50;

  const handleChange = (event) => {
    const textareaLineHeight = 12;
    const previousRows = event.target.rows;
    event.target.rows = minRows;
    const currentRows = Math.floor(
      event.target.scrollHeight / textareaLineHeight
    );
    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }
    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
    setRows(currentRows < maxRows ? currentRows : maxRows);
    setValue(event.target.value);
    props.onChange(event);
  };

  return (
    <textarea
      rows={rows}
      value={value}
      placeholder={props.placeholder}
      className={props.id}
      id={props.id}
      onChange={handleChange}
      onClick={props.onClick}
    />
  );
};

ResizableTextarea.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
};

export default ResizableTextarea;
