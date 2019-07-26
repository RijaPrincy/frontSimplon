import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from "react-router-dom";

class login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            passWord: "",
            redirect: ""

        }
        this.change = this.change.bind(this)

    }
    componentDidMount() {
        this.renderRedirect1()
    }


    renderRedirect1 = () => {
        if (localStorage.getItem('token')) {
            this.props.history.push("/Dashboard")
            // return <Redirect to='/Dashboard' />
        }
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            // return <Redirect to='/Dashboard' />
            this.props.history.push("/Dashboard")
        }
    }
    redirect() {
        console.log("hahah");

        this.setState({
            redirect: true
        })

    }



    setAuthToken(token) {
        if (token) {
            console.log("if token");

            var t = "bearer " + token
            console.log(t);

            axios.defaults.headers.common['authorization'] = t
        } else {
            console.log("else token");
            delete axios.defaults.headers.common['authorization'];


        }
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    login = (e) => {
        axios.post('https://bestoffood.herokuapp.com/login', e)
            .then(result => {
                if (result.data == "not ok") {
                    console.log("erreur mdp");
                    document.getElementById("err").innerHTML = "Erreur mot de passe ou email"
                } else {
                    console.log("result", result.data);
                    var token = result.data.token
                    localStorage.setItem('token', token)
                    localStorage.setItem('id', result.data.note0._id)
                    this.redirect()
                    this._etatConnexion(localStorage.getItem('token'))
                }


            }
            )
            .catch(result => {
                console.log("erreur", result);
                document.getElementById("err").innerHTML = "Erreur mot de passe ou email"

            });
    }



    _etatConnexion(e) {
        const action = { type: "CONNECTER", value: e }
        this.props.dispatch(action)
    }



    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div >
                    <div id="login" style={{height:800}}>
                        <h3 class="text-center text-white pt-5">Se connecter</h3>
                        <div class="container">
                            <div id="login-row" class="row justify-content-center align-items-center">
                                <div id="login-column" class="col-md-6">
                                    <div id="login-box" class="col-md-12">
                                        <form id="login-form" class="form" action="" method="post">
                                            <h3 class="text-center text-info">Se connecter en tant que cuisinier</h3>
                                            <div class="form-group">
                                                <label for="username" class="text-info">Nom:</label><br />
                                                <input type="text" name="email" value={this.state.email} onChange={this.change} id="username" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label for="password" class="text-info">Mot de passe:</label><br />
                                                <input type="password" name="passWord" value={this.state.passWord} onChange={this.change} id="password" class="form-control" />
                                            </div>
                                            <div class="form-group">

                                                <input type="submit" name="Se connecter" class="btn btn-info btn-md" value="submit"
                                                    onClick={
                                                        (e) => {
                                                            e.preventDefault()
                                                            this.login({
                                                                email: this.state.email,
                                                                passWord: this.state.passWord
                                                            })
                                                        }
                                                    } />
                                            </div>
                                            <div id="err" style={{color:"#f3671f",fontSize:"2em"}}>

                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <footer class="page-footer font-small black" style={{ backgroundColor: "#d05c62", float: "bottom" }}>


                    <div class="footer-copyright text-center py-3">© 2018 Copyright:
                              <a href="https://mdbootstrap.com/education/bootstrap/" style={{ color: "black" }}> RijaPrincy</a>
                    </div>


                </footer>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        connecter: state.connecter
    }
}
export default connect(mapStateToProps)(login)