import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

const MainContainer = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    };

    return (
        <button
            onClick={onLogout}
        >
            LOGOUT
        </button>
    )
};

export default MainContainer;