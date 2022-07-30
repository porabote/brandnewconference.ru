import React from 'react'
import Api from "@services/api-service";
import Loader from "porabote/loader";

export default (View) => {

  class recordWithData extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        loaded: false
      }
    }

    componentDidMount() {
      this.getRecord();
    }

    getRecord = () => {

      let splits = window.location.pathname.split('/');
      const id = splits[splits.length - 1];

      Api.get(`/api/${this.props.alias}/get/${id}/`, {
        query: {
          include: this.props.relationships
        }
      }).then((resp) => {
        this.setState({
          data: (typeof resp.data !== 'undefined') ? resp.data : [],
          loaded: true
        })
      })
    }

    render() {

      if (!this.state.loaded) {
        return <Loader/>
      }

      return(
        <React.Fragment>
        {
          React.cloneElement(<View/>, {
            ...this.props,
            data: this.state.data,
            getRecord: this.getRecord,
          })
        }
        </React.Fragment>
      )
    }

  }

  return recordWithData;
}