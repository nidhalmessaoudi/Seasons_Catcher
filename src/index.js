import React from "react";
import ReactDom from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

// const App = () => {
//     window.navigator.geolocation.getCurrentPosition(
//         position => {
//             console.log(position);
//         }, 
//         err => {
//             console.log(err);
//         }
//     );

//     return <div>Hi there!</div>
// }

class App extends React.Component {
    state = {lat: null, errorMessage: ""};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude}),
            err => this.setState({errorMessage: err.message})
        );
    }

    renderContent () {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }
        if (this.state.lat && !this.state.errorMessage) {
            return <SeasonDisplay lat={this.state.lat}/>
        }
        return <Spinner message="Please accept the location request"/>
    }

    render () {
        return <div>{this.renderContent()}</div> 
    }
}

ReactDom.render(<App/>, document.querySelector("#root"));