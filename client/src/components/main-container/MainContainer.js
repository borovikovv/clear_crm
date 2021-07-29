import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState  } from "react";
import { logout } from "../../actions/authActions";
import { getUsers } from "../../actions/usersActions";

const MainContainer = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.users.allUsers)

    let [users, setUsers] = useState(allUsers);

    useEffect(() => {
        setUsers(allUsers);
    }, [allUsers])

    const onLogout = () => {
        dispatch(logout());
    };

    const getAllUsers = () => {
        dispatch(getUsers());
    };

    return (
        <div>
            <button
                onClick={getAllUsers}
            >
                USERS
            </button>
            <button
                onClick={onLogout}
            >
                LOGOUT
            </button>
            <div>
                {JSON.stringify(users)}
            </div>
        </div>
    )
};

export default MainContainer;