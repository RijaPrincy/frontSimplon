import React, { Component } from 'react'
import axios from 'axios'
import { MDBContainer,MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView, MDBBtn } from "mdbreact";

import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

class listeAtelier extends Component {


    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            atelier: "",
            loading:true
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }
    componentDidMount() { 
        this.getAtelier()
    }

    getAtelier() {
        axios.get("https://bestoffood.herokuapp.com/getAtelier")
            .then(resp => {
                this.setState({ atelier: resp.data,loading:false })

                console.log(resp);

            }).catch(err => {
                console.log(err);

            })
    }
    inscr(e) {
        
        const action = { type: "idAt", value: e }
        this.props.dispatch(action)
        this.props.history.push("/inscription")
    }

   
       
    
    render() {
        
        const container = { height: 1300 }
        return (
            <div>
               <div id="demo" class="carousel slide" data-ride="carousel">


                    <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>


                    <div class="carousel-inner">
                    <div class="carousel-item">
                           
                            <img src="./test1.jpg" alt="New York" style={{ width: "100%" }} />
                        </div>
                        <div class="carousel-item active">
                           
                            <img src="./test2.jpg" alt="cuis1" style={{ width: "100%" }} />
                        </div>

                        
                        <div class="carousel-item">
                           
                            <img src="./test3.jpg" alt="Chicago" style={{ width: "100%" }} />
                            
                        </div>
                        
                    </div>


                        <a class="carousel-control-prev" href="#demo" data-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </a>
                        <a class="carousel-control-next" href="#demo" data-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </a>

                        </div>
                <MDBContainer  className="text-center mt-5 pt-5">
                  
                    <MDBCard className="my-5 px-5 pb-5">
                   
                      
                        <MDBCardBody>
                            <p> <strong>Qui nous sommes</strong> : Nous sommes un centre de formation de cuisine qui propose des ateliers à nos élèves à
                            partir de 12 ans, mais aussi à des particuliers.
                            Les cours proposés aux particuliers permettent de financer l’achat de matériels et de
                            matières premières.</p>
                            <p> <strong>Notre objectif</strong> : Une application web qui permette à des particuliers de s’inscrire aux ateliers
                            que nous proposons.</p>
                            <p> <strong>Nos cibles</strong> : Nos cibles sont les jeunes actifs entre 25 - 35 ans. Des personnes qui veulent apprendre à
                                cuisiner afin de manger correctement.</p>
                            <h2 className="h1-responsive font-weight-bold text-center my-5" style={{color:"#d05c62 ", fontFamily:"Verdana !important"}}>
                            Liste des ateliers
                             </h2>
                            <h2 className="text-center w-responsive mx-auto mb-5" style={{fontFamily:"Verdana !important"}}>

                            Liste de tous les ateliers ou vous pouvez vous inscrire
                             </h2>
                             {this.state.loading?                                <Loader 
                                    type="Puff"
                                    color="#00BFFF"
                                    height="100"	
                                    width="100"
                                />   :""}



                            {this.state.atelier.length > 0 ? this.state.atelier.map((ate, index) => {
                                var d= "https://bestoffood.herokuapp.com/image/"+ate.image
                                var count=parseInt(ate.placeDispo)
                                var reserv=parseInt(ate.placeReserve)

                                return <div>
                                     {ate.visibilite?<div>
                                        <MDBRow>
                               
                               <MDBCol lg="5">
                                   <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                                       <img
                                           className="img-fluid"
                                           src={d}
                                           alt="image"
                                           width="200em"
                                       />
                                       <h2 href="#!">
                                           
                                         <MDBMask overlay="white-slight" /> 
                                       </h2>
                                   </MDBView>
                               </MDBCol>
                               <MDBCol lg="7">
                                   <a href="#!" className="green-text">
                                       <h3 className="font-weight-bold mb-3" style={{color:"#f3671f"}}>
                                       <strong> 
                                           {ate.titre}
                                           </strong>
                                        </h3>
                                   </a>
                                   <p>
                                       {ate.description}
                                   </p>
                                   <p className="font-weight-bold mb-3 p-0">
                                       Date:{ate.date} |
                                   
                                   Heure du debut:{ate.heureDebut} |
                                   
                                   Durée:{ate.duree} |
                                  
                                   Place :{ate.placeDispo} |
                                   
                                   place Reservé:{ate.placeReserve} |
                                   
                                   Prix:{ate.prix} $ 
                                   </p>
                                   
                                   {count>reserv?<div><MDBBtn color="success" size="md" className="waves-light " onClick={(e)=>{
                                       e.preventDefault()
                                       this.inscr(ate._id)
                                       
                                   }}>
                                       S' inscrire
                                    </MDBBtn></div>:<div style={{color:"#d05c62 "}}>Place complet</div>}
                                   
                               </MDBCol>
                           </MDBRow>
                           <hr className="my-5" />
                                     </div>:""}
                                    
                                </div>


                            }) : ""}


                            


                        </MDBCardBody>
                    </MDBCard>
                    
                   
                </MDBContainer>
                <footer class="page-footer font-small black" style={{backgroundColor:"#d05c62",bottom:0}}>

  
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
        idAtelier: state.idAtelier
    }
}
export default connect(mapStateToProps)(listeAtelier)





{/* <footer class="page-footer font-small blue pt-4">


<div class="container-fluid text-center text-md-left">

  
  <div class="row">

   
    <div class="col-md-6 mt-md-0 mt-3">

     
      <h5 class="text-uppercase">Footer Content</h5>
      <p>Here you can use rows and columns to organize your footer content.</p>

    </div>
   

    <hr class="clearfix w-100 d-md-none pb-3">

    
    <div class="col-md-3 mb-md-0 mb-3">

      
      <h5 class="text-uppercase">Links</h5>

      <ul class="list-unstyled">
        <li>
          <a href="#!">Link 1</a>
        </li>
        <li>
          <a href="#!">Link 2</a>
        </li>
        <li>
          <a href="#!">Link 3</a>
        </li>
        <li>
          <a href="#!">Link 4</a>
        </li>
      </ul>

    </div>
    

   
    <div class="col-md-3 mb-md-0 mb-3">

     
      <h5 class="text-uppercase">Links</h5>

      <ul class="list-unstyled">
        <li>
          <a href="#!">Link 1</a>
        </li>
        <li>
          <a href="#!">Link 2</a>
        </li>
        <li>
          <a href="#!">Link 3</a>
        </li>
        <li>
          <a href="#!">Link 4</a>
        </li>
      </ul>

    </div>
    

  </div>
  

</div>



<div class="footer-copyright text-center py-3">© 2018 Copyright:
  <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
</div>


</footer> */}