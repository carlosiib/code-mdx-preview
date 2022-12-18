import {
  useSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "../state";

/* Types for store
 * Getting store values
 */
export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
