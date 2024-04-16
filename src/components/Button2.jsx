import './styles/button.css';
import PropTypes from 'prop-types';

Button2.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function Button2({ onClick, children }) {
  return (
    <button className="common-btn-style btn2 btn-active" onClick={onClick}>
      {children}
    </button>
  );
}
export default Button2;
