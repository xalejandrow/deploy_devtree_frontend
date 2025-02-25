import { isAxiosError } from "axios";
import api from "../../config/axios";

export async function getUser() {

        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            // const { data } = await api.get(`/user`);
            const { data } = await api(`/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                    
            }); // This is the same as the line above
            // console.log(data);
            return data;
        } catch (error) {
            if(isAxiosError(error) && error.response) {
               throw new Error(error.response.data.error);
               
            }
        }
}