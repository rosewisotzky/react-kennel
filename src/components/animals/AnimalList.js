import React, { Component } from 'react'

export default class AnimalList extends Component {
    render () {
        return (
            <section className="animals"> 
            {
                this.props.animals.map(animal =>
                    <div key={animal.id}>
                    <h1> {animal.name}</h1> 
                    <p>{animal.breed}</p>
                    </div>
                    )
            }
            </section>
        )
    }

    
}