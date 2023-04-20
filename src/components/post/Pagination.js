import qs from "qs";
import Button from "../common/Button";

const buildLink = ({name, tag, page}) => {
    const query = qs.stringify({tag, page});
    return name ? `/@${name}?${query}` : `/?${query}`;
};

const Pagination = ({page, lastPage, name, tag}) => {
    return (
        <div className="pagination">
            <Button
                isFull={true}
               disabled={page === 1}
               to = {page === 1 ? undefined : buildLink({name, tag, page: page - 1})}>
                이전
            </Button>
            <div>{page}</div>
            <Button
                isFull={true}
                disabled={page === lastPage}
                to = {page === lastPage ? undefined : buildLink({name, tag, page: page + 1})}>
                다음
            </Button>
        </div>
    );
};

export default Pagination;