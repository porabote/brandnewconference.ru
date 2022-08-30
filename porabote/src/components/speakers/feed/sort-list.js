import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import Api from "@services";
import FeedPreloader from "@components/feed/feed-preloader";
import DragAndDropList from "@components/drag-and-drop-list";
import {updateFilters} from "@components/filters/store/filters-actions";

const SortList = (props) => {

  if (!props.isDictsLoaded) {
    return <FeedPreloader title="Список сортировки"/>;
  }

  let [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    //props.updateFilters();
   // setSpeakers(data);
    getRecords();
   // const {title, filter, data, meta} = useSelector(state => state.speakers);
  }, []);


  const getRecords = () => {

    const {id} = props;

    Api.get(`/api/speakers/get/`, {
      query: {
        orderBy: {
          lft: 'ASC'
        }
      }
    }).then((resp) => {
      setSpeakers(resp.data);
    });
  }

  const onDragEnd = (lft, delta) => {

      Api.get(`/api/speakers/method/resort/?lft=${lft}&delta=${delta}`)
        .then((resp) => {
          getRecords();
        });
  }

  return (
    <div>
      <DragAndDropList onDragEnd={onDragEnd}>
        {speakers.map((speaker, index) => {
          return(
            <li key={speaker.attributes.lft} lft={speaker.attributes.lft}>
              {speaker.attributes.lft} -
              {`${speaker.attributes.last_name} ${speaker.attributes.name}`}
            </li>
          );
        })}
      </DragAndDropList>
    </div>
  );
};

export default SortList;