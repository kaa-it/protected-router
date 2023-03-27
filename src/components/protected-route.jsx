import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRoute = ({onlyUnAuth = false, children}) => {
    const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    const user = useSelector(store => store.user.user);
    const location = useLocation();

    if (!isAuthChecked) {
        // Запрос еще выполняется
        return null; // или прелоадер
    }

    if (onlyUnAuth && user) {
        // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
        // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
        const { from } = location.state || { from: { pathname: "/" } }
        return <Navigate to={from} />;
    }


    if (!onlyUnAuth && !user) {
        // Сервер не ответил
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // !onlyUnAuth && user

    return children;
};