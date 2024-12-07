import './styles/App.css'
import {useMemo, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

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

  return (
    <div className="App">
       <PostForm create={createPost}/>
        <hr style={{margin: 15}}/>
        <div>
            <PostFilter filter={filter} setFilter={setFilter}/>
        </div>
        {sortedAndSearchedPosts.length
           ? <PostList remove = {removePost} posts={sortedAndSearchedPosts} title={'Javascript'} />
            : <h1 style={{textAlign: "center"}}>Посты отсутствуют</h1>
        }
    </div>
  );
}

export default App;
