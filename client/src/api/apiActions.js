import * as request from './request';

//auth
export const logOut = async (path) => {
    try {
        await request.getAuth(path);
    } catch (e) {
        console.log(e);
    }
};
