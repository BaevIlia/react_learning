import './styles/App.css'
import {useMemo, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";

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

    return (
        <div className="App">
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
