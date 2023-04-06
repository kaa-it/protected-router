import {Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import {Login} from "../pages/login";
import {Profile} from "../pages/profile";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {checkUserAuth} from "../services/actions";
import {OnlyAuth, OnlyUnAuth} from "./protected-route";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<OnlyUnAuth component={<Login/>} />} />
                <Route path="/profile" element={<OnlyAuth component={<Profile/>} />} />
            </Routes>
        </div>
    );
}

export default App;
