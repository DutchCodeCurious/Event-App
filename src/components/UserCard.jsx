export const UserCard = ({ userName, userImage }) => {
  return (
    <div className="user-card">
      <p>{userName}</p>
      <img src={userImage} alt="userImg" />
    </div>
  );
};
