import React, {useEffect, useState} from 'react';
import './App.scss';
import Collection from "./Collection";

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]

function App() {
    const [collections, setCollection] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);

        const category = categoryId ? `category=${categoryId}`:'';
        fetch(`https://653eda7b9e8bd3be29dfc141.mockapi.io/collection/collection?page=${page}&limit=3&${category}`)
            .then(res => res.json())
            .then((json) => {
                console.log(json);
                setCollection(json);
            })
        .catch((err) => {
            console.log(err);
            alert('Ошибка при получении данных');
        }).finally(() => setIsLoading(false))

    }, [categoryId, page]);


    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {
                        cats.map((obj, index) =>
                            (<li className={categoryId === index ? 'active' : ''}
                                 onClick={() => setCategoryId(index) + setPage(1)}
                                 key={obj.name}>
                                {obj.name}
                            </li>))}
                </ul>
                <input
                       value={searchValue} onChange={e => setSearchValue(e.target.value)}
                       className="search-input"
                       placeholder="Поиск по названию" />
            </div>
            <div className="content">
                {isLoading ? (<h2>Идет загрузка...</h2>) : (
                    collections.filter(obj => {
                        return obj.name.toLowerCase().includes(searchValue.toLowerCase());
                    }).map((obj, index) => (
                        <Collection
                            key={index}
                            name={obj.name}
                            images={obj.photos}
                        />
                    )))}
            </div>
            <ul className="pagination">
                {
                    [...Array(3)].map((_, i) =>
                        <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>)
                }
            </ul>
        </div>
    );
}

export default App;

