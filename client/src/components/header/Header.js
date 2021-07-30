import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../actions/authActions";
import Loading from "../login/Login";

import s from "./header.module.css";

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = () => {
        dispatch(logout({history}));
    };

    return (
        <div className={s.header}>
            <div className={s.main}>
                You work place
            </div>
            <div className={s.logout}>
                <button
                    onClick={onLogout}
                >
                    LOGOUT
                </button>
            </div>
        </div>
    )
};

export default Header;