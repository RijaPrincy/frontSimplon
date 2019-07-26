import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav1 from "./navbar"
import Nav2 from "./navbar2"

class pointEnter extends Component {

    componentDidMount() {
        console.log("avant", this.props.connecter);
        this._etatConnexion(localStorage.getItem("token"))
        console.log("apres", this.props);

    }
    _etatConnexion(e) {
        const action = { type: "CONNECTER", value: e }
        this.props.dispatch(action)
    }
    render() {
        return (
            <div>
                {!this.props.connecter ? <div>
                    <Nav1 />
                </div> : <div>
                        <Nav2 />
                    </div>}
               
                

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        connecter: state.connecter
    }
}
export default connect(mapStateToProps)(pointEnter)
