import './styles/App.css'
import {useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Desc'},
        {id: 2, title: 'Javascript', body: 'Desc'},
        {id: 3, title: 'Javascript', body: 'Desc'}
    ])

    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
    }

    const removePost = (post) =>{
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
       <PostForm create={createPost}/>
        <hr style={{margin: 15}}/>
        <div>

        </div>
        {posts.length
           ? <PostList remove = {removePost} posts={posts} title={'Javascript'} />
            : <h1 style={{textAlign: "center"}}>Посты отсутствуют</h1>
        }
    </div>
  );
}

export default App;
