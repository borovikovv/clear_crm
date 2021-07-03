import React, { useState } from "react";

import { register } from "../../api/api-v1";

import s from "./register.module.css";

const Register = () => {

    let [email, setMail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    const sendUserData = (e) => {
        e.preventDefault();
        const userData = new FormData();

        userData.set("email", email);
        userData.set("password", password);

        register(userData);
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
                    Name:
                    <input
                        value={email}
                        type="text"
                        name="mail"
                        onChange={onChangeMail}
                    />
                </label>
                <label>
                    Password:
                    <input
                        value={password}
                        type="password"
                        name="password"
                        onChange={onChangePassword}
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        value={confirmPassword}
                        type="password"
                        name="password"
                        onChange={onChangeConfirmPassword}
                    />
                </label>
                <button type="submit" value="Надіслати">
                    Registration
                </button>
            </form>
        </div>
    )
};

export default Register;