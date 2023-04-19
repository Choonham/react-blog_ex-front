import '../../styles/postViewer.scss';
import Button from "../common/Button";

const PostViewer = ({post, error, loading, actionButtons}) => {
    if (error) {
        if(error.response && error.response.status === 404) {
            return <div className="postViewer">존재하지 않는 포스트입니다.</div>;
        }
        return <div className="postViewer">오류 발생!</div>;
    }

    if(loading || !post) {
        return null;
    }

    const {title, body, User, publishDate, tags} = post;

    return (
        <div className="postViewer">
            <div className="postHead">
                <h1>{title}</h1>
                <div className="subInfo hasMarginTop">
                    <span>
                        <b>{User.name}</b>
                    </span>
                    <span>
                        {new Date(publishDate).toLocaleTimeString()}
                    </span>
                </div>
                <div className="tags">
                    {tags && tags.map(tag => (
                        <div className="tag">#{tag}</div>
                    ))}
                </div>
            </div>
            {actionButtons}
            <div className="postContent" dangerouslySetInnerHTML={{ __html: body}}/>
        </div>
    );
};

export default PostViewer;