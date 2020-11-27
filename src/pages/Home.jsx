import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

const categoryNames = ["Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];
const sortItems = [
    {name: "популярности", type: "popular", order: "desc"}, 
    {name: "цене", type: "price", order: "desc"}, 
    {name: "алфавиту", type: "name", order: "asc"}
]

function Home() {
    const dispatch = useDispatch();

    const items = useSelector(({ pizzas }) => pizzas.items); // возвращаем просто массив, не объект

    // Что добавили в корзину
    const cartItems = useSelector(({ cart }) => cart.items);

    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, sortBy]);

    const onSelectCategory = useCallback(index => { // для того чтобы ссылка не менялась. useCallback()
        dispatch(setCategory(index));
    }, []);

    const onSelectSortType = useCallback(type => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddPizzaToCart = (obj) => {
        dispatch(addPizzaToCart(obj));
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                />
                <SortPopup activeSortType={sortBy.type} items={sortItems} onSelectSortType={onSelectSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoaded
                    ? items.map(pizza => <PizzaBlock
                        onClickAddPizza={handleAddPizzaToCart}
                        {...pizza}
                        addedCount={cartItems[pizza.id] && cartItems[pizza.id].items.length}                  
                        key={pizza.id}
                    />)
                    : Array(12).fill(0).map((_, index) => <PizzaLoadingBlock key={index} />)
                }
            </div>
        </div>
    );
}

export default Home;
