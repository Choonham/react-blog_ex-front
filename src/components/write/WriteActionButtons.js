import '../../styles/button.scss';
import '../../styles/writeActionButton.scss';

const WriteActionButtons = ({onCancel, onPublish, isEdit}) => {
    return (
        <div className="writeActionButton">
            <button className="StyledButton writeAction cyan" onClick={onPublish}>
                포스트 {isEdit ? '수정' : '등록'}
            </button>
            <button className="StyledButton writeAction" onClick={onCancel}>취소</button>
        </div>
    );
};

export default WriteActionButtons;