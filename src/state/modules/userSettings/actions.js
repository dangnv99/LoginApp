import * as types from './types'

export const fetchListRequest = () => {
    return {
        type: types.FETCH_LIST_REQUEST
    }
}

export const fetchListSuccess = data => {
    return {
        type: types.FETCH_LIST_SUCCESS,
        payload: data
    }
}

export const fetchListFailure = data => {
    return {
        type: types.FETCH_LIST_FAILURE,
        payload: data
    }
}

export const fetchDetailRequest = () => {
    return {
        type: types.FETCH_DETAIL_REQUEST
    }
}

export const fetchDetailSuccess = data => {
    return {
        type: types.FETCH_DETAIL_SUCCESS,
        payload: data
    }
}

export const fetchDetailFailure = data => {
    return {
        type: types.FETCH_DETAIL_FAILURE,
        payload: data
    }
}

export const fetchCreateRequest = () => {
    return {
        type: types.FETCH_CREATE_REQUEST
    }
}

export const fetchCreateSuccess = data => {
    return {
        type: types.FETCH_CREATE_SUCCESS,
        payload: data
    }
}

export const fetchCreateFailure = data => {
    return {
        type: types.FETCH_CREATE_FAILURE,
        payload: data
    }
}

export const fetchUpdateRequest = () => {
    return {
        type: types.FETCH_UPDATE_REQUEST
    }
}

export const fetchUpdateSuccess = data => {
    return {
        type: types.FETCH_UPDATE_SUCCESS,
        payload: data
    }
}

export const fetchUpdateFailure = data => {
    return {
        type: types.FETCH_UPDATE_FAILURE,
        payload: data
    }
}

export const fetchDeleteRequest = () => {
    return {
        type: types.FETCH_DELETE_REQUEST
    }
}

export const fetchDeleteSuccess = data => {
    return {
        type: types.FETCH_DELETE_SUCCESS,
        payload: data
    }
}

export const fetchDeleteFailure = data => {
    return {
        type: types.FETCH_DELETE_FAILURE,
        payload: data
    }
}
