import React from "react";
import { connect, dispatch } from "react-redux";
import { requestDicts } from "@components/dicts/store/dicts-actions";
import Loader from "porabote/loader";

export default (Component, params) => {

  class withDictsData extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        loaded: false
      }
    }

    componentDidMount() {
      this.props.requestDicts(this.props.dictsRequired);
    }

    render() {

      if (!this.props.loaded) {
        return <Loader/>
      }

      return(
        <React.Fragment>
          {
            React.cloneElement(<Component/>, {...this.props})
          }
        </React.Fragment>
      )
    }
  }

  const mapStateToProps = (store) => {
    return {
      dicts: { ...store.dicts.data },
      dictsRequired: store[params.storeAlias].dictsRequired,
      loaded: store.dicts.loaded
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      requestDicts: (storeAlias) => {
        dispatch(requestDicts(storeAlias));
      },
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(withDictsData);
}