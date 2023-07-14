import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import { loadData } from '../store/store.js'
import { observer } from 'mobx-react-lite'
import classes from '../styles/components/Article.module.css'

export const Article = observer(() => {
    const params = useParams()

    const [edit, setEdit] = useState(false);

    const [save, setSave] = useState(false);

    const [name, setName] = useState(loadData.currentPlanet.name);
    const [climate, setClimate] = useState(loadData.currentPlanet.climate);
    const [diameter, setDiameter] = useState(loadData.currentPlanet.diameter);
    const [gravity, setGravity] = useState(loadData.currentPlanet.gravity);
    const [population, setPopulation] = useState(loadData.currentPlanet.population);
    const [terrain, setTerrain] = useState(loadData.currentPlanet.terrain);

    useEffect(() => {
        setName(loadData.currentPlanet.name)
        setClimate(loadData.currentPlanet.climate)
        setDiameter(loadData.currentPlanet.diameter)
        setGravity(loadData.currentPlanet.gravity)
        setPopulation(loadData.currentPlanet.population)
        setTerrain(loadData.currentPlanet.terrain)
    }, [loadData.currentPlanet.name, loadData.currentPlanet.climate, loadData.currentPlanet.diameter, loadData.currentPlanet.gravity, loadData.currentPlanet.population, loadData.currentPlanet.terrain])

    function loadCurrentPlanet() {
        loadData.loadCurrentPlanet(params.id)
    }

    function updateData() {
        loadData.updateData({ name: name, climate: climate, diameter: diameter, gravity: gravity, population: population, terrain: terrain, id: params.id })
    }

    useEffect(loadCurrentPlanet, [])
    return (
        <div>
            {edit &&
                <div className={classes.article}>
                    <h3>Name of planet</h3>
                    <input className="input" onChange={(e) => setName(e.target.value)} value={name} />
                    <h3>Climate</h3>
                    <input className="input" onChange={(e) => setClimate(e.target.value)} value={climate} />
                    <h3>Diameter</h3>
                    <input className="input" onChange={(e) => setDiameter(e.target.value)} value={diameter} />
                    <h3>Gravity</h3>
                    <input className="input" onChange={(e) => setGravity(e.target.value)} value={gravity} />
                    <h3>Population</h3>
                    <input className="input" onChange={(e) => setPopulation(e.target.value)} value={population} />
                    <h3>Terrain</h3>
                    <input className="input" onChange={(e) => setTerrain(e.target.value)} value={terrain} />
                    <div>
                        <button className="btn" onClick={() => { setEdit(false); setSave(true); updateData() }}>Save</button>
                    </div>
                </div>
            }
            {!edit &&
                <div className={classes.article} >
                    <h3>Name of planet: {save ? name : loadData.currentPlanet.name}</h3>
                    <div className={classes.infoItem}><span>Climate:</span> {save ? climate : loadData.currentPlanet.climate}</div>
                    <div className={classes.infoItem}><span>Diameter:</span> {save ? diameter : loadData.currentPlanet.diameter}</div>
                    <div className={classes.infoItem}><span>Gravity:</span> {save ? gravity : loadData.currentPlanet.gravity}</div>
                    <div className={classes.infoItem}><span>Population:</span> {save ? population : loadData.currentPlanet.population}</div>
                    <div className={classes.infoItem}><span>Terrain:</span> {save ? terrain : loadData.currentPlanet.terrain}</div>
                    <div className={classes.buttonWrapper}>
                        <button className="btn" onClick={() => setEdit(true)}>Edit</button>
                        <Link className="btn" to="/articles">Back to articles</Link>
                    </div>
                </div>
            }
        </div>
    )
})