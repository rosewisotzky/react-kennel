import React, { Component } from 'react'
import EmployeeList from "./employee/EmployeeList"
import LocationList from "./locations/LocationList"
import AnimalList from "./animals/AnimalList"



export default class Kennel extends Component {

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

    state = {
        employees: this.employeesFromAPI,
        locations: this.locationsFromAPI,
        animals: this.animalsFromAPI
    }

    render() {
        return (
            <div>
                <h3>Student Kennels</h3>
                <EmployeeList employees={this.state.employees} />
                <LocationList locations={this.state.locations} />
                <AnimalList animals={this.state.animals} />
            </div>
        );
    }
}