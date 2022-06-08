import React, { image, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import radiusReference from './radiusReference'
import Dropdown from 'react-bootstrap/Dropdown'
import { Container, Row, Col } from 'react-bootstrap'
import Slider from "react-slick";

function App() {
  const [piVal, setPiVal] = React.useState(0);
  const [planet, setPlanet] = React.useState('Select Planet');
  const [circumference, setCircumference] = React.useState(0);


  React.useEffect(() => {
    getCurrentPiVal()
  }, []);

  const getCurrentPiVal = () => {
    axios.get('/getCurrentPiVal')
      .then(res => {
        setPiVal(res.data.message)
      }).catch(err => { console.log(err) })
  }

  const handlePlanetSelect = (planet) => {
    getCurrentPiVal()
    setPlanet(planet)
    calcCircumference(planet)
  }

  const calcCircumference = (planet) => {
    let value = piVal * radiusReference.find(e => e.planetName == planet).radius * 2
    setCircumference(value.toFixed(2))
  }

  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Container className="cont-header py-5" fluid>
      <Row className="justify-content-center">
        <p className="title">Naluri Space Project</p>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8} className='py-5'>
          <Slider {...settings} afterChange={(e) => { handlePlanetSelect(radiusReference[e].planetName) }}>
            <img src={require('./assets/Sun.gif')} className='slider-image' />
            <img src={require('./assets/Mercury.gif')} className='slider-image' />
            <img src={require('./assets/Venus.gif')} className='slider-image' />
            <img src={require('./assets/Earth.gif')} className='slider-image' />
            <img src={require('./assets/Mars.gif')} className='slider-image' />
            <img src={require('./assets/Jupiter.gif')} className='slider-image' />
            <img src={require('./assets/Saturn.gif')} className='slider-image' />
            <img src={require('./assets/Uranus.gif')} className='slider-image' />
            <img src={require('./assets/Neptune.gif')} className='slider-image' />
            <img src={require('./assets/Pluto.gif')} className='slider-image' />
          </Slider>
        </Col>
        <Col xs={12} md={8}>
          <p className="circumference">Circumference of</p>
        </Col>
        <Col xs={12} md={8}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" className="planet-selector">
              {planet}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Sun') }}>Sun</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Mercury') }}>Mercury</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Venus') }}>Venus</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Earth') }}>Earth</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Mars') }}>Mars</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Jupiter') }}>Jupiter</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Saturn') }}>Saturn</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Uranus') }}>Uranus</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Neptune') }}>Neptune</Dropdown.Item>
              <Dropdown.Item onClick={() => { handlePlanetSelect('Pluto') }}>Pluto {`(debatable)`}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} md={8} className='pt-3'>
          <p className="circumference">{Number(circumference).toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km
          </p>
        </Col>

      </Row>
    </Container>
  );
}

export default App;