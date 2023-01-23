import { Provider } from "react-redux";
import { store } from "./app/store";
import "./utils/axios";

import Main from "./Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
