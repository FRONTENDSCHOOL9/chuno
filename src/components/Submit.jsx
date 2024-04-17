<<<<<<< HEAD
import Button from '@components/Button';
=======
>>>>>>> feature/board
import PropTypes from 'prop-types';

Submit.propTypes = {
  children: PropTypes.string,
};

function Submit({ children, ...rest }) {
  return (
<<<<<<< HEAD
    <Button type="submit" {...rest}>
      {children}
    </Button>
=======
    <button type="submit" {...rest}>
      {children}
    </button>
>>>>>>> feature/board
  );
}

export default Submit;
