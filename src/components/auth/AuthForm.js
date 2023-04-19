import '../../styles/common.scss';
import {Link} from "react-router-dom";

const textMap = {
    login: '로그인',
    register: '회원가입'
}

const AuthForm = ({type, form, onChange, onSubmit, error}) => {
    const text = textMap[type];
    return (
        <div className="AuthForm">
            <h3>{text}</h3>
            <form onSubmit={onSubmit} >
                <input
                    className="StyledInput"
                    autoComplete="name"
                    name="name"
                    onChange={onChange}
                    value={form.name}
                    placeholder="아이디"
                />
                <input
                    className="StyledInput"
                    autoComplete="new-password"
                    name="password"
                    onChange={onChange}
                    value={form.password}
                    placeholder="비밀번호"
                    type="password"
                />
                {type === 'register' && (
                    <input
                        className="StyledInput"
                        autoComplete="new-password"
                        name="passwordConfirm"
                        onChange={onChange}
                        value={form.passwordConfirm}
                        placeholder="비밀번호 확인"
                        type="password"
                    />
                )}
                {error && <div className="errorMsg">{error}</div>}
                <button className="loginBtn">{text}</button>
            </form>
            <div className="Footer">
                {type === 'login' ? (
                    <Link to="/login">회원가입</Link>
                ) : (
                    <Link to="/register">로그인</Link>
                )}
            </div>
    </div>
    );
};

export default AuthForm;