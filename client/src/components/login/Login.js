import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { login } from "../../actions/authActions";
import s from "./login.module.css"
import types from "./../../common/routeTypes";
const {
  ROUTE_REGISTER
} = types;

const Login = (props) => {
    const { } = props;
    const dispatch = useDispatch();
    let history = useHistory();

    let [email, setMail] = useState("");
    let [password, setPassword] = useState("");

    const sendUserData = (e) => {
        e.preventDefault();

        // const isEmailValid = emailValidate(email);
        // const isPasswordValid = validatePassword()
        // const isConfirmPasswordValid = validatePassword()

        dispatch(login({ email, password, history }));

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
                <button
                    className={s.button}
                    type="submit">
                    Login
                </button>
            </form>
            <Link className={s.register} to={ROUTE_REGISTER}>
                Registration
            </Link>
        </div>
    )
};

export default Login;