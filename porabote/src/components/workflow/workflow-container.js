import React, {
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Api from "@services";
import Tree from "./tree";
import ViewPreloader from "@components/view/view-preloader";

const WorkflowContainer = (props) => {

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getRecord();
  }, []);

  const { relationships } = useSelector(state => state.users);

  const getRecord = () => {

    const { id } = props;

    Api.get(`/api/api-users/get/${id}/`, {
      query: {
        include: relationships
      }
    }).then((resp) => {
      setData(resp.data);
      setLoaded(true);
    })
  }

  if (!loaded) {
    return <ViewPreloader/>;
  }

  return(
    <Tree data={data}/>
  );
}

export default WorkflowContainer;