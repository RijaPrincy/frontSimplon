import React, { Component } from 'react'
import axios from 'axios'

export default class profil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profil: '',
           

        }
       

    }
    componentDidMount(){
        axios.get("https://bestoffood.herokuapp.com/profil/"+localStorage.getItem("id"))
        .then(res=>{
            console.log(res.data);
            
            this.setState({
                profil:res.data
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
                
            </div>
        )
    }
}
