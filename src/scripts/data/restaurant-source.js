import axios from "axios";
import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantSource{
    static async getList(){
        const response = await axios.get(API_ENDPOINT.LIST)
        const { data } = response;
        return data;
    }
    static async getDetail(id){
        const response = await axios.get(API_ENDPOINT.DETAIL(id))
        const { data } = response;
        if(data.error){
            throw new Error('blabla')
        }
        return data.restaurant;
    }
    static async postReview(formData){
        const response = await axios.post(API_ENDPOINT.CREATE_REVIEW, formData, {
            headers: {
                'X-Auth-Token': '12345',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        const { data } = response;

    }
}

export default RestaurantSource;