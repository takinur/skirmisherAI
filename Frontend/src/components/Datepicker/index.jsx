import React from "react";

import "antd/dist/antd.css";
import { DatePicker } from "antd";

const onOk = (value) => {
  console.log("onOk: ", value);
};

const TimeDatePicker = (props) => {
  const onChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    props.SetDateTime(dateString);
  };
  return (
    <DatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="Select Time and Date"
      onChange={onChange}
      onOk={onOk}
    />
  );
};

export default TimeDatePicker;
