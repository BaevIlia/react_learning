import './styles/App.css'
import {useMemo, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Desc'},
        {id: 2, title: 'Javascript', body: 'Desc'},
        {id: 3, title: 'Javascript', body: 'Desc'}
    ])

    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
        setModalOpen(false);
    }

    const removePost = (post) =>{
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const [filter, setFilter] = useState({sort: "", query: ""});

    const sortedPosts = useMemo(()=>{
        if(filter.sort){
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(()=>{
        return sortedPosts.filter(post=>post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

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
