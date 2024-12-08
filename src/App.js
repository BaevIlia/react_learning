import './styles/App.css'
import {useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";

function App() {
    const [posts, setPosts] = useState([])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalOpen(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const [filter, setFilter] = useState({sort: "", query: ""});


    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    const [modalOpen, setModalOpen] = useState(false);

    async function fetchPosts(){
        const responce = await  axios.get("http://localhost:5095/Post");
        setPosts(responce.data);
    };

    return (
        <div className="App">
            <MyButton onClick={fetchPosts}>
                Получить посты
            </MyButton>
            <MyButton style={{marginTop: 10}} onClick={() => setModalOpen(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modalOpen} setVisible={setModalOpen}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: 15}}/>
            <div>
                <PostFilter filter={filter} setFilter={setFilter}/>
            </div>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты"/>
        </div>
    );
}

export default App;
