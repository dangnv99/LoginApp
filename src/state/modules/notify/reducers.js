import * as types from './types'

const INITIAL_STATE = {
    active: false,
    content: '',
    error: false
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SHOW:
            return {
                active: true,
                content: action.content,
                error: action.error,
            }

        case types.HIDE:
            return INITIAL_STATE

        default: return state
    }
}

export default reducer
