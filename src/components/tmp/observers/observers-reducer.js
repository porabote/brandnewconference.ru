import { SET_RECORDS, FETCH_RECORDS } from './observers-types'

const initialState = {
    storage: [],
    count: 0,
    pagesCount: 0,
    bottomAxisX: 0,
    lastId: 0
}

const observersReducer = (store = initialState, action) => {

    switch (action.type) {
        case SET_RECORDS:
            return {
                ...store,
                storage: store.storage.concat(action.payload.data),
                count: store.count + action.payload.data.count,
                lastId: 1
                //pagesCount: action.payload.pages,
                //nextPage: action.payload.next,
            }
        case FETCH_RECORDS:
            return {...store, currentPage: ++store.currentPage}
        default: return store
    }
}

export default observersReducer