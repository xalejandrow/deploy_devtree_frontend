import { isAxiosError } from "axios";
import api from "../../config/axios";

export async function getUser() {
        try {
            // const { data } = await api.get(`/user`);
            const { data } = await api(`/user`); // This is the same as the line above
            console.log(data);
            // return data;
        } catch (error) {
            if(isAxiosError(error) && error.response) {
               console.log(error.response?.data.error);
               
            }
        }
}