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
                <center> <div><strong>Nom</strong> :{this.state.profil.nom}</div>
                <div><strong>Prénom</strong> :{this.state.profil.prenom}</div>
                <div><strong>Email</strong> :{this.state.profil.email}</div>
                <div><strong>Specialité</strong> :{this.state.profil.specialite}</div>
                {this.state.loading?                                <Loader 
                                    type="ThreeDots"
                                    color="#f3671f"
                                    height="100"	
                                    width="100"
                                />   :""}</center>
               
                
            </div>
        )
    }
}
