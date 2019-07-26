import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import Loader from 'react-loader-spinner'

export default class postAtelier extends Component {



    constructor(props) {
        super(props);

        this.state = {
            titre: '',
            description: "",
            date: "",
            heureDebut:"",
            duree:"",
            placeDispo:"",
            prix:"", 
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


    handleUploadImage(ev) {
        ev.preventDefault();
        this.setState({loading:true})

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('titre', this.state.titre);
        data.append('description', this.state.description)
        data.append('date', this.state.date )
        data.append('heureDebut', this.state.heureDebut)
        data.append('duree', this.state.duree)
        data.append('placeDispo', this.state.placeDispo)
        data.append('prix', this.state.prix)
        data.append('id_cuisinier', localStorage.getItem('id'))


        axios.post('https://bestoffood.herokuapp.com/postAtelier', data, this.setAuthToken(localStorage.getItem('token')))
            .then(result => {
                console.log("result", result);
                if(result.data=="not ok"){
                    this.setState({loading:false})
                    document.getElementById("non").innerHTML="non reussi"
                    document.getElementById("reussi").innerHTML=""
                }else{
                    this.setState({loading:false})
                    document.getElementById("reussi").innerHTML="reussi"
                    document.getElementById("non").innerHTML=""
                }
                
            }
            )
            .catch(result => {
                this.setState({loading:false})
                document.getElementById("non").innerHTML="non reussi"
                document.getElementById("reussi").innerHTML=""
                console.log("erreur", result);

            });

    }



    // renderRedirect = () => {
    //     if (localStorage.getItem('token')) {
    //         return <Redirect to='/Dashboard' />
    //     }
    // }
    componentDidMount(){
        if (!localStorage.getItem('token')) {
            console.log("coucou");
            
            this.props.history.push("/")
        }
    }




    render() {
        return (
            <div>

                <div id="login">
                    <h3 class="text-center text-white pt-5">Login form</h3>
                    <div class="container">
                        <div id="login-row" class="row justify-content-center align-items-center">
                            <div id="login-column" class="col-md-6">
                                <div id="login-box" class="col-md-12">
                                    <form id="login-form" class="form" action="" method="post">
                                        <h3 class="text-center text-info">Produit</h3>
                                        <div class="form-group">
                                            <label for="username" class="text-info">Titre:</label><br />
                                            <input type="text" name="titre" value={this.state.titre} onChange={this.change} id="titre" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="password" class="text-info">Description:</label><br />
                                            <textarea type="text" name="description" value={this.state.description} onChange={this.change} id="Description" class="form-control" />
                                        </div>

                                        <div class="form-group">
                                            <label for="password" class="text-info">date:</label><br />
                                            <input type="date" name="date" value={this.state.date} onChange={this.change} id="date" class="form-control" />
                                        </div>



                                        <div class="form-group">
                                            <label for="password" class="text-info">heureDebut:</label><br />
                                            <input type="text" name="heureDebut" value={this.state.heureDebut} onChange={this.change} id="heureDebut" class="form-control" />
                                        </div>


                                        <div class="form-group">
                                            <label for="password" class="text-info">duree:</label><br />
                                            <input type="text" name="duree" value={this.state.duree} onChange={this.change} id="duree" class="form-control" />
                                        </div>



                                        <div class="form-group">
                                            <label for="password" class="text-info">placeDispo:</label><br />
                                            <input type="text" name="placeDispo" value={this.state.placeDispo} onChange={this.change} id="placeDispo" class="form-control" />
                                        </div>



                                        <div class="form-group">
                                            <label for="password" class="text-info">Prix:</label><br />
                                            <input type="text" name="prix" value={this.state.prix} onChange={this.change} id="Prix" class="form-control" />
                                        </div>

                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                            </div>
                                            <div class="custom-file">

                                                <input

                                                    class="custom-file-input" id="inputGroupFile01"
                                                    aria-describedby="inputGroupFileAddon01"
                                                    ref={(ref) => { this.uploadInput = ref; }} type="file" class="form-control" id="inputCity" />
                                                {/* <label class="custom-file-label" for="inputGroupFile01">Choose file</label> */}
                                            </div>
                                        </div>
                                       

                                        




                                        <div class="form-group">

                                            <input type="submit" name="submit" class="btn btn-info btn-md" value="submit"
                                                onClick={
                                                    this.handleUploadImage.bind(this)} />


                                        </div>
                                        <div id="reussi" style={{color:"#f3671f",fontSize:"2em"}}></div>
                                        <div id="non" style={{color:"#f3671f",fontSize:"2em"}}></div>
                                        {this.state.loading?                                <Loader 
                                    type="Puff"
                                    color="#00BFFF"
                                    height="100"	
                                    width="100"
                                />   :""}

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="page-footer font-small black" style={{backgroundColor:"#d05c62"}}>

  
<div class="footer-copyright text-center py-3">© 2018 Copyright:
    <a href="https://mdbootstrap.com/education/bootstrap/" style={{color:"black"}}> RijaPrincy</a>
</div>


</footer>
            </div>
        )
    }
}

