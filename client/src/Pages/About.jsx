import React, { useContext, useEffect } from "react";
import { Context } from "../Apis/Context";
const About = () => {
  const { setDataToSend } = useContext(Context);
  useEffect(() => {
    setDataToSend("Message from About");
  }, []);
  return <div>This is about</div>;
};

export default About;
