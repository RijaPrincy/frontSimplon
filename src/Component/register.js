import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import Zoom from 'react-reveal/Zoom';
class register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            passWord: "",
            redirect: "",
            nom: "",
            Specialite: '',
            prenom: '',
            loading:false

        }
        this.change = this.change.bind(this)

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
        this.setState({loading:true})
        axios.post('https://bestoffood.herokuapp.com/register', e)
            .then(result => {
                if (result.data == "manque donne") {
                    this.setState({loading:false})
                    console.log("erreur",result.data)
                    document.getElementById("erreur").innerHTML="Manque de donnée"
                }else if(result.data == "Ce mail est deja utilise"){
                    this.setState({loading:false})
                    console.log("erreur",result.data)
                    document.getElementById("erreur").innerHTML="Ce mail est déja utilisé"
                }
                else{
                    this.setState({loading:false})
                    console.log("result else", result.data.e._id);
                    var token = result.data.token
                    localStorage.setItem('token', token)
                    localStorage.setItem('id', result.data.e._id)
                    this.redirect()
                    this._etatConnexion(localStorage.getItem('token'))
                }


            }
            )
            .catch(result => {
                this.setState({loading:false})
                console.log("erreur", result);

            });
    }



    componentDidMount() {
        this.renderRedirect1()
    }


    renderRedirect1 = () => {
        if (localStorage.getItem('token')) {
            this.props.history.push("/")
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


    _etatConnexion(e) {
        const action = { type: "CONNECTER", value: e }
        this.props.dispatch(action)
    }


    render() {
        return (

            <div class="haha">
                {this.renderRedirect()}
                <Zoom id="login">
                    <h3 class="text-center text-white pt-5"></h3>
                    <div class="container">
                        <div id="login-row" class="row justify-content-center align-items-center">
                            <div id="login-column" class="col-md-6">
                                <div id="login-box" class="col-md-12">
                                    <form id="login-form" class="form" action="" method="post">
                                        <h3 class="text-center text-info">Enregistrement</h3>
                                        <div class="form-group">
                                            <label for="username" class="text-info">Nom:</label><br />
                                            <input type="text" required name="nom" value={this.state.nom} onChange={this.change} id="username" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="username" class="text-info">Prenom:</label><br />
                                            <input type="text" name="prenom" value={this.state.prenom} onChange={this.change} id="username" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="username" class="text-info">Email:</label><br />
                                            <input type="email" name="email" value={this.state.email} onChange={this.change} id="name" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="username" class="text-info">Specialite:</label><br />
                                            <input type="text" name="Specialite" value={this.state.Specialite} onChange={this.change} id="name" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="password" class="text-info">Password:</label><br />
                                            <input type="password" name="passWord" value={this.state.passWord} onChange={this.change} id="password" class="form-control" />
                                        </div>
                                        <div class="form-group">

                                            <input type="submit" name="Enregistrer" class="btn btn-info btn-md" value="Enregistrer"
                                                onClick={
                                                    (e) => {
                                                        e.preventDefault()
                                                        this.login({
                                                            email: this.state.email,
                                                            passWord: this.state.passWord,
                                                            nom: this.state.nom,
                                                            prenom: this.state.prenom,
                                                            Specialite: this.state.Specialite
                                                        })
                                                    }
                                                } />
                                        </div>
                                        <div id="register-link" class="text-right">

                                        </div>
                                    </form>
                                    <div id="erreur" style={{color:"#f3671f",fontSize:"2em"}}></div>
                                    {this.state.loading?                                <Loader 
                                    type="ThreeDots"
                                    color="#f3671f"
                                    height="100"	
                                    width="100"
                                />   :""}
                                </div>
                            </div>
                        </div>
                    </div>
                </Zoom>
            </div>



        )
    }
}


const mapStateToProps = (state) => {
    return {
        connecter: state.connecter
    }
}
export default connect(mapStateToProps)(register)