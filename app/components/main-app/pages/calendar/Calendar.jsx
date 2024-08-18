"use client"
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

const ReservationForm = () => {
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);

  const handleArrivalDateChange = (date) => {
    setArrivalDate(date);
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
  };

  const handleNumberOfPersonsChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setNumberOfPersons(value);
    setNumberOfAdults(Math.min(value, numberOfAdults));
    setNumberOfChildren(Math.max(0, value - numberOfAdults));
  };

  const handleAdultsChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setNumberOfAdults(value);
    setNumberOfChildren(Math.max(0, numberOfPersons - value));
    setNumberOfPersons(value + numberOfChildren); 
  };

  const handleChildrenChange = (event) => {
    const value = Math.max(0, Number(event.target.value));
    setNumberOfChildren(value);
    setNumberOfPersons(value + numberOfAdults); 
  };

  const handleSubmit = () => {
    console.log("Arrival Date:", arrivalDate);
    console.log("Departure Date:", departureDate);
    console.log("Number of Persons:", numberOfPersons);
    console.log("Number of Adults:", numberOfAdults);
    console.log("Number of Children:", numberOfChildren);
  };

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
              />
            </Form.Group>
            <Form.Group controlId="numberOfPersons" className="mt-3">
              <Form.Label>Number of Persons</Form.Label>
              <Form.Control
                type="number"
                value={numberOfPersons}
                onChange={handleNumberOfPersonsChange}
                min="1"
                style={{ backgroundColor: '#e4ba90', color: 'white' }}
              />
            </Form.Group>
            <Form.Group controlId="numberOfAdults" className="mt-3">
              <Form.Label>Number of Adults</Form.Label>
              <Form.Control
                type="number"
                value={numberOfAdults}
                onChange={handleAdultsChange}
                min="1"
                style={{ backgroundColor: '#e4ba90', color: 'white' }}
              />
            </Form.Group>
            <Form.Group controlId="numberOfChildren" className="mt-3">
              <Form.Label>Number of Children</Form.Label>
              <Form.Control
                type="number"
                value={numberOfChildren}
                onChange={handleChildrenChange}
                min="0"
                style={{ backgroundColor: '#e4ba90', color: 'white' }}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
                  <Button
               type="button" className="btn btn-primary p-2 mt-3  w-25 "
                onClick={handleSubmit}
                style={{ backgroundColor: 'skyblue', borderColor: 'skyblue' }}
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
