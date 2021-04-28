import React, { Component } from 'react';
import { FaTimes } from "react-icons/fa";
import Moment from 'react-moment';
import PropTypes from 'prop-types'


class ListAppointments extends Component {

    static propTypes = {
        appointments: PropTypes.array.isRequired,
        deleteAppointment: PropTypes.func.isRequired,
    }

    render() {
        // destructuring
        const { appointments, deleteAppointment } = this.props;

        return (
            <div className="appointment-list item-list mb-3">
                {appointments.map(item => (
                    <div className="pet-item col media py-3" key={item.aptId}>
                        <div className="mr-3">  {/* deleteAppointment: will be created in App.js */}
                            {/* <button className="pet-delete btn btn-sm btn-danger" onClick={() => deleteAppointment(item)}> */}
                            <button className="pet-delete btn btn-sm btn-danger" onClick={
                                () => {
                                    deleteAppointment(item)
                                    this.props.showAlert("Deleted appointment!", "warning");
                                }

                            }>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span className="pet-name">{item.petName}</span>
                                <span className="apt-date ml-auto">
                                    <Moment
                                        date={item.aptDate}
                                        parse="YYYY-MM-dd hh:mm"
                                        format="DD/MM/YYYY h:mA"
                                    />
                                </span>
                            </div>

                            <div className="owner-name">
                                <span className="label-item">Owner: </span>
                                <span>{item.ownerName}</span>
                            </div>
                            <div className="apt-notes">{item.aptNotes}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ListAppointments

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

