import React, { Component } from 'react';

export default class LocationList extends Component {
    render() {
        return (
            <section className="content">
            {
                this.props.locations.map(location =>
                    <div key={location.id}>
                    <p> {location.name} </p>
                    <p> {location.address} </p>
                    </div>
                )
            }
            </section>
        )
    }
}