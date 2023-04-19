import AuthForm from "../../components/auth/AuthForm";
import {checkUser} from "../../modules/user";
import {useNavigate} from "react-router";
import {useState} from "react";

const {useDispatch, useSelector} = require("react-redux");
const {changeField, initializeForm, login} = require("../../modules/auth");
const {useEffect} = require("react");

const LoginForm = ({history}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e => {
        const {value , name} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const {name, password} = form;
        dispatch(login({name, password}));
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if(authError) {
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if(auth) {
            console.log('로그인 성공');
            dispatch(checkUser());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if(user) {
            navigate('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [navigate, user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default LoginForm;