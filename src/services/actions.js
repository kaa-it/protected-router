import {setAuthChecked, setUser} from "./user";

function isInvalid(token) {
    return token !== "test-token";
}

function isRefreshInvalid(token) {
    return token !== "test-refresh-token";
}

function isExpired(token) {
    const random => (min, max) => Math.random() * (max - min) + min; 
    return random(100, 200) % 2 === 0;
}

const fakeFetchToken = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isInvalid(token)) {
                reject({message: "invalid token"});
            } else if (isExpired(token)) {
                reject({message: "jwt expired"});
            } else {
                resolve();
            }
        }, 1000);
    });
}

const fakeFetch = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                resolve();
        }, 1000);
    });
}

const fakeRefreshFetch = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isRefreshInvalid(token)) {
                reject({message: "Token is invalid"});
            } else {
                resolve();
            }
        }, 1000);
    });
}

const fakeFetchWithRefresh = async () => {
    try {
        await fakeFetchWithToken();
    } catch (e) {
        if (e.message === "jwt expired") {
            try {
                await fakeRefreshFetch();
                // update tokens
                // resend request
            } catch (innerError) {
                if (innerError === "Token is invalid") {
                   throw new Error("token error");     
                } else {
                    throw innerError;
                }    
            }      
        }
    }
}

export const getUser = () => {
    return (dispatch) => {
        const accessToken = localStorage.getItem("accessToken");
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (accessToken !== "test-token") {
                    reject({message: "invalid-token"});
                }
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
        return fakeFetch().then(() => {
                localStorage.setItem("accessToken", "test-token");
                localStorage.setItem("refreshToken", "test-refresh-token");
                dispatch(setUser({}));
                dispatch(setAuthChecked(true));
            }
        );
    }
}

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser()).finally(() => {
                dispatch(setAuthChecked(true));
            });
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};
