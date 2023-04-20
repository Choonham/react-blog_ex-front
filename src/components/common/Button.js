import {useNavigate} from "react-router";
import '../../styles/button.scss';

const Button = ({to, isFull, ...rest}) => {
    const navigate = useNavigate();
    const onClick = (e) => {
         if(to) {
             navigate(to);
         }
         if(rest.onClick) {
             rest.onClick(e);
         }
    };

    const className = isFull ? "StyledButton fullWidth cyan" : "StyledButton cyan";

    return <button  {...rest} className={className} onClick={onClick} />;
};

export default Button;