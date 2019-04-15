import React, { Component } from 'react';

export default class ownerList extends Component {
    render() {
        return (
            <section className="content">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id}>
                    <p> {owner.name} </p>
                    <p> {owner.phone} </p>
                    </div>
                )
            }
            </section>
        )
    }
}