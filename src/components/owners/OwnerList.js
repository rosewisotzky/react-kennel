import React, { Component } from 'react';

export default class ownerList extends Component {
    render() {
        return (
            <section className="content">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {owner.name}: {owner.breed}
                            <button
                                onClick={() => this.props.deleteOwner(owner.id)}
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