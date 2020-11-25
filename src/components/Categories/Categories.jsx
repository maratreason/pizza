import React, { useState } from 'react';

function Categories({items, onClickItem}) {
    const [activeItem, setActiveItem] = useState(0);

    const onSelectItem = index => {
        setActiveItem(index);
    }

    return (
        <div className="categories">
            <ul>
                <li className={activeItem === null ? "active" : ""} 
                    onClick={() => onSelectItem(null)}
                >Все</li>
                {
                    items && items.map((el, index) => {
                        return <li
                            className={activeItem === index ? "active" : ""}
                            onClick={() => onSelectItem(index)} 
                            key={`${el}__${index}`}
                        >{el}</li>;
                    })
                }
            </ul>
        </div>
    )
}

export default Categories;
