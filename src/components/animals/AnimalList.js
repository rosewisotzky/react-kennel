import React, { Component } from 'react'
import dog from  './DogIcon.svg'
import './animals.css'
import { Link } from "react-router-dom";


export default class AnimalList extends Component {
    render () {
        return (
            <section className="content animals"> 
            {
                this.props.animals.map(animal =>
                    <div key={animal.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <img src={dog} className="icon--dog" alt="dog icon" />
                            {animal.name}: {animal.breed}
                            <Link className="nav-link" to={`/animals/${animal.id}`}>Details</Link>
                            <button
                                onClick={() => this.props.deleteAnimal(animal.id)}
                                className="card-link">Delete</button>
                        </h5>
                    </div>
                </div>
                    )
                    
            }
            </section>
        )
    }

    
}