import React from "react";
import DefaultFeature from "./_components/DefaultFeature";
import HorizontalFeature from "./_components/HorizontalFeature";

type Props = {};

const Feature = (props: Props) => {
  return (
    <div>
      <DefaultFeature />
      <HorizontalFeature />
    </div>
  );
};

export default Feature;
