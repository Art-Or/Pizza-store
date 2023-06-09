import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { useNavigate } from "react-router-dom"

import React from 'react';
import axios from "axios";
import qs from "qs";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from '../App';

function Home () {
    const navigate = useNavigate();
    
    const {categoryId, sort, currentPage } = useSelector((state) => state.filter);
    
    const dispatch = useDispatch();
   
    const {searchValue} = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);           /*if on - selector off*/
    const [isLoading, setIsLoading] = React.useState([true]);
    
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
        }
    }, []);

    const getPizzas = async () => { 
        setIsLoading(true);

        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const sortBy = sort.sortProperty.replace("-", "");
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";

        try {
            const { data } = await axios.get(           
            `https://63bc4726fa38d30d85c2e4cd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            )                                            
                setItems(data);
            }catch(err) {
                alert("Error pizzas loading")
            } finally {
                setIsLoading(false);
            }
        window.scrollTo(0, 0);
    }  
    
    React.useEffect(() => {
            getPizzas()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    
    React.useEffect (() => {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))

    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                isLoading ? (
                    skeletons
                ) : (
                    pizzas
                    )
                } 
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    )
}

export default Home;