import React, { Component } from 'react';
import './signup.css';
import axios from "axios";
import LinkVerification from './linkVerification'
import { Link } from 'react-router-dom';

class Signup extends Component {
   state={
       
        userNameError :null,
        nameError : null,
        emailError : null,
        numError:null,
        passwordError:null,
        confirmPasswordError:null,

        userName:null,
        name:null,
        email:null,
        number:null,
        password:null,
        gender:null,
        dateOfBirth:null

    }
    verifyUserName(e){
        var userName = e.target.value;
        if(userName.match(/^[a-zA-Z0-9]{6,15}$/)){
        this.setState({userNameError : null,userName});
        var url = 'http://localhost:8080/rest/api/users/uniqueUserName';
        axios.post(url,{userName:userName}).then(response => {
        if(response.data==='notunique'){
            this.setState({userNameError : "Username already exists"});
        }
         });

    }
    else{
        this.setState({userNameError : "Username should be alphanumeric of length 6 to 15"});

    }
}
verifyName(e){
        var uName = e.target.value;
        if(uName.match(/^[a-zA-Z ]+$/)){
        this.setState({nameError : null,name : uName});
    }
    else{
        this.setState({nameError : "Name should contain only letters"});
    }
}
verifyEmail(e){
        var email = e.target.value;
        if(email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
        this.setState({emailError : null,email});
        var url = 'http://localhost:8080/rest/api/users/uniqueEmail';
        axios.post(url,{email:email}).then(response => {
        if(response.data==='notunique'){
            this.setState({emailError : "Email already exists"});
        }
         });
    }
    else{
        this.setState({emailError : "Please enter valid email"});
    }
}
verifyNumber(e){
        var number = e.target.value;
        if(number.match(/^[9/8/7/6][0-9]{9}$/)){
        this.setState({numError : null,number});
    }
    else{
        this.setState({numError : "Please enter valid phone number of 10 digits"});
    }
}

verifyPassword(e){
        var password = e.target.value;
        if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)){
        this.setState({passwordError : null,password});
    }
    else{
        this.setState({password,passwordError : "Password should contain atleast a capital letter,a small letter and a number of length 8-15 "});
    }
}

verifyConfirmPassword(e){
        var confirmPassword = e.target.value;
        if(confirmPassword === this.state.password){
        this.setState({confirmPasswordError : null});
    }
    else{
        this.setState({confirmPasswordError : "Passwords should match "});
    }
}
submitUserDetails(){
      
    var a = this.state
    if(a.userNameError != null||a.nameError != null||a.emailError != null
    ||a.numError != null||a.passwordError != null||a.confirmPasswordError != null ){
        alert("Please fill all the fields correctly and Submit")
    }
    else{

        var userFormData = {
             userName: a.userName,
        name: a.name,
        email: a.email,
        mobile: a.number,
        gender: document.getElementsByName("gender").value,
        dateOfBirth: document.getElementById("dob").value,
        password : a.password
        }
        var url = 'http://localhost:8080/rest/api/users/add';
    axios.post(url,userFormData).then(response => {
      console.log(response.data);
         var myval = response.data;
       var mywindow = window.open('/LinkVerification/'+myval[0].userName+"/"+myval[0].verificationCode,'_blank',"height=500,width=1000");
     
      console.log(myval[0].userName);
        window.open('/Login','_self');
    });
   

    }
}
  render() {
    return (
      <div className="Signup">
     <div className="bg-img">
         <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><img src="https://2016.export.gov/Pennsylvania/build/groups/public/@eg_us_nc/documents/webcontent/eg_us_nc_077246.jpg"
                alt="Dispute Bills" /></a>               
            </div>
             <ul className="nav navbar-nav navbar-right">
            <li><Link to={'/'}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
            <li><Link to={'/login'}><span className="glyphicon glyphicon-user"></span> Login</Link></li>

          </ul>
          </div>      
        </nav>
  <div className="containerCSS">
        
    <form >
      <h1>Sign Up</h1>
      <div>
      <label className="control-label">User Name :</label>
      <input onChange={this.verifyUserName.bind(this)}  className="form-control" type="text" name="userName" required/>
      <div className="errorMessage">{this.state.userNameError}</div>
     </div>

     <div>
      <label className="control-label">Name :</label>
      <input className="form-control" onChange={this.verifyName.bind(this)}  type="text" name="name" required/>
      <div className="errorMessage">{this.state.nameError}</div>
     </div>

     <div>
      <label className="control-label"> Email : </label>
      <input className="form-control" onChange={this.verifyEmail.bind(this)} type="text" name="email" required/>
      <div className="errorMessage">{this.state.emailError}</div>
        </div>
      <div>
      <label className="control-label">Phone Number : </label>
      <input className="form-control" onChange={this.verifyNumber.bind(this)} type="number" name="number" required />
      
      <div className="errorMessage">{this.state.numError}</div>
      </div>
        
        <label className="control-label">Password : </label>
        <input className="form-control" onChange={this.verifyPassword.bind(this)} type="password" name="password"  required/>
        <div className="errorMessage">{this.state.passwordError}</div>
     

        <label className="control-label">Confirm Password : </label>
        <input className="form-control"  onChange={this.verifyConfirmPassword.bind(this)} type="password" name="confirmPassword"  required/>
       <div className="errorMessage">{this.state.confirmPasswordError}</div>

      <label className="control-label">Date Of Birth : </label>
      <input className="form-control"  type="date" name="dob"  id="dob" required/>      

      <label className="control-label">Gender : </label>
        
        <input type="radio" name="gender" value="Male"  required/> Male
        <input  type="radio" name="gender" value="Female"  required/> Female
  

     
      <br/>
      <div>
        <input className="btn btn-success" type="button" value="Sign Up" onClick={this.submitUserDetails.bind(this)} />

      </div>

    </form>
  </div>
</div>
      </div>
    );
  }
}

export default Signup;
