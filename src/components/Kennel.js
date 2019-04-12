import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
// Our Kennel component's purpose is to render our JSX which is creating a React.Fragment, rendering our nav bar and application views which we are importing. We can go check out those files to see what exactly we're telling Kennel to do here.
class Kennel extends Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

export default Kennel