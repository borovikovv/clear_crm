import React, { useState } from "react";
import { connect } from "react-redux";

import { emailValidate, validatePassword } from "../../utils/authUtils";
import { registration } from "../../actions/authAction";

import s from "./register.module.css";

const Register = (props) => {
    const { registration } = props;

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

        registration(email, password);

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
                    <input
                        className={s.registerFields}
                        value={email}
                        type="text"
                        name="mail"
                        onChange={onChangeMail}
                    />
                </label>
                <label>
                    <input
                        value={password}
                        type="password"
                        name="password"
                        onChange={onChangePassword}
                    />
                </label>
                <label>
                    <input
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
        </div>
    )
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    registration
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);