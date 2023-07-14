import { observer } from 'mobx-react-lite'
import React, { useState } from 'react';
import classes from '../styles/components/Search.module.css'
import { inputValue } from '../store/store.js'

export const SearchWiki = observer(() => {

    const [input, setInput] = useState(sessionStorage.getItem('inputValue') ? sessionStorage.getItem('inputValue') : '');

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            inputValue.updateValue(input)
            sessionStorage.setItem('inputValue', input)
        }
    }

    function setValue() {
        inputValue.updateValue(input)
        sessionStorage.setItem('inputValue', input)
    }
    return (
        <div className="wrapper">
            <div className="imgMain">
                <h1 className={classes.title}>WikiSearch</h1>
                <img className={classes.img} src="http://res.cloudinary.com/kharatpriyank/image/upload/v1513659146/search_ojyiyb.svg" alt="Search"></img>
            </div>
            <div className={classes.searchWrapper}>
                <button onClick={setValue} className="btn">
                    Search
                </button>
                <input className="input" onKeyPress={handleKeyPress} onChange={(e) => setInput(e.target.value)} type="search" id='searchBox' placeholder="Search Here" name="searchBox" />
                <a className="btn" id='randomButton' href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" rel="noreferrer">Random!</a>
            </div>
            <div className="container searchResultsShow">
                {!inputValue.wikiObject.length && !inputValue.wikiObject.servedby &&
                    <div>No results</div>
                }
                {inputValue.wikiObject.servedby &&
                    <div className={classes.error}>Something went wrong</div>
                }
                {inputValue.wikiObject.length !== 0 && !inputValue.wikiObject.servedby &&

                    inputValue.wikiObject[1].map((item, index) =>
                        <li className={classes.link} key={index}>

                            <a href={inputValue.wikiObject[3][index]}>
                                <span>{index}</span>{item}
                            </a>
                            <div>{inputValue.wikiObject[2][index]}</div>
                        </li>
                    )

                }
            </div>
        </div>

    )
})