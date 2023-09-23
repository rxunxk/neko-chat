import PropTypes from "prop-types";

const UserBar = ({ user }) => {
  return <div>{user?.name}</div>;
};

export default UserBar;

UserBar.propTypes = {
  user: PropTypes.object,
};
