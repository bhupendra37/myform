	import React, { Component } from 'react';
	import './App.css';
    import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
      
 	let indexSelected=-1;
 
class App extends Component {
 
	 constructor(props) {
		super(props);
		this.state = { 
			first_name:"",
			last_name:"",
			phone:"",
			email:"",
			contacts:[],
 			open:false,
 			firstnameErr:"",
 			lastnameErr:"",
      phoneErr:"",
 			 
     };


		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
 	  this.handleUpdate = this.handleUpdate.bind(this);
	}
	 handleChange(event) {
 		this.setState({[event.target.name]:event.target.value});
		  
	}
	handleUpdate(event) {

		  event.preventDefault();
		let contact={
			'first_name':this.state.firstname,
			'last_name':this.state.lastname,
			'phone':this.state.Phone,
			'email':this.state.Email
		};

	 let obj=[];
	 obj=this.state.contacts;
	 	obj.splice(indexSelected,1,contact);
	 	this.setState({open:false});
	
	}
	valid(){  
           if(!this.state.first_name.match(/^[a-zA-Z ]*$/) || this.state.first_name=="" 
           	&&!this.state.last_name.match(/^[a-zA-Z ]*$/) ||this.state.last_name==""
           	&&!this.state.phone.match(/^[0-9]{10}$/))

          {
	          this.setState({firstnameErr:" invalid firstname",lastnameErr:"invalid lastname",phoneErr:"invalid number"});
          }
          else if(!this.state.first_name.match(/^[a-zA-Z ]*$/)|| this.state.first_name=="") 
          {
          	this.setState({firstnameErr:" invalid firstname"});
          }
            else if(!this.state.last_name.match(/^[a-zA-Z ]*$/)|| this.state.last_name=="") 
          {
          	this.setState({lastnameErr:"invalid lastname"});
          }
          else if(!this.state.phone.match(/^[0-9]{10}$/))
          {
            this.setState({phoneErr:"invalid number or number should be 10 digit"});
          }
          else
          {
          	return true
          }
	}
           	
	handleSubmit(event) {
		event.preventDefault();
		 	if(this.valid())
 		{
		let contact={
			'first_name':this.state.first_name,
			'last_name':this.state.last_name,
			'phone':this.state.phone,
			'email':this.state.email
		};

	 let obj=[];
	 obj=this.state.contacts;
	 	obj.push(contact);

		this.setState({contacts:obj,
						first_name:"",
						last_name:"",
					        email:"",
						    phone:"",
						    firstnameErr:"",
						    lastnameErr:"",
						    phoneErr:""
 		}); 
 		 
 		
 			alert("form submitted")
 		
	}}

	 
        handleDelete(i) {
			  
		let	row=this.state.contacts
		row.splice(i,1);
		this.setState({row:row});
		}
		 handleEdit(i,contact){
		 indexSelected=i;
          this.setState({
             firstname:contact.first_name,
           	  lastname:contact.last_name,
           	     Email:contact.email,
           	     Phone:contact.phone,
           	    

           });
          
                  
	}


  onOpenModal = () => {
    this.setState({ open: true });
  }
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
 
	
	render(){
			const { contacts } = this.state;
			 const { open } = this.state;

		return (
 			<div  className="container">
			 
			<form onSubmit={this.handleSubmit} >
			
<div className="form-group">
			<label >First Name:</label>
			<input type="text" name="first_name" className="form-control" id="First" value={this.state.first_name}
			onChange={this.handleChange} />
			<p>{this.state.firstnameErr}</p>
 
		</div>
		<div className="form-group">
			<label >Last Name:</label>
			<input type="text"  name="last_name" className="form-control" id="Last" value={this.state.last_name}
			onChange={this.handleChange} />
			<p>{this.state.lastnameErr}</p>
		</div>
		 <div className="form-group">
			<label >Email:</label>
			<input type="email"  name="email" className="form-control" id="email"value={this.state.email}
			onChange={this.handleChange} />
		</div>    
		<div className="form-group">
			<label >phone:</label>
			<input type="tel"  name="phone"  maxLength="10" className="form-control" id="phone"value={this.state.phone}
			onChange={this.handleChange} />
						<p>{this.state.phoneErr}</p>

		</div> 
		<button type="submit" className="btn btn-danger btn-block btn-lg">Submit</button>
		
			</form>
			 
		 
					<table >
					<thead>
					 <tr>
					 <th >fName</th>
					 <th >lname</th>
					 <th >email</th>
					 <th >phone</th>
						<th >action</th>
					 </tr>
					 </thead>
				{contacts.map((contact,i) => 
					 <tbody>
					 <tr>
					 <td> {contact.first_name} </td>
					 <td> {contact.last_name}</td>
					 <td> {contact.email} </td>
					 <td> {contact.phone}</td>
					 <td> <button type="click" onClick={()=>this.handleDelete(i)}  > delete</button>
					 <button onClick={()=>{this.handleEdit(i,contact);this.onOpenModal(); }} >edit</button></td> 
				
              	 </tr>
		</tbody>
					)}
		</table>
	  
        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: 'customModal',}}>
            <form onSubmit={this.handleUpdate} >
			
          <div className="form-group">
			<label >First Name:</label>
			<input type="text" name="firstname" className="form-control" id="First" value={this.state.firstname}
			onChange={this.handleChange} />
		</div>
		<div className="form-group">
			<label >Last Name:</label>
			<input type="text"  name="lastname" className="form-control" id="Last" value={this.state.lastname}
			onChange={this.handleChange} />
		</div>
		 <div className="form-group">
			<label >Email:</label>
			<input type="email"  name="Email" className="form-control" id="email"value={this.state.Email}
			onChange={this.handleChange} />
		</div>    
		<div className="form-group">
			<label >phone:</label>
			<input type="tel"  name="Phone"  maxLength="10" className="form-control" id="phone"value={this.state.Phone}
			onChange={this.handleChange} />
		</div> 
		<button type="submit" className="btn btn-danger btn-block btn-lg">update</button>
		
			</form>
           
        </Modal>
    
	 
     

					 
		 </div>
 		)
	
}
 }  



export default App;
