import * as types from './types'

const INITIAL_STATE = {
    listLoading: false,
    listUserSettings: [],
    listPagination: {},
    listFailure: '',
    detailUserSettings: {},
    detailLoading: false,
    detailFailure: '',
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_LIST_REQUEST:
            return {
                ...state,
                listLoading: true
            }
        case types.FETCH_LIST_SUCCESS:
            return {
                ...state,
                listLoading: false,
                listUserSettings: action.payload,
                listFailure: ''
            }

        case types.FETCH_LIST_FAILURE:
            return {
                ...state,
                listLoading: false,
                listFailure: action.payload
            }

        case types.FETCH_DETAIL_REQUEST:
            return {
                ...state,
                detailLoading: true
            }

        case types.FETCH_DETAIL_SUCCESS:
            return {
                ...state,
                detailLoading: false,
                detailUserSettings: action.payload,
                detailFailure: ''
            }

        case types.FETCH_DETAIL_FAILURE:
            return {
                ...state,
                detailLoading: false,
                detailFailure: action.payload
            }

        case types.FETCH_CREATE_REQUEST:
            return {
                ...state,
                createLoading: true
            }

        case types.FETCH_CREATE_SUCCESS:
            return {
                ...state,
                createLoading: false,
            }

        case types.FETCH_CREATE_FAILURE:
            return {
                ...state,
                createLoading: false
            }

        case types.FETCH_UPDATE_REQUEST:
            return {
                ...state,
                updateLoading: true
            }

        case types.FETCH_UPDATE_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                detailUserSettings: action.payload
            }

        case types.FETCH_UPDATE_FAILURE:
            return {
                ...state,
                updateLoading: false
            }

        case types.FETCH_DELETE_REQUEST:
            return {
                ...state,
                deleteLoading: true
            }

        case types.FETCH_DELETE_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
            }

        case types.FETCH_DELETE_FAILURE:
            return {
                ...state,
                deleteLoading: false
            }

        default: return state
    }
}

export default reducer
