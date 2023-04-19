import '../../styles/postList.scss';
import '../../styles/postViewer.scss';
import '../../styles/button.scss';
import Button from "../common/Button";
import {Link} from "react-router-dom";

const PostItem = ({post}) => {
    const {publishedDate, User, tags, title, body, id} = post;
    return (
        <div className="postItem">
            <h2>
                <Link to={`/${User.name}/${id}`}>{title}</Link>
            </h2>
            <div className="subInfo">
                <span>
                    <b>{User.name}</b>
                </span>
                <span>{new Date(publishedDate).toLocaleTimeString()}</span>
            </div>
            <div className="tags">
                {tags && tags.map(tag => (
                    <div className="tag">#{tag}</div>
                ))}
            </div>
            <p>{body}</p>
        </div>
    );
};

const PostList = ({posts, loading, error, showWriteButton}) => {
    if(error) {
        return <div className="postList">에러가 발생했습니다.</div>
    }

    return (
        <div className="postList">
            <div className="writePostButtonWrapper">
                {showWriteButton && (
                    <Button className="cyan" to="/write">새 글 작성하기</Button>
                )}
            </div>
            {!loading && posts && (
                <div>
                    {posts.map(post => (
                        <PostItem className="postItem" post={post} key={post.id}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;