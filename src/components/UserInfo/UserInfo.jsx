import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../redux/auth/operations";
import { selectUser, selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "../../components/UserInfo/UserInfo.module.css";
import { lsGetToken } from "../../utils/localStorage";
import { setAuthorizationToken } from "../../api/api";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const token = lsGetToken();

    const isValidToken = token && token !== "undefined" && token !== "null";

    if (isValidToken && !isLoggedIn) {
      setAuthorizationToken(token);
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isLoggedIn]);

  const firstLetter = user?.name?.charAt(0).toUpperCase() || "";

  return (
    <div className={css.user_div}>
      <div className={css.avatar}>{firstLetter}</div>
      <p className={css.userName}>{user?.name || "Guest"}</p>
    </div>
  );
};

export default UserInfo;
