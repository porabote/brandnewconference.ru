import React, {useEffect, useRef} from 'react';
import YouTube from "react-youtube";

const YoutubeBroadcast = () => {


  const [player, setPlayer] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [videoId, setVideoId] = React.useState("nJhtVdMyFFc");
  const [start, setStart] = React.useState(0);
  const [title, setTitle] = React.useState("Dentsu");

  useEffect(() => {

  });

  const opts = {
    height: '500',
    width: '800',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      start: start,
      title: '8989',
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
    <div>
      <p onClick={() => {startPlayPart(90)}}>Change</p>
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
  );
};

export default YoutubeBroadcast;