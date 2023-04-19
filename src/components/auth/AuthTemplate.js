import '../../styles/common.scss';
import {Link} from "react-router-dom";

const AuthTemplate = ( {children} ) => {
    return (
        <div className="AutoTemplate">
            <div className="WhiteBox">
                <div className="logo-area">
                    <Link to="/">REACTERS</Link>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthTemplate;