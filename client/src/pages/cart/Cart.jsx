import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import './cart.scss';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { toast } from 'react-toastify';

import ProductPurchased from './ProductPurchased';
import { useToggleSelect } from '~/context/AuthReducer';
import CardRequest from '~/components/card/CardRequest';
import {Delivery} from '~/components/index';

const Cart = ({ statePurchased, dispatchEvent }) => {
    useEffect(() => {
        document.title = 'Cart';
    }, []);

    const [open, setOpen] = useState(false);
    const { toggle, dispatchToggle } = useToggleSelect();
    const [selectBox, setSelectBox] = useState(false);
    const [cardRequest, setCardRequest] = useState(false);

    const check = useMemo(() => {
        return toggle.isSelect.length === statePurchased.items.length && statePurchased.items.length > 0;
    }, [toggle.isSelect, statePurchased.items]);
    useLayoutEffect(() => {
        if (check) setSelectBox(check);
    }, [check]);

    const handleDelete = () => {
        if (selectBox) {
            setCardRequest(true);
        } else toast.info('Bạn phải chọn xóa tất cả!');
    };

    const handleToggle = () => {
        if(statePurchased.items.length >0) 
        setOpen(!open);
        else toast.info('Bạn chưa chọn sản phẩm');
    };


    return (
        <>
            <section className="cart_wrapper">
                <Link to="/home" className="cart__back">
                    <AiOutlineArrowLeft className="cart__back-icon" />
                    mua sắm
                </Link>
                <ul className="title__items-purchsed">
                    <li>sản phẩm</li>
                    <li>đơn giá</li>
                    <li>số lượng</li>
                    <li>số tiền</li>
                    <li>thao tác</li>
                </ul>
                {statePurchased.items && statePurchased.items.length === 0 && (
                    <p style={{ textTransform: 'capitalize', textAlign: 'center', fontSize: '2rem' }}>
                        chưa có sản phẩm nào
                        <Link to="/home" style={{ color: 'blue', textDecoration: 'underline' }}>
                            {' '}
                            mua sắm thôi
                        </Link>
                    </p>
                )}
                {statePurchased.items &&
                    statePurchased.items.length > 0 &&
                    statePurchased.items.map((item, index) => (
                        <ProductPurchased
                            key={item.id}
                            selectBox={selectBox}
                            setSelectBox={setSelectBox}
                            toggle={toggle}
                            dispatchToggle={dispatchToggle}
                            id={item.id}
                            image={item.image}
                            desc={item.desc}
                            price={item.price}
                            sale={item.sale}
                            dispatchEvent={dispatchEvent}
                            quantity={item.quantity}
                            statePurchased={statePurchased}
                        />
                    ))}
                <section className="payment">
                    <div className="payment__left">
                        <label className="container-checkbox">
                            chọn tất cả({statePurchased.items.length})
                            <input type="checkbox" checked={check} onChange={() => setSelectBox(!selectBox)} />
                            <span className="checkmark"></span>
                        </label>
                        <p onClick={handleDelete}>xóa</p>
                    </div>
                    <div className="payment__right">
                        <p>thanh toán({toggle.isSelect.length} sản phẩm):</p>
                        <p style={{ color: 'blue' }}>{toggle.bill}$</p>
                        <button onClick={handleToggle} className="buy__items">mua hàng</button>
                    </div>
                </section>
                <CardRequest
                    title="Bạn chắc chắn muốn xóa không ?"
                    button="Xóa"
                    dispatchEvent={dispatchEvent}
                    selectBox={selectBox}
                    cardRequest={cardRequest}
                    setCardRequest={setCardRequest}
                />
            </section>
            <Delivery selectedIds={toggle.isSelect} dispatchToggle={dispatchToggle} dispatchEvent={dispatchEvent} cart={true} datas={statePurchased.items} setOpen={setOpen} open={open} />
        </>
    );
};

export default Cart;
