import React, { useState, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import { BiXCircle, BiLoaderCircle, BiSearch } from 'react-icons/bi';

import './search-register.scss';
import { axiosProducts } from '~/api/request';
import useDebounce from '~/hooks/useDebounce';
import toast from 'react-hot-toast';

const SearchRegister = ({ setListProducts, path, Params }) => {
    const refInput = useRef();
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 800);

    const handleButtonX = () => {
        setSearchValue('');
        refInput.current.focus();
    };

    const handleChange = (e) => {
        let value = e.target.value;
        if (!value.startsWith(' ')) setSearchValue(value);
    };

    useEffect(() => {
        if (!Params && !debounced.trim()) {
            setListProducts([]);
            return;
        }
        if (!!Params && !debounced.trim()) {
            setListProducts([]);
        }

        setLoading(true);
        var controller = new AbortController();
        var signal = controller.signal;
        const fetchData = async () => {
            try {
                const res = await axiosProducts.get(
                    path,
                    {
                        params: {
                            type: Params?.get('type'),
                            _sort: Params?.get('_sort'),
                            q: debounced,
                        },
                    },
                    { signal: signal },
                );
                setListProducts(res.data.products);
                setLoading(false);
            } catch (e) {
                console.log('error', e);
                toast.error('Lỗi kết nối');
            }
        };
        fetchData();
        return () => {
            controller.abort();
        };
    }, [debounced, setListProducts, path, Params]);

    return (
        <div className="search">
            <label htmlFor="search">
                <BiSearch className="icon" />
                <input
                    autoComplete="off"
                    ref={refInput}
                    id="search"
                    type="text"
                    placeholder="Enter here"
                    spellCheck={false}
                    onChange={handleChange}
                    value={searchValue}
                />
                {!!searchValue && !loading && <BiXCircle onClick={handleButtonX} className="bi-icon" />}
                {loading && <BiLoaderCircle className="bi-icon loader" />}
            </label>
        </div>
    );
};

SearchRegister.propTypes = {
    setListProducts: propTypes.func,
    path: propTypes.string,
    Params: propTypes.object,
}

export default SearchRegister;
