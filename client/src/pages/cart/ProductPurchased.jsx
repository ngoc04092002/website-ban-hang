import React, { memo, useEffect, useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormSubtract } from 'react-icons/gr';
import { BiTrash } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import './cart.scss';
import { updateJob } from '~/context/AuthActions';
import { toggleSelect, refreshSelect,updateSelect } from '~/context/AuthActions';
import CardRequest from '~/components/card/CardRequest';

const ProductPurchased = ({
    toggle,
    dispatchToggle,
    selectBox,
    quantity,
    id,
    image,
    desc,
    price,
    sale,
    dispatchEvent,
}) => {
    const [cardRequest, setCardRequest] = useState(false);
    const [quantityPurchased, setQuantityPurchased] = useState(quantity);
    const priceSale = useMemo(() => {
        let number = (price * sale) / 100;
        return Math.round(number);
    }, [price, sale]);

    const totalSale = useMemo(() => {
        let number = quantityPurchased * (price - priceSale);
        return Math.ceil(number);
    }, [quantityPurchased, priceSale, price]);
    //toggle checkbox
    useEffect(() => {
        if (!selectBox) dispatchToggle(refreshSelect());
        else {
            let isId = toggle.isSelect.includes(id);
            if (!isId) {
                dispatchToggle(toggleSelect({ id, bill: totalSale }));
            }
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectBox, dispatchToggle, id]);
    //update quantity
    useEffect(() => {
        dispatchEvent(updateJob({ id, quantity: quantityPurchased }));

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantityPurchased, id, dispatchEvent]);


    return (
        <div className="lists__purchased-wrapper">
            <div className="lists__purchased-left">
                <label className="container-checkbox">
                    <input
                        type="checkbox"
                        onChange={() => dispatchToggle(toggleSelect({ id, bill: totalSale }))}
                        checked={toggle.isSelect.includes(id)}
                    />
                    <span className="checkmark"></span>
                </label>
                <Link to={`/products/${id}`} className="lists__purchased-img">
                    <img src={image} alt="" />
                    <p>{desc}</p>
                </Link>
                <div className="price-saled">
                    <p className="price-sale">{price.toLocaleString('vi')}$</p>
                    {sale > 0 && <p className="cost">{priceSale}$</p>}
                </div>
            </div>

            <div className="lists__purchased-right">
                <div className="item-quanity">
                    <span
                        onClick={() => {
                            if (!toggle.isSelect.includes(id)) setQuantityPurchased(+quantityPurchased - 1);
                        }}
                        className={
                            quantityPurchased < 2 || toggle.isSelect.includes(id)
                                ? 'change_quanity active'
                                : 'change_quanity'
                        }
                    >
                        <GrFormSubtract />
                    </span>
                    <input
                        disabled={toggle.isSelect.includes(id)}
                        value={quantityPurchased}
                        type="text"
                        name="quanity"
                        onChange={(e) => {
                            if (!toggle.isSelect.includes(id))
                                setQuantityPurchased(() => {
                                    if (e.target.value < 1) {
                                        return 1;
                                    }
                                    if (e.target.value > 100) {
                                        return 100;
                                    }
                                });
                        }}
                    />
                    <span
                        className={
                            quantityPurchased > 99 || toggle.isSelect.includes(id)
                                ? 'change_quanity active'
                                : 'change_quanity'
                        }
                        onClick={() => {
                            if (!toggle.isSelect.includes(id)) setQuantityPurchased(+quantityPurchased + 1);
                        }}
                    >
                        <AiOutlinePlus />
                    </span>
                </div>
                <p className="price-current">
                    {sale > 0 ? totalSale.toLocaleString('vi') : (price * quantityPurchased).toLocaleString('vi')}$
                </p>
                <span
                    className="trash"
                    onClick={() => {
                        dispatchToggle(updateSelect({ id, bill: totalSale }));
                        setCardRequest(true);
                    }}
                >
                    xóa <BiTrash />
                </span>
            </div>
            <CardRequest
                title="Bạn chắc chắn muốn xóa không ?"
                button="Xóa"
                id={id}
                dispatchEvent={dispatchEvent}
                cardRequest={cardRequest}
                setCardRequest={setCardRequest}
            />
        </div>
    );
};

export default memo(ProductPurchased);
