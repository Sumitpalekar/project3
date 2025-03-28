import { createContext, useEffect, useState } from "react";
import { addCollectionAndDocuments ,getCategoriesAndDocuements} from "../utils/firebase/firebase.js";
export const CategoriesContext = createContext({
    categoriesMap:{},
});
export const CategoriesProvider = ({children})=>{
    const  [categoriesMap,setCategoriesMap] = useState({});
    useEffect(() => {
        const getCategoriesMap = async ()=>{
            const categoryMap = await getCategoriesAndDocuements();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);
    
    const value= {categoriesMap};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}