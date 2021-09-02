import homeSaga from "./home";
import {all} from 'redux-saga/effects'

export default function* rootSaga(){
    yield all ([homeSaga()])
}