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

  return (
    <div className="App">
       <PostForm create={createPost}/>
        <PostList posts={posts} title={'Javascript'} />
    </div>
  );
}

export default App;
