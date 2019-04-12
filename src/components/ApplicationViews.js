import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animals/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owners/OwnerList'
import './Kennel.css'

export default class ApplicationViews extends Component {

state = {
    employees: [],
    locations: [],
    animals: [],
    owners: []
}
componentDidMount() {
    const newState = {}

    fetch("http://localhost:5002/animals")
        .then(r => r.json())
        .then(animals => newState.animals = animals)
        .then(() => fetch("http://localhost:5002/employees")
        .then(r => r.json()))
        .then(employees => newState.employees = employees)
        .then(() => fetch("http://localhost:5002/locations")
        .then(r => r.json()))
        .then(locations => newState.locations = locations)
        .then(() => fetch ("http://localhost:5002/owners")
        .then(r => r.json()))
        .then(owners => newState.owners = owners)
        .then(() => this.setState(newState))
}
render() {
    // Inside of our render component we are ROUTING! 
    return (
        // We are using React.Fragment to create an invisible wrapper around our navbar.
        <React.Fragment> 
            {/* Route looks for the EXACT path / otherwise no matter which button you click, it'll load locations. */}
            <Route exact path="/" render={(props) => {
                return <LocationList locations={this.state.locations} />
            }} />
            {/* Here we can specify /animals because we've already routed to our first component. */}
            <Route path="/animals" render={(props) => {
                return <AnimalList animals={this.state.animals} />
            }} />
            <Route path="/employees" render={(props) => {
                // This says that 
                return <EmployeeList employees={this.state.employees} />
            }} />
            <Route path="/owners" render={(props) => {
                return <OwnerList owners={this.state.owners} />
            }} />
        </React.Fragment>
    )
}
}