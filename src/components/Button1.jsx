import './styles/button.css';
import PropTypes from 'prop-types';

Submit.propTypes = {
  children: PropTypes.string,
};

function Submit({ children, ...rest }) {
  return (
    <button
      className="common-btn-style btn1 btn-active"
      type="submit"
      {...rest}
    >
      {children}
    </button>
  );
}

export default Submit;
