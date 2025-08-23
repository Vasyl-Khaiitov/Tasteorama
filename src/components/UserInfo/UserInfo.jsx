
import { useSelector} from "react-redux";

import { selectUser} from "../../redux/auth/selectors";
import css from "../../components/UserInfo/UserInfo.module.css";


const UserInfo = () => {
  const user = useSelector(selectUser);




  const firstLetter = user?.name?.charAt(0).toUpperCase() || "";

  return (
    <div className={css.user_div}>
      <div className={css.avatar}>{firstLetter}</div>
      <p className={css.userName}>{user?.name || "Guest"}</p>
    </div>
  );
};

export default UserInfo;