import './styles/App.css'
import {useRef, useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Desc'},
        {id: 2, title: 'Javascript', body: 'Desc'},
        {id: 3, title: 'Javascript', body: 'Desc'}
    ])

    const [title, setTitle] = useState('');
    const bodyInputRef = useRef();

    const addNewPost = (e) =>{
        e.preventDefault();
        console.log(title);
        console.log(bodyInputRef.current.value)
    }
  return (
    <div className="App">
        <form>
            <MyInput value={title}
                     onChange={e=> setTitle(e.target.value)}
                     type="text"
                     placeholder="Название поста"
            />
            <MyInput ref={bodyInputRef}
                     type="text"
                     placeholder="Описание поста"
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
        <PostList posts={posts} title={'Javascript'} />
    </div>
  );
}

export default App;
