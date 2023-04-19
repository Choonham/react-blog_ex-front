import '../../styles/askModal.scss';

const AskModal = ({visible, title, description, confirmText='확인', cancelText='취소', onConfirm, onCancel}) => {
    if(!visible) return null;
    return (
        <div className="fullScreen">
            <div className="askModal">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="buttons">
                    <div className="modalStyledButton" onClick={onCancel}>{cancelText}</div>
                    <div className="modalStyledButton" onClick={onConfirm}>{confirmText}</div>
                </div>
            </div>
        </div>
    )
}

export default AskModal;