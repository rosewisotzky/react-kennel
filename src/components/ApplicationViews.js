import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animals/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owners/OwnerList'
import './Kennel.css'

export default class ApplicationViews extends Component {
employeesFromAPI = [
    { id: 1, name: "Jessica Younker" },
    { id: 2, name: "Jordan Nelson" },
    { id: 3, name: "Zoe LeBlanc" },
    { id: 4, name: "Blaise Roberts" }
]

// This will eventually get pulled from the API
locationsFromAPI = [
    { id: 1, name: "Nashville North", address: "500 Circle Way" },
    { id: 2, name: "Nashville South", address: "10101 Binary Court" }
]

animalsFromAPI = [
    { id: 1, name: "Rose", breed: "Border Collie"},
    { id: 2, name: "Rose", breed: "Pug"},
    { id: 3, name: "Rose", breed: "Akita"},
    { id: 4, name: "Rose", breed: "Chihuahua"},
    { id: 5, name: "Rose", breed: "Great Dane"}

]

ownersFromAPI = [
    {id: 1, name: "Pierre", phone: "1-800-DOGDAD"},
    {id: 2, name: "Virgile", phone: "1-800-DOGFAN"},
    {id: 3, name: "Brigitte", phone: "1-800-PARROTLUVR"},
    {id: 4, name: "Asa", phone: "1-800-ALLERGIES"}
]
state = {
    employees: this.employeesFromAPI,
    locations: this.locationsFromAPI,
    animals: this.animalsFromAPI,
    owners: this.ownersFromAPI
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