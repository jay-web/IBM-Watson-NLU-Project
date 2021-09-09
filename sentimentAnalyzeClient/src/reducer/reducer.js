import React from 'react';
import {types} from "./actionTypes";
import Doc from "../components/doc";

export const StoreContext = React.createContext([]);


export const INITIAL_STATE = {
  showTextBox: true,
  mode: "text",
  sentimentOutput: <Doc />,
  color: "",
  message: "Please wait ...",
  showMessage: false,
  report: null,
  showGraph: false,
  emotions: [],
  entities: [],
  showEntities: false,
  buttonDisabled: true,
  setGraphProperty: true,

};


export const reducer = (state, action) => {
    switch(action.type) {
        case types.SHOW_TEXTBOX :
            return {...state, showTextBox: action.payload}
        case types.UPDATE_MODE :
            return {...state, mode : action.payload}
        case types.UPDATE_SENTIMENT_OUTPUT :
            return {...state, sentimentOutput: action.payload}
        case types.UPDATE_COLOR :
            return {...state, color: action.payload}
        case types.SHOW_MESSAGE :
            return {...state, showMessage: action.payload}
        case types.UPDATE_REPORT :
            return {...state, report : action.payload}
        case types.SHOW_GRAPH :
            return {...state, showGraph : action.payload}
        case types.UPDATE_EMOTIONS :
            return {...state, emotions: action.payload }
        case types.UPDATE_ENTITIES :
            return {...state, entities : action.payload}
        case types.SHOW_ENTITIES :
            return {...state, showEntities : action.payload}
        case types.DISABLE_BUTTON :
            return {...state, buttonDisabled : action.payload }
        case types.SET_GRAPH_PROPERTY:
            return {...state, setGraphProperty : action.payload }
        default :
            return state;
    }
}

