import axios from "axios";

export default class PostService {
    static async getAllPosts() {
        const response = await axios.get("http://localhost:5095/Post");
        return response.data;
    }
}