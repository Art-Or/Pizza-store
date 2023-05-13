import styles from "./Search.module.scss"

import debounce from "lodash.debounce";
import React from "react";
import { SearchContext } from "../../App";

function Search() {
    const [value, setValue] = React.useState("");
    const {searchValue, setSearchValue} = React.useContext(SearchContext);
    const inputRef = React.useRef();

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 1000), 
        [],
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    const onClickClear = () => {
        setSearchValue("");
        setValue("");
        inputRef.current.focus();
    }



    return (
        <div className={styles.root}>
            <svg 
                className={styles.icon}
                viewBox="0 0 32 32" 
                xmlns="http://www.w3.org/2000/svg">
                <title/>
                <g id="search">
                    <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
                </g>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput} 
                className={styles.input} 
                placeholder="Поиск" 
            />
            {value && <svg 
                className={styles.clearIcon}
                onClick={onClickClear}
                height="512px" 
                id="Layer_1" 
                version="1.1" 
                viewBox="0 0 512 512" 
                width="512px" 
                xmlns="http://www.w3.org/2000/svg" 
            >
                <g>
                    <path d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z    M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8   l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76   l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7   c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"/>
                </g>
            </svg>}
            
        </div>
        
    )
}

export default Search;