import { createContext, useReducer, useMemo } from "react";

export const CustomCsContext = createContext();

const initialState = {
  // General configuration
  id: null,
  name: null,
  email: null,

  // resample strategy: SIM or UPPAAL
  resampleStrategy: null,

  // files
  uppaalModelFile: null,
  uppaalQueryFile: null,
  csvFile: null,

  // extracted data from uploaded files
  csvHeaders: null,
  uppaalQuery: null,

  startDate: null,
  endDate: null,

  // the main variables which track and will be used in the conditions
  driverSignal: null,
  mainVariable: null,
  contextVariables: null,
  // variables: [
  //   {
  //     id: null,
  //     name: null,
  //     symbol: null,
  //     data_column: null,
  //   },
  // ],

  // specific variables for case study
  userJson: null,

  // variables for configuration of teacher.py
  noise: 0.0,
  pValue: 0.0,
  miQuery: false,
  plotDdtw: false,
  htQuery: false,
  htQueryType: "S",
  eqCondition: "W",
  isAggregation: false,
  nMin: 10,

  // result files
  resultTxt: null,
  resultPdf: null,
};

export function CustomCsReducer(state, action) {
  switch (action.type) {
    case "CREATED":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    // File actions
    case "SET_UPPAAL_MODEL_FILE":
      return {
        ...state,
        uppaalModelFile: action.payload,
      };
    case "SET_UPPAAL_QUERY_FILE":
      return {
        ...state,
        uppaalQueryFile: action.payload,
      };
    case "SET_DATA_FILE":
      return {
        ...state,
        dataFile: action.payload,
      };
    case "CLEAR_FILES":
      return {
        ...state,
        uppaalModelFile: null,
        uppaalQueryFile: null,
        dataFile: null,
      };

    case "UPDATE_UPPAAL_VAR_FIELD": {
      const updatedUppaalVars = [...state.uppaalVariables];
      updatedUppaalVars[action.payload.index] = action.payload.value;
      return {
        ...state,
        uppaalVariables: updatedUppaalVars,
      };
    }

    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function CustomCsProvider({ children }) {
  const [state, dispatch] = useReducer(CustomCsReducer, initialState);

  const value = useMemo(
    () => ({ customCsState: state, customCsDispatch: dispatch }),
    [state, dispatch],
  );

  return (
    <CustomCsContext.Provider value={value}>
      {children}
    </CustomCsContext.Provider>
  );
}
