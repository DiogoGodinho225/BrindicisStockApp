export const checkExpiration = (key) => {
    const item = JSON.parse(localStorage.getItem(key));

    if (item) {
        const now = new Date();
        if (now.getTime() > item.expiration) {
            localStorage.removeItem(key);
            return true;
        }
    }
    return false;
};

export const setSessionExpiration = (key, value, token) => {
    const now = new Date();
    const expirationTime = now.getTime() + 2 * 60 * 60 * 1000;

    const item = {
        value: value,
        expiration: expirationTime,
        token: token,
    };

    localStorage.setItem(key, JSON.stringify(item));
};