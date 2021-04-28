import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import axios from 'axios'; // axios import
import { without } from 'lodash';
import Alert from './Alert';


class App extends Component {

  state = {
    myAppointments: [],
    formDisplay: false,
    lastIndex: 0,
    alert: null,
    orderBy: 'petName',
    orderDir: 'asc',
    queryText: '',
  }

  // deleteAppointment function
  deleteAppointment = (apt) => {
    let tempApts = this.state.myAppointments;

    // deletes a record from an array and returns the array without the deleted item
    tempApts = without(tempApts, apt);

    // set the state without the deleted item
    this.setState({ myAppointments: tempApts });
  }

  // toggleForm function
  toggleForm = () => {
    this.setState({ formDisplay: !this.state.formDisplay });
  }

  // lifecycle method
  async componentDidMount() {
    const response = await axios.get('./data.json');

    const apts = response.data.map(item => {
      item.aptId = this.state.lastIndex;
      this.setState({ lastIndex: this.state.lastIndex + 1 }); // modifies the index value on each iteration
      return item;
    });

    // set the state
    this.setState({
      myAppointments: apts
    });

  }

  // addAppointment function
  addAppointment = apt => {
    let tempApts = this.state.myAppointments; // array in the state
    apt.aptId = this.state.lastIndex; // last index variable(id number) from state
    //push: adds to the end of that stack( rarely needs reallocate memory+copy over); 
    // unshift: adds to the start of the list(always needs to reallocate memory and copy data over)
    tempApts.push(apt);
    // set the state
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1,
    })
  }

  // showAlert function
  showAlert = (msg, type) => {
    // set the alert in state
    this.setState({ alert: { msg, type } }); // same as this.setState({ alert: { msg: msg, type: type } });

    // clear alert after 4 secs by setting alert state to null
    setTimeout(() => this.setState({ alert: null }), 4000);
  }

  // changeOrder function
  changeOrder = (order, dir) => {
    this.setState({
      orderBy: order,
      orderDir: dir,
    })
  }


  // searchApt function
  searchApts = query => {
    this.setState({ queryText: query })
  }


  render() {
    let order;
    let filteredApts = this.state.myAppointments;
    if (this.state.orderDir === 'asc') {
      order = 1;  // asc order
    } else {
      order = -1; // desc order
    }

    // function to filter appointment list
    filteredApts = filteredApts.sort((a, b) => {
      if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    }).filter(eachItem => {
      return (
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
      );
    })

    // destructuring from state
    const { formDisplay, myAppointments, alert } = this.state;

    return ( // shows the template
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <Alert alert={alert} />
                <AddAppointments
                  formDisplay={formDisplay}  // passing formDisplay state variable down into AddAppointments
                  toggleForm={this.toggleForm} // receiving props(function) from AddAppointments
                  addAppointment={this.addAppointment} // receiving props(function) from AddAppointments
                  showAlert={this.showAlert}  // receiving props(function) from AddAppointments
                />
                <SearchAppointments
                  // left: variable/func from subcomponent/component
                  // right: local variable/func in this script
                  orderBy={this.state.orderBy}  // passing orderBy variable into SearchAppointments
                  orderDir={this.state.orderDir}  // passing orderDir variable into SearchAppointments
                  changeOrder={this.changeOrder}  // receiving props from SearchAppoints
                  searchApts={this.searchApts}  // receiving props from SearchAppoints
                />
                <ListAppointments
                  appointments={filteredApts} // passing appointments array into ListAppointments
                  deleteAppointment={this.deleteAppointment} // receiving props(function) from ListAppointments
                  showAlert={this.showAlert} // receiving props(function) from ListAppointments
                />
              </div>
            </div>
          </div>
        </div>
      </main>

    );
  }

}

export default App;

/** snippets
 * ptor:  PropTypes.object.isRequired,
 * pto: PropTypes.object,
 * pts: PropTypes.string,
 * ptsr: PropTypes.string.isRequired,
 * pta: PropTypes.array,
 * ptar: PropTypes.array.isRequired,
 *
 * racf: functional component
 * rce: class based component that exports at the bottom
 * rafce -react arrow function export Component
 *
 * // binding the this keyword
 * this.deleteAppointment = this.deleteAppointment.bind(this);
 * this.toggleForm = this.toggleForm.bind(this);
 * PropType import: impt
*/