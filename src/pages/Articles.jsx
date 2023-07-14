import React, { useEffect } from "react";
import { loadData } from '../store/store.js'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classes from '../styles/components/Articles.module.css'

export const Articles = observer(() => {

    const navigate = useNavigate()

    function loadPlanets() {
        loadData.loadPlanets()
    }
    {
        !loadData.alreadyLoad && useEffect(loadPlanets, [])
    }

    return (
        <div className={classes.container}>
            <div>
                <Link className="btn" to="/create">Create article</Link>
            </div>
            <div className={classes.wrapper}>
                {!loadData.loader && !loadData.error && loadData.starWars.length !== 0 && loadData.starWars.map((item, index) =>
                    <div className={classes.article} key={index}>
                        <h3>Name of planet: {item.name}</h3>
                        <div className={classes.wrapperInner}>
                            <h4>Info</h4>
                            <div className={classes.infoItem}><span>Climate:</span> {item.climate}</div>
                            <div className={classes.infoItem}><span>Diameter:</span> {item.diameter}</div>
                            <div className={classes.infoItem}><span>Gravity:</span> {item.gravity}</div>
                            <div className={classes.infoItem}><span>Population:</span> {item.population}</div>
                            <div className={classes.infoItem}><span>Terrain:</span> {item.terrain}</div>
                        </div>
                        <button className="btn" onClick={() => navigate(`/article/${index}`)}>Open</button>
                    </div>
                )}
            </div>
            {loadData.loader &&
                <div className={classes.loader}>Loading..</div>
            }
            {loadData.error &&
                <div className={classes.error}>Something went wrong, try later...</div>
            }
        </div>
    )
})