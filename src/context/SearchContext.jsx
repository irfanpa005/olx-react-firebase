import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchFunction({children}) {
    const [searchKey, setSearchKey] = useState("");
    return (
        <SearchContext.Provider value={{searchKey, setSearchKey}}>
            {children}
        </SearchContext.Provider>
    )
}