import commonAPI from "./commonAPI"
import SERVERURL from "./serverUrl"

// register called by Auth
export const registerAPI = async(reqBody)=>{
    return await commonAPI ("POST",`${SERVERURL}/register`,reqBody)
}

// login called by Auth
export const loginAPI = async(reqBody)=>{
    return await commonAPI ("POST",`${SERVERURL}/login`,reqBody)
}

// addPrivateLocationAPI called by PrivateLocation
export const addPrivateLocationAPI = async(reqBody,reqHeader)=>{
    return await commonAPI ("POST",`${SERVERURL}/add-privatelocation`,reqBody,reqHeader)
}

// addPublicLocationAPI called by PublicLocation
export const addPublicLocationAPI = async(reqBody,reqHeader)=>{
    return await commonAPI ("POST",`${SERVERURL}/add-publiclocation`,reqBody,reqHeader)
}

// homeProjectsAPI called by Home
export const homeLocationAPI = async()=>{
    return await commonAPI ("GET",`${SERVERURL}/homelocation`,"")
}


// allPublicLocationAPI called by Projects
export const allPublicLocationAPI = async(reqHeader)=>{
    return await commonAPI ("GET",`${SERVERURL}/all-publiclocation`,"",reqHeader)
}


// allPrivateLocationAPI called by Projects
export const allPrivateLocationAPI = async(reqHeader)=>{
    return await commonAPI ("GET",`${SERVERURL}/all-privatelocation`,"",reqHeader)
}

// userLocationsAPI called by Dashboard
export const userPublicLocationsAPI = async(reqHeader)=>{
    return await commonAPI ("GET",`${SERVERURL}/user-publiclocations`,"",reqHeader)
}

// userLocationsAPI called by Dashboard
export const userPrivateLocationsAPI = async(reqHeader)=>{
    return await commonAPI ("GET",`${SERVERURL}/user-privatelocations`,"",reqHeader)
}

// deletePuplicLocationAPI called by View : http://localhost:3000/pid/remove-publiclocation
export const deletePublicLocationAPI = async(pId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVERURL}/${pId}/remove-publiclocation`,{},reqHeader)
}

// deletePrivateLocationAPI called by View : http://localhost:3000/pid/remove-publiclocation
export const deletePrivateLocationAPI = async(pId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVERURL}/${pId}/remove-privatelocation`,{},reqHeader)
}

// editPublicProjectAPI called by publiclocationedit : put requset to http://localhost:3000/pid/edit-publiclocations
export const editPublicLocationAPI = async(pId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/${pId}/edit-publiclocations`,reqBody,reqHeader)
}

// editPrivateLocationAPI called by publiclocationedit : put requset to http://localhost:3000/pid/edit-privatelocations
export const editPrivateLocationAPI = async(pId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/${pId}/edit-privatelocations`,reqBody,reqHeader)
}


