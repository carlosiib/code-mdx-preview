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
        return state;
      case ActionType.DELETE_CELL:
        //delete id from data object
        delete state.data[action.payload];
        //delete id from order array
        state.order = state.order.filter(
          (id) => id !== action.payload
        );
        return state;
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
          return state;
        }
        //swapping elements
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: "",
        };
        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          // id es null - cell inserted at the end of array order
          state.order.push(cell.id);
        } else {
          // id es string - cell inserted before an element in array order
          state.order.splice(foundIndex, 0, cell.id);
        }

        return state;
      default:
        return state;
    }
  },
  initialState
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
