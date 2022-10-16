import { useSelector, useDispatch } from 'react-redux'
import { Toast } from '@shopify/polaris'
import { notifyOperations } from '../src/state/modules/notify'

const Notify = () => {
    const notifyState = useSelector(state => state.notify)
    const dispatch = useDispatch()

    const handleOnDismiss = () => {
        dispatch(notifyOperations.hide())
    }

    return (
        notifyState.active ? <Toast content={notifyState.content} onDismiss={handleOnDismiss} error={notifyState.error} /> : null
    )
}

export default Notify
