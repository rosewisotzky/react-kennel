import React, { Component } from "react"


export default class Owner extends Component {
    state = {
        saveDisabled: false
    }

    render() {
        return (
            <section className="owner">
                <div key={ this.props.owner.id } className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            { this.props.owner.name }
                        </h4>
                        <button onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.deleteOwner(this.props.owner.id)
                                    )
                                }
                            }
                            disabled={ this.state.saveDisabled }
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}
