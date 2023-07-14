import React, { useState } from "react";
import { loadData } from '../store/store.js'
import { Link } from 'react-router-dom'
import classes from '../styles/components/CreateArticle.module.css'

export function CreateArticle() {
    const [name, setName] = useState('');
    const [climate, setClimate] = useState('');
    const [diameter, setDiameter] = useState('');
    const [gravity, setGravity] = useState('');
    const [population, setPopulation] = useState('');
    const [terrain, setTerrain] = useState('');

    function setFields() {
        loadData.addData({ name: name, climate: climate, diameter: diameter, gravity: gravity, population: population, terrain: terrain })
    }

    return (
        <div className={classes.wrapper}>
            <input className="input" placeholder="Name of planet" onChange={(e) => setName(e.target.value)} />
            <input className="input" placeholder="Climate" onChange={(e) => setClimate(e.target.value)} />
            <input className="input" placeholder="Diameter" onChange={(e) => setDiameter(e.target.value)} />
            <input className="input" placeholder="Gravity" onChange={(e) => setGravity(e.target.value)} />
            <input className="input" placeholder="Population" onChange={(e) => setPopulation(e.target.value)} />
            <input className="input" placeholder="Terrain" onChange={(e) => setTerrain(e.target.value)} />
            <Link className="btn" onClick={setFields} to="/articles">Add Article</Link>
            <Link className="btn" to="/articles">Back to articles</Link>
        </div>
    )
}