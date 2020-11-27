const ADD_PIZZA_CART = "ADD_PIZZA_CART";
const CLEAR_CART = "CLEAR_CART";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
const PLUS_CART_ITEM = "PLUS_CART_ITEM";
const MINUS_CART_ITEM = "MINUS_CART_ITEM";

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
};

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split(".");
    return keys.reduce((val, key) => {
        return val[key];
    }, obj[firstKey]);
}

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path);
        return sum + value;
    }, 0);
};

const cart = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PIZZA_CART: {
            // генерируем новый массив
            const currentPizzaItems = !state.items[action.payload.id] // если массив пустов, создай новый пустой массив и залей туда payload
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems),
                }
            };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }
        case CLEAR_CART:
            return {
                ...state,
                items: {},
                totalCount: 0,
                totalPrice: 0
            }
        case REMOVE_CART_ITEM:
            const newItems = {
                ...state.items
            }
            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;
            delete newItems[action.payload];

            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }
        case PLUS_CART_ITEM: {
            const newObjectItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ];

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems),
                },
            }

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }
        case MINUS_CART_ITEM: {
            const oldItems = state.items[action.payload].items;
            const newObjectItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems),
                },
            }

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }
        default:
            return state;
    }
}

export default cart;