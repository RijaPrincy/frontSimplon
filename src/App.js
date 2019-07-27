import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './Store/store'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PointEnter from "./Component/pointEnter"
import Register from "./Component/register"
import  "./Component/app.css"



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: ""
    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="app" >

        <Provider store={Store}>
          <Router>
            <div>
              <Route path="/" component={PointEnter}></Route>
           
                
            </div>
          </Router>


        </Provider>
      </div>
    )
  }
}
export default App;

