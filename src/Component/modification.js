import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
class modification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titre: '',
            description: "",
            date: "",
            heureDebut: "",
            duree: "",
            placeDispo: "",
            prix: "",
            image:"", 
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

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('titre', this.state.titre);
        data.append('description', this.state.description)
        data.append('date', this.state.date)
        data.append('heureDebut', this.state.heureDebut)
        data.append('duree', this.state.duree)
        data.append('placeDispo', this.state.placeDispo)
        data.append('prix', this.state.prix)
        data.append('image', this.state.image+"e")

        this.setState({loading:true})
       

        axios.put('https://bestoffood.herokuapp.com/update/'+this.props.modification._id, data, this.setAuthToken(localStorage.getItem('token')))
            .then(result => {
                this.setState({loading:false})
                console.log("result modif",result);
                document.getElementById("reussi").innerHTML="Reussi"
                document.getElementById("non").innerHTML=""
                
            }
               
            )
            .catch(result => {
                this.setState({loading:false})
                document.getElementById("reussi").innerHTML=""
                document.getElementById("non").innerHTML="Il y a une erreur"
                console.log("erreur", result);

            });

    }



    renderRedirect = () => {
        if (localStorage.getItem('token')) {
            return <Redirect to='/' />
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            console.log("coucou");
            
            this.props.history.push("/Dashboard")
        }
        if (!this.props.modification) {
            console.log("coucou");
            
            this.props.history.push("/Dashboard")
        }
        console.log("modif", this.props.modification);
        this.setState({
            titre: this.props.modification.titre,
            description:this.props.modification.description,
            date: this.props.modification.date,
            heureDebut: this.props.modification.heureDebut,
            duree: this.props.modification.duree,
            placeDispo: this.props.modification.placeDispo,
            prix: this.props.modification.prix,
            image: this.props.modification.image

        })

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

const mapStateToProps = (state) => {
    return {
        modification: state.modification
    }
}
export default connect(mapStateToProps)(modification)
