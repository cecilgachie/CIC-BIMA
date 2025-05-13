import { createContext, useContext, useReducer } from 'react';

const FormContext = createContext(null);
const FormDispatchContext = createContext(null);

const initialState = {
  formData: {},
  currentStep: 1,
  totalSteps: 1,
  isSubmitting: false,
  error: null,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SET_TOTAL_STEPS':
      return {
        ...state,
        totalSteps: action.payload,
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'RESET_FORM':
      return {
        ...initialState,
        totalSteps: state.totalSteps,
      };
    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
};

export const useFormState = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error('useFormState must be used within a FormProvider');
  }
  return context;
};

export const useFormDispatch = () => {
  const context = useContext(FormDispatchContext);
  if (context === null) {
    throw new Error('useFormDispatch must be used within a FormProvider');
  }
  return context;
}; 