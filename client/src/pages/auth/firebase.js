import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

import { axiosAuth } from '~/api/request';
import { refreshJob } from '~/context/AuthActions';

const firebaseConfig = {
    apiKey: 'AIzaSyBl9l6fzJHbsn8mBvkJAXf4DGH08ajrcsY',
    authDomain: 'gooleauth-ff3ce.firebaseapp.com',
    projectId: 'gooleauth-ff3ce',
    storageBucket: 'gooleauth-ff3ce.appspot.com',
    messagingSenderId: '444716980303',
    appId: '1:444716980303:web:c2a1418deb12daaeb8f23a',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

export const signInWithGoole = (setUser, user, dispatchEvent) => {
    signInWithPopup(auth, providerGoogle)
        .then(async (result) => {
            const { displayName, email, photoURL } = result.user;
            const res = await axiosAuth.post('login-social', {
                displayName,
                email,
                photoURL,
            });
            if (user.email !== email) {
                dispatchEvent(refreshJob());
                setUser({
                    accessToken: res.data.accessToken,
                    username: displayName,
                    email,
                    image: photoURL,
                    gender: user?.gender,
                });
            }
            window.location = '/home';
        })
        .catch((e) => console.error(e));
};

const providerFacebook = new FacebookAuthProvider();

export const signInWithFacebook = (setUser, user, dispatchEvent) => {
    signInWithPopup(auth, providerFacebook)
        .then(async (result) => {
            const { displayName, email, photoURL } = result.user;
            const res = await axiosAuth.post('login-social', {
                displayName,
                email,
                photoURL,
            });
            if (user.email !== email) {
                dispatchEvent(refreshJob());
                setUser({
                    accessToken: res.data.accessToken,
                    username: displayName,
                    email,
                    image: photoURL,
                    gender: user?.gender,
                });
            }
            window.location = '/home';
        })
        .catch((e) => console.error(e));
};

//handle upload image
