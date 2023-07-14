import { makeAutoObservable } from 'mobx'
import $ from "jquery";

class ValueInput {
    wikiObject = ''

    constructor() {
        makeAutoObservable(this);
    }

    async updateValue(newValue) {

        const list = await $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&' + $.param({ 'search': newValue, 'limit': 10 }),
            dataType: 'jsonp',
            success: function (response) {
                let wikepediaObject = {};
                wikepediaObject.links = response[3];
                wikepediaObject.headings = response[1];
                wikepediaObject.descriptions = response[2];
                return wikepediaObject
            },
            error: function (message, textStatus, jqXhr) {
                console.log('Something went wrong')
            },
            timeout: 4000
        });

        // Ошибка корс заголовков, все делал через ajax

        // const list = await fetch('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&' + new URLSearchParams({
        //     'search': newValue,
        //     'limit': 10,
        //     'callback': 'jQuery37003246569207017129_1689081562385&_=1689081562387'
        // }), { mode: 'no-cors' })

        this.wikiObject = list
    }
}

export const inputValue = new ValueInput()


class LoadData {
    starWars = []
    error = false
    loader = false
    alreadyLoad = false
    currentPlanet = []

    constructor() {
        makeAutoObservable(this);
    }

    addData(newValue) {
        this.starWars = [...this.starWars, newValue]
        this.alreadyLoad = true
    }

    async loadPlanets() {
        try {
            this.loader = true
            const response = await fetch('https://swapi.dev/api/planets')
            let planets = await response.json()
            this.starWars = planets.results
        }
        catch (err) {
            this.error = true
        }
        finally {
            this.loader = false
        }
    }

    loadCurrentPlanet(newId) {
        this.currentPlanet = this.starWars.find((el, index) => Number(index) === Number(newId))
    }

    updateData(newValue) {
        this.starWars.forEach((el, index) => {
            if (Number(index) === Number(newValue.id)) {
                el.name = newValue.name
                el.climate = newValue.climate
                el.diameter = newValue.diameter
                el.gravity = newValue.gravity
                el.population = newValue.population
                el.terrain = newValue.terrain
            }
        })
        this.alreadyLoad = true
    }
}

export const loadData = new LoadData()


class Todos {
    todos = []

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(newValue) {
        this.todos = [...this.todos, newValue]
        this.todos.sort((a, b) => a.done - b.done);
    }

    removeTodo(key) {
        this.todos.splice(key, 1)
    }

    doneTodo(key) {
        this.todos.forEach((el, index) => {
            if (Number(index) === Number(key)) {
                el.done ? el.done = false : el.done = true
            }
        })
        this.todos.sort((a, b) => a.done - b.done);
    }

    removeLast() {
        this.todos.pop()
    }
    removeFirst() {
        this.todos.shift()
    }
}

export const todo = new Todos()
