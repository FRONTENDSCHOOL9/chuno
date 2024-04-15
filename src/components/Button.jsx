import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

function Button({ children, type = 'button', ...rest }) {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
}

export default Button;
