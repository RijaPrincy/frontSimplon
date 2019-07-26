import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Acceuil from "./atelierCuisinier"
import Modification from "./modification"
import PostAtelier from "./posteAtelier"
import Liste from "./listeAtelier"
import Profil from "./profil"
import { connect } from 'react-redux'

class Particulier extends Component {
    deconnecte() {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        console.log("decone", this.props.connecter);
        const action = { type: "DECONNECTE" }
        this.props.dispatch(action)


    }



    render() {

        return (
            <div>
                <Router>
                    <div>


                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-3 px-1  position-fixed" id="sticky-sidebar" >
                                <img src="./logo.png" alt="" width="100em" />

                               
                                <ul class="navbar-nav ml-auto">
                                <p style={{fontSize:"1.5em",color:"#d05c62"}}>Dashboard</p>
                                                   
                                                    <li class="nav-item active">
                                                        <Link class="nav-link" exact to="/Dashboard" style={{fontSize:"1.5em"}}>Mes ateliers
                                                     <span class="sr-only">(current)</span>
                                                        </Link>
                                                    </li>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/posterAtelier"style={{fontSize:"1.5em"}}> Ajouter atelier</Link>
                                                    </li>
                                                    <li class="nav-item active">
                                                        <Link class="nav-link" exact to="/Profil" style={{fontSize:"1.5em"}}>Profil
                                                     <span class="sr-only">(current)</span>
                                                        </Link>
                                                    </li>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/" style={{fontSize:"1.5em"}} onClick={
                                                            () => {
                                                                this.deconnecte()
                                                            }
                                                        }
                                                        >Se deconnecter</Link>
                                                    </li>
                                                    {/* <li class="nav-item">
                                            <Link class="nav-link" to="/Liste"> Liste</Link>
                                        </li> */}

                                                </ul>

                                </div>
                                <div class="col offset-3" id="main">
                                    
                                    <nav class="navbar navbar-expand-lg  static-top" id="na2" style={{ backgroundColor: "#d05c62", fontSize: "1.5em" }} >
                                        <div class="container">
                                            <a class="navbar-brand" href="#">
                                                {/* <img src="./logo.png" alt="" width="50em" /> */}
                                            </a>
                                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                                <span class="navbar-toggler-icon">|||</span>
                                            </button>
                                            <div class="collapse navbar-collapse" id="navbarResponsive">
                                                <ul class="navbar-nav ml-auto">
                                                   
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/" onClick={
                                                            () => {
                                                                this.deconnecte()
                                                            }
                                                        }
                                                        >Se deconnecter</Link>
                                                    </li>
                                                    {/* <li class="nav-item">
                                            <Link class="nav-link" to="/Liste"> Liste</Link>
                                        </li> */}

                                                </ul>
                                            </div>
                                        </div>

                                    </nav>
                                    <Route path="/Dashboard" exact component={Acceuil}></Route>
                                    <Route path="/posterAtelier" component={PostAtelier}></Route>
                                    <Route path="/Modification" component={Modification}></Route>
                                    <Route path="/Profil" exact component={Profil}></Route>
                                </div>
                            </div>
                        </div>






                    </div>

                </Router>





            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        connecter: state.connecter
    }
}
export default connect(mapStateToProps)(Particulier)



