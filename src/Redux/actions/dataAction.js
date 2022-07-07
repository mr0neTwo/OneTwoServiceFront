import store from '../store'
import {getRequestConfig, bad_request} from './actionUtils'

export function changeDataState(data) {
    return {
        type: 'CHANGE_DATA_STATE',
        data
    }
}