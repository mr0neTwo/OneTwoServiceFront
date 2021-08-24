import { takeEvery, put, call } from "redux-saga/effects"


export function* sagaWatcher() {
   yield takeEvery('CHANGE_PAGE', changePage)
} 

function* changePage() {
   // yield put(changePageAction())
   yield put()
}