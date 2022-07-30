import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feed from "./feed.tsx";

const PersonsContainer: FC = () => {

  const fetchFeedData: Function = () => {
    console.log(123)
  }

  return React.createElement(Feed, {
    fetchFeedData: fetchFeedData,
    filters: {}
  });
}

export default PersonsContainer;