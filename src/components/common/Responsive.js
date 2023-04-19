import '../../styles/common.scss';

const Responsive = ({children, ...rest})  => {
    return <div className="responsiveBlock" {...rest}>{children}</div>
};

export default Responsive;