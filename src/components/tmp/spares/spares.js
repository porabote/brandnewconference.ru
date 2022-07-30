import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Feed from './feed'
import View from './view'

const Spares = (props) => {

  const dispatch = useDispatch();

  const { isDictsLoaded, dicts } = useSelector(state => state.dicts);
  const { dictsRequired, title, meta, filter } = useSelector(state => state.spares);
  useEffect(() => {
    dispatch(requestDicts(dictsRequired));
  }, []);

  if (props.match.params.action === 'view') {
    return <View/>
  }

  return (
    <Feed isDictsLoaded={isDictsLoaded} />
  )

}

export default Spares