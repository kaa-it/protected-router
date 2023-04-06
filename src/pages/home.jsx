import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/profile");
    }

    return (
        <div className="page">
            <h1 className="title">Главная</h1>
            <button className="button" onClick={onClick}>Личный кабинет</button>
        </div>
    )
}