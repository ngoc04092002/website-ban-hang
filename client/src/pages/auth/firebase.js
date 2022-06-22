import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import toast from 'react-hot-toast';

import { axiosAuth } from '~/api/request';
import { refreshJob } from '~/context/AuthActions';

const firebaseConfig = {
    apiKey: 'AIzaSyB-Q6jBLoVWjjoevNkf8FpGbBitS_IB5ig',
    authDomain: 'apiwebsitebanhang-1bd4a.firebaseapp.com',
    projectId: 'apiwebsitebanhang-1bd4a',
    storageBucket: 'apiwebsitebanhang-1bd4a.appspot.com',
    messagingSenderId: '621762823162',
    appId: '1:621762823162:web:546d6abbd96ac44f891a43',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const auth = getAuth(app);

function signInWithSocial(provider, setUser, user, dispatchEvent) {
    return signInWithPopup(auth, provider)
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
        .catch((e) => {
            toast.error('Lỗi truy cập, vui lòng bạn hãy đăng nhập cách khác!');
            console.log('Error: ', e);
        });
}

export const signInWithGoole = (setUser, user, dispatchEvent) => {
    const providerGoogle = new GoogleAuthProvider();
    signInWithSocial(providerGoogle, setUser, user, dispatchEvent);
};

export const signInWithFacebook = (setUser, user, dispatchEvent) => {
    const providerFacebook = new FacebookAuthProvider();
    signInWithSocial(providerFacebook, setUser, user, dispatchEvent);
};
