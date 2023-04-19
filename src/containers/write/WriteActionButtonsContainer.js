import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {writePost, updatePost} from "../../modules/write";
import {useEffect} from "react";
import WriteActionButtons from "../../components/write/WriteActionButtons";

const WriteActionButtonsContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {title, body, tags, post, postError, writer, originalPostId} = useSelector(({write, user}) =>({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        writer:user.user.id,
        originalPostId: write.originalPostId
    }));


    const onPublish = () => {
        if(originalPostId) {
            dispatch(updatePost({title, body, tags, id: originalPostId}));
            return;
        }
        dispatch(
            writePost({
                title,
                body,
                tags,
                writer
            })
        );
    };

    const onCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        if(post) {
            navigate('/');
        }
        if(postError) {
            console.log(postError);
        }
    }, [navigate, post, postError]);

    return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId}/>;
};

export default WriteActionButtonsContainer;