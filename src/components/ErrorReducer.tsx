export const initialErrorStates = {
  eventLimitError: "",
  emptyExecutionListError: "",
  cantAddEventWhileRunningError: "",
};

interface IAddErrorAction {
  type: "SET_EVENT_LIMIT_ERROR" | "SET_EMPTY_EXECUTION_LIST_ERROR" | "SET_CANT_ADD_EVENT_WHILE_RUNNING_ERROR";
  payload: { message: string };
}

interface IClearErrorAction {
  type: "CLEAR_ALL_ERRORS";
}

type ErrorAction = IAddErrorAction | IClearErrorAction;

const ErrorReducer = (state: typeof initialErrorStates, action: ErrorAction) => {
  switch (action.type) {
    case "SET_EVENT_LIMIT_ERROR":
      return { ...state, eventLimitError: action.payload.message };

    case "SET_EMPTY_EXECUTION_LIST_ERROR":
      return { ...state, emptyExecutionListError: action.payload.message };

    case "SET_CANT_ADD_EVENT_WHILE_RUNNING_ERROR":
      return { ...state, cantAddEventWhileRunningError: action.payload.message };

    case "CLEAR_ALL_ERRORS":
      return initialErrorStates;

    default:
      return state;
  }
};
export default ErrorReducer;
