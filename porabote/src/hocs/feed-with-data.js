import React from "react";
import { connect, dispatch } from "react-redux";
import Loader from "porabote/loader";
import Api from "@services/api-service";

export default (Component, storeData) => {

  class feedWithData extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        filter: {...props.filter},
        nextPage: 1,
        requiredList: props.requiredList,
        hasError: false,
      }
    }

    componentDidMount() {
      this.props.fetchFeedData(this.props.filter);
    }

    static getDerivedStateFromError(error) {
      // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
      logErrorToMyService(error, errorInfo);
    }

    render() {

      if (this.state.hasError) {
        // Можно отрендерить запасной UI произвольного вида
        return <h1>Что-то пошло не так.</h1>;
      }

//       if (this.props.loading) {
//         return <Loader/>
//       }
// console.log(99)
      return(

        <React.Fragment>
          {
            React.cloneElement(<Component/>,
              {
                ...this.props
              })
          }
        </React.Fragment>
      )
    }
  }

  const mapStateToProps = (store) => {
    return {
      ...store[storeData.storeAlias],
    }
  }

  return connect(mapStateToProps)(feedWithData);
}