import { ReactNode } from "react";

export const initialLogsState = {
  asyncLogs: [] as ReactNode[],
  syncLogs: [] as ReactNode[],
};

interface IAddLogAction {
  type: "ADD_SYNC_LOG" | "ADD_ASYNC_LOG";
  payload: ReactNode;
}

interface IClearLogAction {
  type: "CLEAR_SYNC_LOGS" | "CLEAR_ASYNC_LOGS" | "CLEAR_ALL_LOGS";
}

type LogAction = IAddLogAction | IClearLogAction;

const LogsReducer = (state: typeof initialLogsState, action: LogAction) => {
  switch (action.type) {
    case "ADD_SYNC_LOG":
      return {
        ...state,
        syncLogs: [...state.syncLogs, action.payload],
      };
    case "CLEAR_SYNC_LOGS":
      return {
        ...state,
        syncLogs: [],
      };
    case "ADD_ASYNC_LOG":
      return {
        ...state,
        asyncLogs: [...state.asyncLogs, action.payload],
      };
    case "CLEAR_ASYNC_LOGS":
      return {
        ...state,
        asyncLogs: [],
      };
    case "CLEAR_ALL_LOGS":
      return initialLogsState;
    default:
      return state;
  }
};

export default LogsReducer;
