import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animals/AnimalList'
import LocationList from './locations/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owners/OwnerList'
import './Kennel.css'
import AnimalManager from '../modules/AnimalManager'
import EmployeeManager from '../modules/EmployeesManager'
import LocationManager from '../modules/LocationsManager'
import OwnerManager from '../modules/OwnersManager'
import AnimalDetail from './animals/AnimalDetail'
import { withRouter } from 'react-router'
import AnimalForm from './animals/AnimalForm'



class ApplicationViews extends Component {

state = {
    employees: [],
    locations: [],
    animals: [],
    owners: []
}
componentDidMount() {
    const newState = {}
// Instead of writing out our fetch calls here, we've created modules located in our conveniently named modules directory. We're using vanilla JavaScript because we want to adhere to the Single Responsibility rule. We also are keeping our React components to components that are responsible for displaying our data on the DOM through changing the state.
    AnimalManager.getAll()
        .then(animals => newState.animals = animals)
        EmployeeManager.getAll()
        .then(employees => newState.employees = employees)
        LocationManager.getAll()
        .then(locations => newState.locations = locations)
        OwnerManager.getAll()
        .then(owners => newState.owners = owners)
        .then(() => this.setState(newState))
}
deleteAnimal = id => {
    return fetch(`http://localhost:5002/animals/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/animals`))
    .then(e => e.json())
    .then(animals => this.setState({
        animals: animals
    })
    )
}
deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/employees`))
    .then(e => e.json())
    .then(employees => this.setState({
        employees: employees
    })
    )
}
deleteOwner = id => {
    return fetch(`http://localhost:5002/owners/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/owners`))
    .then(e => e.json())
    .then(owners => this.setState({
        owners: owners
    })
    )
}
addAnimal = animal =>
    AnimalManager.post(animal)
        .then(() => AnimalManager.getAll())
        .then(animals =>
        this.setState({
            animals: animals
        })
        );
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
            <Route exact path="/animals" render={(props) => {
                return <AnimalList return deleteAnimal={this.deleteAnimal} animals={this.state.animals} {...props}/>
            }} />
            {/* Our shiny new route. We pass employees to the AnimalForm so a dropdown can be populated */}
            <Route path="/animals/new" render={(props) => {
                return <AnimalForm {...props}
                                addAnimal={this.addAnimal}
                                employees={this.state.employees} />
            }} />
            <Route path="/employees" render={(props) => {
                // This says that 
                return <EmployeeList return deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
            }} />
            <Route path="/owners" render={(props) => {
                return <OwnerList return deleteOwner={this.deleteOwner} owners={this.state.owners} />
            }} />
            {/*
                This is a new route to handle a URL with the following pattern:
                    http://localhost:3000/animals/1

                It will not handle the following URL because the `(\d+)`
                matches only numbers after the final slash in the URL
                    http://localhost:3000/animals/jack
            */}
            <Route path="/animals/:animalId(\d+)" render={(props) => {
                // Find the animal with the id of the route parameter
                let animal = this.state.animals.find(animal =>
                    animal.id === parseInt(props.match.params.animalId)
                )

                // If the animal wasn't found, create a default one
                if (!animal) {
                    animal = {id:404, name:"404", breed: "Dog not found"}
                }

                return <AnimalDetail animal={ animal }
                            deleteAnimal={ this.deleteAnimal } />
            }} />
        </React.Fragment>
    )
}
}
export default withRouter(ApplicationViews)
