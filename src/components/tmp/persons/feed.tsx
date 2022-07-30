import React from "react";

interface IChildComponentProps extends React.Props<any> {
  fetchFeedData: Function,
  filters: Object,
}

// interface PassedProps extends React.Props<any> {
//   propToPass: any
// }

const Feed: Function = (props: IChildComponentProps) => {

  return <div>{123}</div>
}

export default Feed;