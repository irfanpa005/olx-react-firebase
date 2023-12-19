import { createContext, useState } from "react";

export const SearchContext = createContext(null);

export function Search({children}) {
    const [searchKey, setSearchKey] = useState(null);
    return (
        <SearchContext.Provider value={{searchKey, setSearchKey}}>
            {children}
        </SearchContext.Provider>
    )
}