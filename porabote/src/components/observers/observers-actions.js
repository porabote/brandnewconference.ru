import { SET_RECORDS, FETCH_RECORDS, FETCH_FAILURE } from './observers-types'
import observersService from './observers-service';

const fetchRecordsThunk = () => {

    return dispatch => {

        dispatch(fetchRecords())

        observersService.get()
            .then(
                response => {
                    if ( response.response.status === 200 ) {

                        if(response.data) {
                            dispatch(setRecordsObservers({data: response.data}))
                        }

                    } else {
                        dispatch(failure(response.data.error))
                    }

                });
    }

    function setRecordsObservers(payload) { return {type: SET_RECORDS, payload} }
    function fetchRecords() { return {type: FETCH_RECORDS} }
    function failure(error) {return { type: FETCH_FAILURE, payload : error } }
}

export { fetchRecordsThunk }