import { useEffect, useReducer } from 'react';

const INITIAL_PURCHASED = {
    items: JSON.parse(localStorage.getItem('items'))?.items || [],
};

const ProductPurChased = (state, action) => {
    switch (action.type) {
        case 'ADD':
            let itemId = action.payload.id;
            let existItemId = state.items.findIndex((item) => item.id === itemId);

            if (existItemId !== -1) {
                let newItems = [...state.items];
                newItems[existItemId].quantity++;
                return {
                    items: newItems,
                };
            } else
                return {
                    items: [...state.items, action.payload],
                };
        case 'DELETE':
            let newJobs = state.items.filter((item) => item.id !== action.payload.id);

            return {
                items: newJobs,
            };
        case 'UPDATE':
            let Id = action.payload.id;
            let existId = state.items.findIndex((item) => item.id === Id);
            let newItems = [...state.items];
            newItems[existId].quantity = action.payload.quantity;
            return {
                items: newItems,
            };

        case 'REFRESH':
            return {
                items: [],
            };
        default:
            return state;
    }
};

export function usePurchased() {
    const [statePurchased, dispatchEvent] = useReducer(ProductPurChased, INITIAL_PURCHASED);
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(statePurchased));
    }, [statePurchased]);
    return { statePurchased, dispatchEvent };
}

//isLiked
const INITIAL_LIKED = {
    heart: JSON.parse(localStorage.getItem('isLiked'))?.heart || [],
};

const ToggleLiked = (state, action) => {
    switch (action.type) {
        case 'ADD_LIKED':
            let existItemId = state.heart.findIndex((item) => item === action.payload.id);
            if (existItemId !== -1) {
                let newHeart = [...state.heart];
                newHeart.splice(existItemId, 1);
                return {
                    heart: newHeart,
                };
            } else
                return {
                    heart: [...state.heart, action.payload.id],
                };
        default:
            return state;
    }
};

export function useLiked() {
    const [stateLiked, dispatch] = useReducer(ToggleLiked, INITIAL_LIKED);
    useEffect(() => {
        localStorage.setItem('isLiked', JSON.stringify(stateLiked));
    }, [stateLiked]);
    return { stateLiked, dispatch };
}

const INITIAL_TOGGLE = {
    isSelect: [],
    bill: 0,
};
const ToggleSelect = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_SELECT':
            let isCheck = state.isSelect.includes(action.payload.id);
            if (isCheck) {
                let newBill = state.bill - action.payload.bill;
                return {
                    isSelect: state.isSelect.filter((item) => item !== action.payload.id),
                    bill: newBill,
                };
            } else {
                let newBill = state.bill + action.payload.bill;
                return {
                    isSelect: [...state.isSelect, action.payload.id],
                    bill: newBill,
                };
            }
        case 'UPDATE_SELECT':
            
            return {
                isSelect: state.isSelect.filter((item) => item !== action.payload.id),
                bill: state.bill - action.payload.bill,
            }
        case 'REFRESH_SELECT':
            return {
                isSelect: [],
                bill: 0,
            };
        default:
            return state;
    }
};

export function useToggleSelect() {
    const [toggle, dispatchToggle] = useReducer(ToggleSelect, INITIAL_TOGGLE);

    return { toggle, dispatchToggle };
}
