import React from "react";
import dayjs from "dayjs";
import planSVG from "../../assets/images/paperPlane.svg";

export const Greeting = ({ props }) => {
  //Greeting message with dayjs
  const greeting = () => {
    const hour = dayjs().hour();
    if (hour >= 0 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  return (
    <div className="w-full flex justify-between mt-2 rounded-md h-24 bg-slate-50">
      <div className="flex flex-col justify-center ml-4">
        <h1 className="text-2xl font-bold text-slate-900 font-mono">
          {greeting()}, {props ? props.name : "MR Unknown"}.
        </h1>
        <p className="text-slate-900 font-sans">
          {dayjs().format("dddd, MMMM D, YYYY")}
        </p>
      </div>
      <div className="flex flex-col justify-center mr-4">
        <img src={planSVG} alt="plan" className="w-20 h-20" />
      </div>
    </div>
  );
};
