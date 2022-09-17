import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import YouTube from "react-youtube";

const YoutubeBroadcast = () => {

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
  const [videoId, setVideoId] = React.useState("mSwrfEgEf0w");
  const [start, setStart] = React.useState(0);
  const [title, setTitle] = React.useState("Dentsu");

  useEffect(() => {

  });

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
    <div className="youtube-broadcast">
      <div className="youtube-broadcast-container" ref={containerRef}>
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
    </div>
  );
};

export default YoutubeBroadcast;