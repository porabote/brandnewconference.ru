import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Api from "@services/api-service";

export default (WrappedComponent, props) => {

  const { dataSource, storeAlias, isDictsLoaded } = props;

    useEffect(() => {
     fetchData();
    }, []);

    const [ isDataLoaded, setIsDataLoaded ] = useState(false);
    const [ attrs, setAttrs ] = useState({});
    const [ rels, setRels ] = useState({});

    const { relationships } = useSelector(state => state[storeAlias]);
    const { dicts } = useSelector(state => state.dicts);

    const fetchData = () => {
      Api.get(dataSource, {
        query: {
          include: relationships
        }
      }).then((resp) => {
        setAttrs(resp.data.attributes);
        setRels(resp.data.relationships);
        setIsDataLoaded(true);
      })
    }

    if (!isDataLoaded) return <div>Данные загружаются</div>

    return <WrappedComponent
      attrs={attrs}
      rels={rels}
      dicts={dicts}
      fetchData={fetchData}
      {...props}
    />;
}