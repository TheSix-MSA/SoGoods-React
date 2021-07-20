import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import loginSlice from "../member/loginSlice";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  login:loginSlice
});

export default rootReducer;
