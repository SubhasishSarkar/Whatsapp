import React, {createContext, useContext, useReducer} from 'react'

export const StateContext  = createContext();

export const StateProvider = ({reducer, initialState, children}) =>{
    <StateContext.SteProvider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.SteProvider>
};

export const useStateValue = () => useContext(StateContext);