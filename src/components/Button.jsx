import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.string.isRequired,
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
