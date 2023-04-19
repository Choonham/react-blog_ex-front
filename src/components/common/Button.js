import {useNavigate} from "react-router";
import '../../styles/button.scss';

const Button = ({to, ...rest}) => {
    const navigate = useNavigate();
    const onClick = (e) => {
         if(to) {
             navigate(to);
         }
         if(rest.onClick) {
             rest.onClick(e);
         }
    };
    return <button className="StyledButton fullWidth cyan" {...rest} onClick={onClick} />;
};

export default Button;