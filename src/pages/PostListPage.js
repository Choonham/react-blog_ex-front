import '../styles/common.scss'
import HeaderContainer from "../containers/common/HeaderContainer";
import PostListContainer from "../containers/post/PostListContainer";
import PaginationContainer from "../containers/post/PaginationContainer";

const PostListPage = () => {
    return (
        <div>
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </div>
    );
};

export default PostListPage;