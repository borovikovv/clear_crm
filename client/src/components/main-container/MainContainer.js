import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import Profile from "../profile/Profile";
import Header from "../header/Header";
import { getUsers } from "../../actions/usersActions";

import s from "./main.module.css";
import types from "../../common/routeTypes";
const {
    ROUTE_PROFILE
  } = types;

const MainContainer = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.users.allUsers)

    let [users, setUsers] = useState(allUsers);

    useEffect(() => {
        setUsers(allUsers);
    }, [allUsers])


    const getAllUsers = () => {
        dispatch(getUsers());
    };

    return (
        <div className={s.main}>
            <Header />
            <Route path={ROUTE_PROFILE} component={Profile} />
            <button
                onClick={getAllUsers}
            >
                USERS
            </button>
            <div>
                {JSON.stringify(users)}
            </div>
        </div>
    )
};

export default MainContainer;