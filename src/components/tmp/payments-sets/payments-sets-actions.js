import { SET_RECORDS, FETCH_RECORDS, FETCH_FAILURE } from './payments-sets-types'
import payments-setsService from './payments-sets-service';

const fetchRecordsThunk = () => {

    return dispatch => {

        dispatch(fetchRecords())

        payments-setsService.get()
            .then(
                response => {
                    if ( response.response.status === 200 ) {

                        if(response.data) {
                            dispatch(setRecordsPaymentsSets({data: response.data}))
                        }

                    } else {
                        dispatch(failure(response.data.error))
                    }

                });
    }

    function setRecordsPaymentsSets(payload) { return {type: SET_RECORDS, payload} }
    function fetchRecords() { return {type: FETCH_RECORDS} }
    function failure(error) {return { type: FETCH_FAILURE, payload : error } }
}

export { fetchRecordsThunk }