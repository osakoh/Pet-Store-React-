import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import axios from 'axios'; // axios import
import { without } from 'lodash';


class App extends Component {

  state = {
    myAppointments: [],
    formDisplay: false,
    lastIndex: 0,
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

    // reset the states
    this.setState({ myAppointments: apts });

  }

  render() {
    // destructuring myAppointments from state
    const { myAppointments } = this.state;

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                />
                <SearchAppointments />
                <ListAppointments appointments={myAppointments} deleteAppointment={this.deleteAppointment} />
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