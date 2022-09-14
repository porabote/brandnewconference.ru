import React, {useState} from 'react';
import moment from "moment";

const TimingsItem = (props) => {

  const data = props.data;
  const topics = data.topics || [];

  const [isOpened, setIsOpened] = useState(false);

  let time_range = `${moment(data.datetime_from).format('HH:mm')}-${moment(data.datetime_to).format('HH:mm')}`;

  return (
    <div className="timings-list-item">
      <div
        className={isOpened ? 'timings-list-item-title active' : 'timings-list-item-title'}
        onClick={() => {
          if (topics.length > 0) setIsOpened(isOpened ? false : true)
        }}
      >
        <span style={{paddingRight: '20px'}}>{time_range}</span>
        {data.desc_list}
      </div>
      <div className={isOpened ? 'timings-list-item-dropblock active' : 'timings-list-item-dropblock'}>
        <div className="timings-list-item-dropblock__time">{time_range}</div>
        <div className="timings-list-item-dropblock__topics">
          {topics.map(topic => {

            let speakers = topic.speakers;

            return (
              <div key={topic.id} className="timings-list-item-dropblock__topics_topic">
                <div className="timings-list-item-dropblock__topics_topic_desc">{topic.desc}</div>
                <div className="timings-list-item-dropblock__topics_topic_speakers">
                {speakers.map(speaker => {
                  return(
                    <div className="timings-list-item-dropblock__topics_topic_speakers-item" key={speaker.id}>
                      <div className="timings-list-item-dropblock__topics_topic_speaker-name">{`${speaker.last_name} ${speaker.name}`}</div>
                      <div className="timings-list-item-dropblock__topics_topic_speaker_post">{speaker.post_name}</div>
                    </div>
                  )
                })}
                </div>
              </div>
            )
          })}
            </div>
            </div>
            </div>
            );
          };

          export default TimingsItem;