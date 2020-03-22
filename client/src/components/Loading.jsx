import React from "react";
import ReactLoading from "react-loading";
export const Types = [
  "balls",
  "bars",
  "bubbles",
  "cubes",
  "cylon",
  "spin",
  "spinningBubbles",
  "spokes"
];

const randomLoadingType = () => {
  return Types[Math.floor(Math.random() * Types.length)];
};

export default ({
  type = randomLoadingType(),
  color = "#283e56",
  height = 50,
  width = 50
}) => <ReactLoading type={type} color={color} height={height} width={width} />;
