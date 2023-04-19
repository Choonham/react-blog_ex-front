import {Link} from "react-router-dom";
import Button from "./Button";

const Header = ({user, onLogout}) => {
    return (
        <>
            <div className="headerBlock">
                <div className="wrapper">
                    <Link to="/" className="logo">
                        REACTERS
                    </Link>
                    {user ? (
                        <div className="right">
                            <div className="userInfo">{user.name}</div>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </div>
                     ) : (
                        <div className="right">
                            <Button to="/login">로그인</Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="spacer"/>
        </>
    );
};

export default Header;