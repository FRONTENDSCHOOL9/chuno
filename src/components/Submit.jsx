import PropTypes from 'prop-types';

Submit.propTypes = {
  children: PropTypes.string,
};

function Submit({ children, ...rest }) {
  return (
    <button type="submit" {...rest}>
      {children}
    </button>
  );
}

export default Submit;
