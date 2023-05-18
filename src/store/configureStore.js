import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);