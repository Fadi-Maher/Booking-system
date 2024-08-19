"use client";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationForm = () => {
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const handleArrivalDateChange = date => {
    setArrivalDate(date);
    if (departureDate && date && departureDate <= date) {
      setDepartureDate(null);
    } else {
      calculateNumberOfNights(date, departureDate);
    }
  };

  const handleDepartureDateChange = date => {
    setDepartureDate(date);
    calculateNumberOfNights(arrivalDate, date);
  };

  const calculateNumberOfNights = (arrival, departure) => {
    if (arrival && departure) {
      const timeDifference = departure.getTime() - arrival.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      setNumberOfNights(daysDifference);
    } else {
      setNumberOfNights(0);
    }
  };

  const handleNumberOfPersonsChange = event => {
    const value = Math.max(1, Number(event.target.value));
    setNumberOfPersons(value);
    setNumberOfAdults(Math.min(value, numberOfAdults));
    setNumberOfChildren(Math.max(0, value - numberOfAdults));
  };

  const handleAdultsChange = event => {
    const value = Math.min(Math.max(1, Number(event.target.value)), 30);
    setNumberOfAdults(value);
    setNumberOfChildren(Math.max(0, numberOfPersons - value));
    setNumberOfPersons(value + numberOfChildren);
  };

  const handleChildrenChange = event => {
    const value = Math.min(Math.max(0, Number(event.target.value)), 30);
    setNumberOfChildren(value);
    setNumberOfPersons(value + numberOfAdults);
  };

  const handleSubmit = () => {
    console.log("Arrival Date:", arrivalDate);
    console.log("Departure Date:", departureDate);
    console.log("Number of Nights:", numberOfNights);
    console.log("Number of Persons:", numberOfPersons);
    console.log("Number of Adults:", numberOfAdults);
    console.log("Number of Children:", numberOfChildren);
  };

  const today = new Date();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h4 className="text-center mb-4">Reserve Your Next Stay</h4>
          <Form>
            <Form.Group controlId="arrivalDate">
              <Form.Label>Arrival Date</Form.Label>
              <DatePicker
                selected={arrivalDate}
                onChange={handleArrivalDateChange}
                className="form-control"
                placeholderText="Select Arrival Date"
                dateFormat="dd/MM/yyyy"
                minDate={today}
              />
            </Form.Group>
            <Form.Group controlId="departureDate" className="mt-3">
              <Form.Label>Departure Date</Form.Label>
              <DatePicker
                selected={departureDate}
                onChange={handleDepartureDateChange}
                className="form-control"
                placeholderText="Select Departure Date"
                dateFormat="dd/MM/yyyy"
                minDate={arrivalDate || today} // Set minDate to arrivalDate if selected, otherwise to today
                disabled={!arrivalDate} // Disable the departure date picker if no arrival date is selected
              />
            </Form.Group>
            <Form.Group controlId="numberOfNights" className="mt-3">
              <Form.Label>Number of Nights</Form.Label>
              <Form.Control
                type="number"
                value={numberOfNights}
                readOnly
                style={{ backgroundColor: "#e4ba90", color: "white" }}
              />
            </Form.Group>
            <Form.Group controlId="numberOfPersons" className="mt-3">
              <Form.Label>Number of Persons</Form.Label>
              <Form.Control
                type="number"
                value={numberOfPersons}
                onChange={handleNumberOfPersonsChange}
                min="1"
                style={{ backgroundColor: "#e4ba90", color: "white" }}
              />
            </Form.Group>
            <Form.Group controlId="numberOfAdults" className="mt-3">
              <Form.Label>Number of Adults</Form.Label>
              <Form.Control
                type="number"
                value={numberOfAdults}
                onChange={handleAdultsChange}
                min="1"
                max="30"
                style={{ backgroundColor: "#e4ba90", color: "white" }}
              />
            </Form.Group>
            <Form.Group controlId="numberOfChildren" className="mt-3">
              <Form.Label>Number of Children</Form.Label>
              <Form.Control
                type="number"
                value={numberOfChildren}
                onChange={handleChildrenChange}
                min="0"
                max="30"
                style={{ backgroundColor: "#e4ba90", color: "white" }}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
              <Button
                type="button"
                className="btn btn-primary p-2 mt-3 w-25"
                onClick={handleSubmit}
                style={{ backgroundColor: "#e09f5d", borderColor: "skyblue" }}
                disabled={!arrivalDate || !departureDate || numberOfNights < 1}
              >
                Reserve Now
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationForm;
