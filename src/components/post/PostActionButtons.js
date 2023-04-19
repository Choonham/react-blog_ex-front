import '../../styles/postActionButton.scss';
import {useState} from "react";
import AskRemoveModal from "../common/AskRemoveModal";

const PostActionButtons = ({onEdit, onRemove}) => {
    const [modal, setModal] = useState(false);
    const onRemoveClick = () => {
        setModal(true);
    };
    const onCancel = () => {
        setModal(false);
    };
    const onConfirm = () => {
        setModal(false);
        onRemove();
    }
    return (
        <>
            <div className="postActionButton">
                <div className="actionButton" onClick={onEdit}>수정</div>
                <div className="actionButton" onClick={onRemoveClick}>삭제</div>
            </div>
            <AskRemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel}/>
        </>
    )
}

export default PostActionButtons;