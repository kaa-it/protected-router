import {login} from "../services/actions";
import {useDispatch} from "react-redux";

export const Login = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(login());
    }

    return (
        <div className="page">
            <h1 className="title">Логин</h1>
            <button className="button" onClick={onClick}>Войти</button>
        </div>
    )
}