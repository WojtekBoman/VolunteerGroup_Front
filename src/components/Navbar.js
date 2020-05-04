import React from 'react';
import ReactDOM from 'react-dom'
import AuthService from "../services/auth-service";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            currentUser: undefined,
            showPrzewodniczacyBoard: false,
            showPracownikBoard: false
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if(user) {

          console.log(user);
            this.setState({
                currentUser: AuthService.getCurrentUser(),
                showWolontariuszBoard: user.roles.includes("ROLE_WOLONTARIUSZ"),
                showPrzewodniczacyBoard: user.roles.includes("ROLE_PRZEWODNICZACY"),
                showPracownikBoard: user.roles.includes("ROLE_PRACOWNIK")
            })
        }
    }

    logout(){
        AuthService.logout();
    }

    render(){

        const { currentUser,showWolontariuszBoard, showPracownikBoard, showPrzewodniczacyBoard } = this.state;
        console.log(showWolontariuszBoard)
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
            
                <Link to="/" className="navbar-brand">
                <h3>Psi Patrol</h3>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
           
                <div class="collapse navbar-collapse" id="navbarNavDropdown">

            {/* {/* {showPrzewodniczacyBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Przewo Board
                  </Link>
                </li>
              )} */}

              {showWolontariuszBoard && (
                <div className="navbar-nav">
                  <Link to={"/wiadomosci"} className="nav-link">
                  <li className="nav-item">
                    Wiadomości
                    </li>
                  </Link>
                  <Link to={"/wydarzenia"} className="nav-link">
                  <li className="nav-item">
                    Wydarzenia
                    </li>
                  </Link>
                  </div>
              )} 

              {showPrzewodniczacyBoard && (
                <div className="navbar-nav">
                  {/* <Link to={"/prz"} className="nav-link">
                  <li className="nav-item">
                    Ekran przewodniczącego
                    </li>
                  </Link> */}
                  <li class="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Wydarzenia</a>
                  <div class="dropdown-menu">
                        <Link to={"/wydarzenia"} className="dropdown-item">Przeglądaj</Link>
                        <Link to={"/noweWydarzenie"} className="dropdown-item">Dodaj</Link>
                    </div>
                  </li>
                  </div>
              )}  

              {showPracownikBoard && (
                  <Link to={"/pra"} className="nav-link">
                  <li className="nav-item">
                    Ekran pracownika
                    </li>
                  </Link>
              )}  


{/* 
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )} */}
           

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                  <Link to={"/profile"} className="nav-link">
                  <li className="nav-item">
                    {currentUser.email}
                    </li>
                  </Link>
                    <li class="nav-item" onClick={this.logout}>
                        <a class="nav-link" href="/VolunteerGroup_Front/logowanie">Wyloguj</a>
                    </li>
              </div>
            ) : (
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
    
                    <Link to="/logowanie">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Logowanie</a>
                    </li>
                    </Link>
                    <Link to="/rejestracja"> 
                    <li class="nav-item">
                        <a class="nav-link" href="#">Rejestracja</a>
                    </li>
                    </Link>
                </ul>
            </div>

            )}
            </div>
        </nav>
        )
    }
    
}


export default Navbar;