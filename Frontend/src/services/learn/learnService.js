import axios from "axios";
import userAuthenticatedAxiosInstance from "../users/userAuthenticatedAxiosInstance";

const userAxiosInstance = userAuthenticatedAxiosInstance(
    "/api/v1/learn"
);


export const fetchLearnData = async (title, url , contentType) => {
console.log(title, url , contentType)
 try {
    const responseData = await userAxiosInstance.post("/upload", {
        title,
        cloudinaryContentUrl: url,
        contentType 
    });
    return responseData.data;
 } catch (error) {
    console.log(error)
 }
}