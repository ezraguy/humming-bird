import axios from "axios";
import { toast } from "react-toastify";
import { getJwt } from "./userService";

//in every call to the server add the user token in the headers
axios.defaults.headers.common['x-auth-token'] = getJwt();

axios.interceptors.response.use(null, (error) => {
    // if the code that returns from the server is 403 and above pop up a message and return a reject
    const expectedError = error.response && error.response.status > 403;
    if (expectedError) toast.error('oops somthing went wrong...');
    return Promise.reject(error);
});



export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
}