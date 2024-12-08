import axios from "axios";

export default class PostService{
    static async getAllPosts() {
        try{
            const response = await  axios.get("http://localhost:5095/Post");
            return response.data;
        }
        catch (e){
            console.log(e);
        }

    }
}