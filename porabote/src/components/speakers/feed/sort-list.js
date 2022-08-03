import React from 'react';
import { useSelector } from "react-redux";
import Api from "@services";
import FeedPreloader from "@components/feed/feed-preloader";
import DragAndDropList from "@components/drag-and-drop-list";

const SortList = (props) => {

  const {title, filter, data, meta} = useSelector(state => state.speakers);

  const submitForm = (values) => {
    props.fetchData();
  }

  if (!props.isDictsLoaded) {
    return <FeedPreloader title={title}/>;
  }


  const onDragEnd = (lft, delta) => {

      Api.get(`/api/speakers/method/resort/?lft=${lft}&delta=${delta}`)
        .then((resp) => {
          console.log(resp);
        });
  }

  return (
    <div>
      <DragAndDropList onDragEnd={onDragEnd}>
        {data.map((speaker, index) => {
          return(
            <li key={index} lft={speaker.attributes.lft}>
              {`${speaker.attributes.last_name} ${speaker.attributes.name}`}
            </li>
          );
        })}
      </DragAndDropList>
    </div>
  );
};

export default SortList;
// import React from "react";
// import { useSelector } from "react-redux";
// import {ButtonLazyLoad, Form} from "porabote/form";
// import {requestDicts} from "@components/dicts/store/dicts-actions";
// import Grid from "porabote/grid";
// import FilterLeft from "./filter-left";
// import FilterTop from "./filter-top";
// import MenuIcon from "@material-ui/icons/Menu";
// import moment from "moment";
// import {updateFilters} from "@components/filters/store/filters-actions";
// import FeedPreloader from "@components/feed/feed-preloader";
//
// const SortList = (props) => {
//
//   const {title, filter, data, meta} = useSelector(state => state.speakers);
//
//   const submitForm = (values) => {
//     props.fetchData();
//   }
// console.log(props.isDictsLoaded);
//   if (!props.isDictsLoaded) {
//     return <FeedPreloader title={title}/>;
//   }
//
//   return (
//
//     <Form
//       values={filter}
//       submitForm={(values) => {
//         submitForm(values);
//       }}
//     >
//       <div className="content feed">
//
//         <div className="content__top-filter">
//           <FilterTop dicts={props.dicts}/>
//         </div>
//
//         <div className="content-title">
//           <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
//           {title}
//         </div>
//
//         <div className="content__filter__left">
//           <FilterLeft/>
//         </div>
//
//         <div className="content__tools_panel">
//         </div>
//
//         <div className="content__body">
//
//           <Grid grid-template-columns="60px 300px 1fr">
//
//             <div className="head">
//               <div>ID</div>
//               <div>ФИО</div>
//               <div>Должность</div>
//             </div>
//
//             {
//               data.map((record, index) => {
//
//                 const attrs = record.attributes;
//                 const rels = record.relationships;
//
//                 return (
//                   <div linkTo={`/speakers/view/${attrs.id}`} key={index}>
//                     <div>{attrs.id}</div>
//                     <div><b>{attrs.last_name} {attrs.name} {attrs.patronymic}</b></div>
//                     <div>{attrs.post_name}</div>
//                   </div>
//                 )
//               })
//             }
//           </Grid>
//           <ButtonLazyLoad fetchData={props.fetchData} {...meta}/>
//         </div>
//       </div>
//     </Form>
//   )
// }
//
//
// export default SortList;