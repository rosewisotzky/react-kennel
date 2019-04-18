import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class LocationList extends Component {
    render() {
        return (
            <section className="content">
            {
                this.props.locations.map(location =>
                    <div key={location.id}>
                    <p> {location.name} </p>
                    <p> {location.address} </p>
                    <Link className="nav-link" to={`/employees/${location.id}`}>Details</Link>
                    </div>
                )
            }
            </section>
        )
    }
}