import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";
import { code } from "@uiw/react-md-editor/lib/cjs/commands";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
);

/* Manual action testing 
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});

console.log(store.getState());
*/
