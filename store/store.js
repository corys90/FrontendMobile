import { createStore } from "redux";
import Reducer from "../store/reducers";

const Store = createStore(Reducer);
export default Store;
