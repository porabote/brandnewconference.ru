import React from 'react';
import TimingsItem from "./timings-item";

const Timings = (props) => {

  if (!props.loading) return <p></p>;

  let data = props.data || [];

  return (
    <div className="block-container">
      <div className="timings" id="timings">

        <p className="timings__title">Расписание</p>

        <div className="timings-list">
          {data.map((item) => {
            return(
              <TimingsItem  key={item.id} data={item} />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Timings;