import { stat } from "fs";
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
      case ActionType.DELETE_CELL:
        //delete id from data object
        delete state.data[action.payload];
        //delete id from order array
        state.order = state.order.filter(
          (id) => id !== action.payload
        );
        return;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex(
          (idx) => idx === action.payload.id
        );
        const targetIndex =
          direction === "up" ? index - 1 : index + 1;
        // validate if swapping elements are in arr range
        if (
          targetIndex < 0 ||
          targetIndex > state.order.length - 1
        ) {
          return;
        }
        //swapping elements
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return;
      case ActionType.INSERT_CELL_BEFORE:
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
