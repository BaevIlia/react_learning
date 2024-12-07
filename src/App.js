import './styles/App.css'
import {useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

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

    const [selectedSort, setSelectedSort] = useState('')

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

  return (
    <div className="App">
       <PostForm create={createPost}/>
        <hr style={{margin: 15}}/>
        <div>
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка по"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />
        </div>
        {posts.length
           ? <PostList remove = {removePost} posts={posts} title={'Javascript'} />
            : <h1 style={{textAlign: "center"}}>Посты отсутствуют</h1>
        }
    </div>
  );
}

export default App;
