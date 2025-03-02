import {useState, useEffect} from "react";
import PostService from "../API/PostService";
import {getPagesCount} from "../utils/pages";
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/Pagination";
import MyLoader from "../components/UI/Loader/MyLoader";

function Posts() {

    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAllPosts(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
    })

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

    useEffect(() => {
        fetchPosts(limit, page);
    }, [])

    const changePage = (page) =>{
        setPage(page);
        fetchPosts(limit, page)
    }

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
            {postError &&
                <h1>Произошла ошибка: ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><MyLoader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты"/>
            }
            <Pagination page = {page}
                        changePage={changePage}
                        totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;
