import React, { useEffect, useState } from 'react';
import $ from "jquery";
import classes from '../styles/components/Quote.module.css'


export function Quote() {

    const colors = ["#14cc8d", "#1481cc", "#cc3114", "#bb14cc", "#14ccbb", "#5f14cc", "#cc8d14"];

    const [quote, setQuote] = useState('');
    const [error, setError] = useState('');
    const [color, setColors] = useState(0);

    function update() {
        const url =
            "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
        $.getJSON(url, function (data) {
            setQuote(data)
            if (quote) {
                setError('')
                color === colors.length - 1 ? setColors(0) : setColors(prev => prev + 1)
            }
        })
            .fail(function () { setError('Something is wrong') });
    }

    useEffect(update, [])


    if (!quote) return null;

    return (
        <div style={{ background: colors[color] }} className="wrapper">
            <h1 className={classes.title}>Random Quotes!</h1>
            <div className={classes.well}>
                {!error &&
                    <div>
                        <p className={classes.quote}>{quote.quoteText}</p>
                        <p className={classes.author}>{quote.quoteAuthor}</p>
                    </div>
                }
                {error &&
                    <p className={classes.error}>{error}</p>
                }
            </div>
            <button onClick={update} type="button" className="btn">New Quote</button>
        </div>
    );
}