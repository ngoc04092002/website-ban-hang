import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { usePurchased } from '~/context/AuthReducer';

import {
    ForgotPassword,
    PostProduct,
    ProductsPersonal,
    Account,
    Clothes,
    InforItem,
    Profile,
    Cart,
    Search,
    Header,
    Home,
    NotFound,
    RequireAuth,
    Footer,
    Register,
    Introduce,
    Login,
    Order
} from './components/index';

function App() {
    const { statePurchased, dispatchEvent } = usePurchased();

    return (
        <>
            <Routes>
                <Route path="/" element={<Introduce />} />
                <Route path="login" element={<Login dispatchEvent={dispatchEvent} />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Header statePurchased={statePurchased} />}>
                        <Route path="home/*" element={<Home dispatchEvent={dispatchEvent} />} />
                        <Route path="search" element={<Search />} />
                        <Route path=":clothes" element={<Clothes dispatchEvent={dispatchEvent} />} />
                        <Route
                            path="cart"
                            element={<Cart statePurchased={statePurchased} dispatchEvent={dispatchEvent} />}
                        />
                        {/* profile */}
                        <Route path="/profile" element={<Profile />}>
                            <Route path="account" element={<Account />} />
                            <Route path="product" element={<ProductsPersonal />} />
                            <Route path="post" element={<PostProduct />} />
                            <Route path="order" element={<Order />} />
                        </Route>

                        <Route path="products/:id" element={<InforItem dispatchEvent={dispatchEvent} />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />

            </Routes>
            <Footer />
        </>
    );
}

export default App;
