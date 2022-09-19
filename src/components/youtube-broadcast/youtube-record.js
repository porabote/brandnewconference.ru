import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import moment from "moment";
import YouTube from "react-youtube";

const YoutubeRecord = (props) => {

  if (!props.loading) return <p></p>;
console.log(props);
  const containerRef = useRef(null);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        let parentWidth = containerRef.current.clientWidth;
        setSize([parentWidth, Math.round(parentWidth / 16 * 9)]);
      }

      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const [player, setPlayer] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoId, setVideoId] = React.useState("nzUINCKH8qc");
  const [start, setStart] = React.useState(0);
  const [title, setTitle] = React.useState("Dentsu");

  const [width, height] = useWindowSize();

  const opts = {
    height: height,
    width: width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      start: start,
      title: 'Dentsu BRAND NEW CONFERENCE 2022',
      // end: 20,
    },
  };

  const startPlayPart = (start) => {
    player.seekTo(start);
    player.playVideo();
  }

  const _onReady = (event) => {
    setPlayer(event.target);
    // access to player in all event handlers via event.target

    //  event.target.playVideo();
    //event.target.pauseVideo();
  }

  return (
    <div className="youtube-record" id="youtubeRecord" style={{paddingTop: '60px'}}>
      <div className="youtube-record-container" ref={containerRef}>
        {/*<span>Window size: {width} x {height}</span>*/}
        {/*<p onClick={() => {startPlayPart(90)}}>Change</p>*/}
        <YouTube
          videoId={videoId}                  // defaults -> ''
          id={videoId}                      // defaults -> ''
          opts={opts}
          // className={string}                // defaults -> ''
          // iframeClassName={string}          // defaults -> ''
          // style={object}                    // defaults -> {}
          title={title}                    // defaults -> ''
          // loading={string}                  // defaults -> undefined
          // opts={obj}                        // defaults -> {}
          onReady={_onReady}                    // defaults -> noop
          // onPlay={func}                     // defaults -> noop
          // onPause={func}                    // defaults -> noop
          // onEnd={func}                      // defaults -> noop
          // onError={func}                    // defaults -> noop
          // onStateChange={func}              // defaults -> noop
          // onPlaybackRateChange={func}       // defaults -> noop
          // onPlaybackQualityChange={func}    // defaults -> noop
        />
      </div>
      <div className="youtube-record-playlist" style={{maxHeight: `${height}px`}}>
        {props.data.map(block => {

          let topics = block.topics || [];

          return(
            <div key={block.id} className="youtube-record-playlist__block">
              {block.desc_player}
              {topics.map(topic => {

                let time_range_topic = `${moment(topic.datetime_from).format('HH:mm')}-${moment(topic.datetime_to).format('HH:mm')}`;

                return(
                  <div key={topic.id} className="youtube-record-playlist__block__topic">
                    {time_range_topic} {topic.desc_short}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YoutubeRecord;