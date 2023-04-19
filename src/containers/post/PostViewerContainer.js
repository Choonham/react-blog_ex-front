import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {readPost, unloadPost} from "../../modules/post";
import {useEffect} from "react";
import PostViewer from "../../components/post/PostViewer";
import PostActionButtons from "../../components/post/PostActionButtons";
import {setOriginalPost} from "../../modules/write";
import {removePost} from "../../lib/api/posts";

const PostViewerContainer = () => {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(readPost(postId));

        // 언마운트될 때 리덕스에서 포스트 데이터 없애기
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    const {post, error, loading, user} = useSelector(({post, loading, user}) => ({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user
    }));

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        navigate('/write');
    }

    const onRemove = async () => {
        try {
            await removePost(postId);
            navigate('/');
        } catch(e) {
            console.log(e);
        }
    }

    const ownPost = (user && user.id) === (post && post.User.id);

    return <PostViewer post={post} loading={loading} error={error} actionButtons={ ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}/>;
};

export default PostViewerContainer;