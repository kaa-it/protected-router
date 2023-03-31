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

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
              .catch(error => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser({}));
              })
              .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};
