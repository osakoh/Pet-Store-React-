import React, { Component } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import PropTypes from 'prop-types'  // PropType import: impt


class AddAppointments extends Component {

    state = { // each variable corresponds to the name of each input
        petName: '',
        ownerName: '',
        aptDate: '',
        aptTime: '',
        aptNotes: '',
    }

    // proptypes
    static propTypes = {
        formDisplay: PropTypes.bool.isRequired,
        toggleForm: PropTypes.func.isRequired,
    }

    // event handler     onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        // set state
        this.setState({
            [target.name]: value
        });
    }

    render() {
        // destructuring
        const { formDisplay, toggleForm } = this.props;

        return (

            <div className={
                'card textcenter mt-3 ' +
                (formDisplay ? '' : 'add-appointment')
            }>
                <div className="apt-addheading card-header bg-primary text-white">
                    Add Appointment&nbsp;&nbsp;<FaPlusSquare onClick={toggleForm} />
                </div>

                <div className="card-body">
                    <form id="aptForm" noValidate>
                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="petName"
                                readOnly
                            >
                                Pet Name
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="petName"
                                    placeholder="Pet's Name"
                                    value={this.state.petName}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="ownerName"
                            >
                                Pet Owner
                            </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ownerName"
                                    placeholder="Owner's Name"
                                    value={this.state.ownerName}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="aptDate"
                            >
                                Date
                            </label>
                            <div className="col-md-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="aptDate"
                                    id="aptDate"
                                    value={this.state.aptDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="aptTime"
                            >
                                Time
                            </label>
                            <div className="col-md-4">
                                <input
                                    type="time"
                                    className="form-control"
                                    name="aptTime"
                                    id="aptTime"
                                    value={this.state.aptTime}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                                Apt. Notes
                            </label>
                            <div className="col-md-10">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    cols="50"
                                    name="aptNotes"
                                    id="aptNotes"
                                    placeholder="Appointment Notes"
                                    value={this.state.aptNotes}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row mb-0">
                            <div className="offset-md-2 col-md-10">
                                <button
                                    type="submit"
                                    className="btn btn-primary d-block ml-auto"
                                >
                                    Add Appointment
                    </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default AddAppointments;


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