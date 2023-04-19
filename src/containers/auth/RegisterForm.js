import AuthForm from "../../components/auth/AuthForm";
import user, {checkUser} from "../../modules/user";
import {useNavigate} from "react-router";
import {useState} from "react";

const {useDispatch, useSelector} = require("react-redux");
const {changeField, initializeForm, register} = require("../../modules/auth");
const {useEffect} = require("react");

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e => {
        const {value , name} = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const {name, password, passwordConfirm} = form;
        if([name, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요.');
            return;
        }
        if(password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({form: 'register', key: 'password', value:''}));
            dispatch(
                changeField({form: 'register', key:'passwordConfirm', value:''})
            );
            return;
        }
        dispatch(register({name, password}));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(() => {
        if(authError) {
            if(authError.response.status === 409) {
                setError('이미 존재하는 계정입니다');
                return;
            }
            console.log('회원가입 실패');
            console.log(authError);
            return;
        }
        if(auth) {
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(checkUser());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if(user) {
            console.log('check API 성공');
            console.log(user);
        }
    }, [user])  ;

    const navigate = useNavigate();

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
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default RegisterForm;