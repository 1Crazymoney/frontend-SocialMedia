let interval = null;

export const isTokenValid = (expiresAt) => {

    if (interval) {
        clearInterval(interval)
    }
    
    interval = setInterval(() => {
        const time = new Date()
        const currentTimestamp = Date.parse(time)/1000
        console.log(currentTimestamp)
        if (currentTimestamp > expiresAt) {
            console.log("hemos entrado al if")
            localStorage.removeItem("passport")
            clearInterval(interval)

        }
    }, 60000)
}

export const validateCredentials = (credentials) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(credentials.email)) {
        return false;
    }

    if (credentials.password.length < 8 || credentials.password.length > 12) {
        return false;
    }

    return true;
};