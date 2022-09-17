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

  let [partners, setPartners] = useState([]);

  useEffect(() => {
    //props.updateFilters();
   // setPartners(data);
    getRecords();
   // const {title, filter, data, meta} = useSelector(state => state.partners);
  }, []);


  const getRecords = () => {

    const {id} = props;

    Api.get(`/api/partners/get/`, {
      query: {
        orderBy: {
          lft: 'ASC'
        }
      }
    }).then((resp) => {
      setPartners(resp.data);
    });
  }

  const onDragEnd = (lft, delta) => {

      Api.get(`/api/partners/method/resort/?lft=${lft}&delta=${delta}`)
        .then((resp) => {
          getRecords();
        });
  }

  return (
    <div>
      <DragAndDropList onDragEnd={onDragEnd}>
        {partners.map((speaker, index) => {
          return(
            <li key={speaker.attributes.lft} lft={speaker.attributes.lft}>
              {speaker.attributes.lft} -
              {speaker.attributes.link} {speaker.attributes.name}
            </li>
          );
        })}
      </DragAndDropList>
    </div>
  );
};

export default SortList;