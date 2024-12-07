import './styles/App.css'
import {useMemo, useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

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

    const [searchQuery, setSearchQuery] = useState('');

    const sortPosts = (sort) =>{
        setSelectedSort(sort);
    }

    const sortedPosts = useMemo(()=>{
        if(selectedSort){
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return posts;
    }, [selectedSort, posts]);

    const sortedAndSearchedPosts = useMemo(()=>{
        return sortedPosts.filter(post=>post.title.toLowerCase().includes(searchQuery))
    }, [searchQuery, sortedPosts])

  return (
    <div className="App">
       <PostForm create={createPost}/>
        <hr style={{margin: 15}}/>
        <div>
            <MyInput
                value = {searchQuery}
                onChange = {e => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
            />
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
        {sortedAndSearchedPosts.length
           ? <PostList remove = {removePost} posts={sortedAndSearchedPosts} title={'Javascript'} />
            : <h1 style={{textAlign: "center"}}>Посты отсутствуют</h1>
        }
    </div>
  );
}

export default App;
