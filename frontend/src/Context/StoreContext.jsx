import { createContext } from "react";

export const storeContext = createContext(null)

function StoreContextProvider({children}){
    const contextValue = {

    }



    return(
    <storeContext.Provider value={contextValue}>
        {children}
    </storeContext.Provider>
    )
}

export default StoreContextProvider