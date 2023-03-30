import {setAuthChecked, setUser} from "./user";

export const getUser = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        }).then(() => {
                dispatch(setUser({}));
            }
        );
    };
};

export const login = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        }).then(() => {
                localStorage.setItem("accessToken", "test-token");
                dispatch(setUser({}));
                dispatch(setAuthChecked(true));
            }
        );
    }
}