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
import EmployeeDetail from './employee/EmployeeDetail'
import OwnerDetail from './owners/OwnerDetail'



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
    .then(animals => {
        this.props.history.push("/animals")
        this.setState({
        animals: animals        
    })
})
    
}
deleteEmployee = id => {
    return fetch(`http://localhost:5002/employees/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/employees`))
    .then(e => e.json())
    .then(employees => {
        this.props.history.push("/employees")
        this.setState({
        employees: employees
    })
})
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
deleteLocation = id => {
    return fetch(`http://localhost:5002/locations/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/locations`))
    .then(e => e.json())
    .then(locations => this.setState({
        locations: locations
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
            <Route exact path="/employees" render={(props) => {
                // This says that 
                return <EmployeeList return deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
            }} />
            <Route exact path="/owners" render={(props) => {
                return <OwnerList deleteOwner={this.deleteOwner} owners={this.state.owners} />
            }} />
            <Route path="/owners/:ownerId(\d+)" render={(props) => {
                let owner = this.state.owners.find(owner =>
                    owner.id === parseInt(props.match.params.ownerId))
                    if (!owner) {
                        owner = {id: 404, name:"404"}
                    }
                    return <OwnerDetail owner={ owner }
                        deleteOwner= { this.deleteOwner } />
            }}/>
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
            <Route path="/employees/:employeeId(\d+)" render={(props) => {
            // Find the employee with the id of the route parameter
            let employee = this.state.employees.find(employee =>
                employee.id === parseInt(props.match.params.employeeId)
            )

            // If the employee wasn't found, create a default one
            if (!employee) {
                employee = {id:404, name:"404", breed: "Employee not found"}
            }

            return <EmployeeDetail employee={ employee }
                        deleteEmployee={ this.deleteEmployee } />
        }} />
        </React.Fragment>
    )
}
}
export default withRouter(ApplicationViews)
