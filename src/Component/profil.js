import React, { Component } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'

export default class profil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profil: '',
            loading:true
           

        }
       

    }
    componentDidMount(){
        axios.get("https://bestoffood.herokuapp.com/profil/"+localStorage.getItem("id"))
        .then(res=>{
            console.log(res.data);
            
            this.setState({
                profil:res.data,loading:false
            })
        }).catch(err=>{
            console.log(err);
            
        })
    }
    render() {
        return (
            <div>
                <div>Nom :{this.state.profil.nom}</div>
                <div>Prénom :{this.state.profil.prenom}</div>
                <div>Email :{this.state.profil.email}</div>
                <div>Specialité :{this.state.profil.specialite}</div>
                {this.state.loading?                                <Loader 
                                    type="Puff"
                                    color="#00BFFF"
                                    height="100"	
                                    width="100"
                                />   :""}
                
            </div>
        )
    }
}
