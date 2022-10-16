import * as types from './types'

export const show = (content, error = false) => {
    return {
        type: types.SHOW,
        content: content,
        error: error,
    }
}

export const hide = () => {
    return {
        type: types.HIDE,
    }
}

