import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  data: {
    [key: string]: Cell;
  };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return;
      case ActionType.DELETE_CEL:
        return state;
      case ActionType.MOVE_CELL:
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
