import {
  useSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "../state";

// Types for store
export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
