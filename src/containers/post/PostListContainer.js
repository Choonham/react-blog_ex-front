import {useSearchParams, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {listPosts} from "../../modules/posts";
import PostList from "../../components/post/PostList";

const PostListContainer = () => {
    const {name} = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {posts, error, loading, user } = useSelector(({posts, loading, user}) => ({
        posts: posts.posts,
        error: posts.error,
        loading: loading['posts/LIST_POSTS'],
        user: user.user
    }));

    useEffect(() => {
        const tag = searchParams.get('tag');
        const page = parseInt(searchParams.get('page'), 10) || 1;
        dispatch(listPosts({tag, name, page}));
    }, [dispatch, searchParams, name]);

    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            showWriteButton={user}
        />
    );
};

export default PostListContainer;