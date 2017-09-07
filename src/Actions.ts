import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';

const Actions = {
    launch: (...args) => {
        Dispatcher.dispatch({
            "type": ActionTypes.Browser.LAUNCH,
            "args": args
        });
    },
    connect: (...args) => {
        Dispatcher.dispatch({
            "type": ActionTypes.Browser.LAUNCH,
            "args": args
        });
    }
}