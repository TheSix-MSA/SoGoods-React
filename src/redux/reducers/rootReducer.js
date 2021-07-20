
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import loginSlice from "../member/loginSlice";
import boardSlice from "../../board/boardSlice";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  login:loginSlice,
  board:boardSlice
});

export default rootReducer;
