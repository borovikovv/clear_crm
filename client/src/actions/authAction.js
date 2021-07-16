import AuthService from "../api/AuthService";

export const registration = (email, password) => async (dispatch) => {
    try {
        const result = await AuthService.register(email, password);
        console.log(result);
    } catch (e) {
        console.dir({e});
    }
    
};