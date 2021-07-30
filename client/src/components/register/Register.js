import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { emailValidate, validatePassword } from "../../utils/authUtils";
import { registration } from "../../actions/authActions";

import s from "./register.module.css";
import types from "./../../common/routeTypes";
const {
  ROUTE_LOGIN
} = types;

const Register = (props) => {
    const dispatch = useDispatch();

    let [email, setMail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    const sendUserData = (e) => {
        e.preventDefault();

        // const isEmailValid = emailValidate(email);
        // const isPasswordValid = validatePassword()
        // const isConfirmPasswordValid = validatePassword()
        const userData = new FormData();

        userData.set("email", email);
        userData.set("password", password);

        dispatch(registration({email, password}));

    };

    const onChangeMail = (e) => {
        let value = e.target.value;

        setMail(value);
    }

    const onChangePassword = (e) => {
        let value = e.target.value;

        setPassword(value);
    }

    const onChangeConfirmPassword = (e) => {
        let value = e.target.value;

        setConfirmPassword(value);
    }

    return (
        <div className={s.registerPage}>
            <form className={s.form} onSubmit={sendUserData}>
                <label>
                <span className={s.inputText}>Email</span>
                    <input
                        className={s.input}
                        value={email}
                        type="text"
                        name="mail"
                        onChange={onChangeMail}
                    />
                </label>
                <label>
                <span className={s.inputText}>Password</span>
                    <input
                        className={s.input}
                        value={password}
                        type="password"
                        name="password"
                        onChange={onChangePassword}
                    />
                </label>
                <label>
                <span className={s.inputText}>Confirm password</span>
                    <input
                        className={s.input}
                        value={confirmPassword}
                        type="password"
                        name="password"
                        onChange={onChangeConfirmPassword}
                    />
                </label>
                <button
                    className={s.button}
                    type="submit">
                    Registration
                </button>
            </form>
            <Link className={s.login} to={ROUTE_LOGIN}>
                Login
            </Link>
        </div>
    )
};

export default Register;