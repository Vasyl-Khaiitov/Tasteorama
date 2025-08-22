import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../redux/auth/operations";
import { selectUser, selectAuthIsLoading } from "../../redux/auth/selectors";
import css from '../../components/UserInfo/UserInfo.module.css'

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthIsLoading);

  useEffect(() => {
    if (!user) dispatch(fetchCurrentUser()); 
  }, [dispatch, user]);

  const firstLetter = user?.name?.charAt(0).toUpperCase() || "";

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={css.user_div}>
      <div className={css.avatar}>{firstLetter}</div>
      <p className={css.userName}>{user?.name || "Guest"}</p>
    </div>
  );
};

export default UserInfo;
