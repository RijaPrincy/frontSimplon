import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Inscription from "./inscription"
import Acceuil from "./listeAtelier"
import Login from "./login"
import Register from "./register"

export default class Particulier extends Component {


    render() {

        return (
            <div>
                <Router>
                    <div>
                        <nav class="navbar navbar-expand-lg static-top" style={{ backgroundColor: "#d05c62", color: "white !important", fontSize: "1.5em" }}>
                            <div class="container">
                                <a class="navbar-brand" href="#">
                                    <img src="./logo.png" alt="" width="50em" />
                                </a>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon">|||</span>
                                </button>
                                <div class="collapse navbar-collapse" style={{ color: "black !impotant" }} id="navbarResponsive">
                                    <ul class="navbar-nav ml-auto">
                                        <li class="nav-item active" style={{ color: "black" }}>
                                            <Link class="nav-link" exact to="/"><span style={{color:"white"}}>Acceuil</span>
                                    <span class="sr-only">(current)</span>
                                            </Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link class="nav-link" to="/login"><span style={{color:"white"}}>Se connecter</span></Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </nav>
                       
                        <Route path="/inscription" component={Inscription}></Route>
                        <Route path="/" exact component={Acceuil}></Route>
                        <Route path="/Login" component={Login}></Route>
                        <Route path="/Register" component={Register}></Route>

                    </div>

                </Router>





            </div>
        );
    }
}



