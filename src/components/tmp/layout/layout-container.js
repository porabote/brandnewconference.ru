import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from "./default-layout";
import AuthContainer from "@components/auth";

const LayoutContainer = (props) => {

  return(
    <DefaultLayout/>
  );
}

export default LayoutContainer;