import * as actions from './actions'
import UserSettings from '../../../apiAxios/userSettings'



let userSettings = new UserSettings()

export const fetchList = (params = {}, success = () => {}) => {
    return async (dispatch) => {
        dispatch(actions.fetchListRequest())
        let { status, response } = await userSettings.list(params)
        if (status) {
            dispatch(actions.fetchListSuccess(response))
            success();
        } else {
            dispatch(actions.fetchListFailure(response))
         
        }
    }
}

export const fetchDetail = (id, params = {}) => {
    return async (dispatch) => {
        dispatch(actions.fetchDetailRequest())
        let { status, response } = await userSettings.detail(id, params)
        if (status) {
            dispatch(actions.fetchDetailSuccess(response))
        } else {
            dispatch(actions.fetchDetailFailure(response))
            
        }
    }
}

export const fetchCreate = (data, success = () => { }, error = () => { }) => {
    return async (dispatch) => {
        dispatch(actions.fetchCreateRequest())
        let { status, response } = await userSettings.create(data)
        if (status) {
            dispatch(actions.fetchCreateSuccess(response))
            success(response)
        } else {
            dispatch(actions.fetchCreateFailure(response))
            
            error(response)
        }
    }
}

export const fetchUpdate = (id, data, success = () => { }, error = () => { }) => {
    return async (dispatch) => {
        dispatch(actions.fetchUpdateRequest())
        let { status, response } = await userSettings.update(id, data)
        if (status) {
            dispatch(actions.fetchUpdateSuccess(response))
            success(response)
        } else {
            dispatch(actions.fetchUpdateFailure(response))
            error(response)
        }
    }
}

export const fetchDelete = (id, success = () => { }) => {
    return async (dispatch) => {
        dispatch(actions.fetchDeleteRequest())
        let { status, response } = await userSettings.delete(id)
        if (status) {
            dispatch(actions.fetchDeleteSuccess(response))
            success(response)
        } else {
            dispatch(actions.fetchDeleteFailure(response))
        }
    }
    
}


export default {
    fetchList,
    fetchDetail,
    fetchCreate,
    fetchUpdate,
    fetchDelete,
}
