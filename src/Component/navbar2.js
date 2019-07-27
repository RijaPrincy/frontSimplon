import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Acceuil from "./atelierCuisinier"
import Modification from "./modification"
import PostAtelier from "./posteAtelier"
import Liste from "./listeAtelier"
import Profil from "./profil"
import { connect } from 'react-redux'
import  "./app.css"

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
                            <center>
                                    
                                <div class="col-3  px-1  position-fixed" id="sticky-sidebar" >
                                <img src="./logo.png" alt="" width="100em" />

                               
                                <ul class="navbar-nav ml-auto">
                                <p style={{fontSize:"1.5em",color:"#d05c62"}} id="hhh">Dashboard</p>
                               
                                                   
                                                    <li class="nav-item active">
                                                        <Link class="nav-link" className="btn btn-primary" exact to="/Dashboard" style={{fontSize:"1.5em",marginTop:"20px", color:"white",backgroundColor:"#f3671f",boxShadow: "1px 1px 12px #555",border:"none"}}><i class='fas fa-book'></i>Mes ateliers
                                                     <span class="sr-only">(current)</span>
                                                        </Link>
                                                    </li>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/posterAtelier"className="btn btn-primary" style={{fontSize:"1.5em",marginTop:"20px",heigth:"4px", color:"white",backgroundColor:"#f3671f",boxShadow: "1px 1px 12px #555",border:"none"}}><i class='fas fa-edit'></i> Ajouter atelier</Link>
                                                    </li>
                                                    <li class="nav-item active">
                                                        <Link class="nav-link" exact to="/Profil" className="btn btn-primary" style={{fontSize:"1.5em",marginTop:"20px",heigth:"4px", color:"white",backgroundColor:"#f3671f",boxShadow: "1px 1px 12px #555",border:"none"}}><i class='fas fa-book-reader'></i>Profil
                                                     <span class="sr-only">(current)</span>
                                                        </Link>
                                                    </li>
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/" className="btn btn-primary" style={{fontSize:"1.5em",marginTop:"20px",heigth:"4px", color:"white",backgroundColor:"#f3671f",boxShadow: "1px 1px 12px #555",border:"none"}} onClick={
                                                            () => {
                                                                this.deconnecte()
                                                            }
                                                        }
                                                        ><i class='fas fa-fire'></i>Se deconnecter</Link>
                                                    </li>
                                                    {/* <li class="nav-item">
                                            <Link class="nav-link" to="/Liste"> Liste</Link>
                                        </li> */}

                                                </ul>

                                </div>
                            </center>
                            
                                
                                
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
                                                        ><span style={{color:"white"}}>Se deconnecter<i class='fas fa-fire'></i></span></Link>
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



