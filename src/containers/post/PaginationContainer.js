import {useSearchParams} from "react-router-dom";
import Pagination from "../../components/post/Pagination";
import {useParams} from "react-router";
import {useSelector} from "react-redux";

const PaginationContainer = () => {
    const [searchParams] = useSearchParams();
    const {name} = useParams();
    const tag = searchParams.get('tag');

    const page = parseInt(searchParams.get('page'), 10) || 1;

    const {lastPage, posts, loading} = useSelector(({posts, loading}) => ({
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['posts/LIST_POSTS']
    }));

    if(!posts || loading) return null;

    return (
        <Pagination
            tag={tag}
            name={name}
            page={parseInt(page, 10)}
            lastPage={lastPage}
        />
    );
};

export default PaginationContainer;