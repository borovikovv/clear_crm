import { useDispatch } from "react-redux";
import { useState } from "react";

import { login } from "../../actions/authActions";
import s from "./login.module.css"

const Login = (props) => {
    const { } = props;
    const dispatch = useDispatch();

    let [email, setMail] = useState("");
    let [password, setPassword] = useState("");

    const sendUserData = (e) => {
        e.preventDefault();

        // const isEmailValid = emailValidate(email);
        // const isPasswordValid = validatePassword()
        // const isConfirmPasswordValid = validatePassword()

        dispatch(login({ email, password }));

    };

    const onChangeMail = (e) => {
        let value = e.target.value;

        setMail(value);
    }

    const onChangePassword = (e) => {
        let value = e.target.value;

        setPassword(value);
    }

    return (
        <div className={s.loginPage}>
            <form className={s.form} onSubmit={sendUserData}>
                <label>
                    <input
                        className={s.login}
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
                <button
                    className={s.button}
                    type="submit">
                    Login
                </button>
            </form>
        </div>
    )
};

export default Login;