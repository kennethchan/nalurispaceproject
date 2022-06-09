import React from "react";
import axios from 'axios';
import radiusReference from './radiusReference'
import Dropdown from 'react-bootstrap/Dropdown'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Slider from "react-slick";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      piVal: 0,
      planet: 'Select Planet',
      circumference: 0,
      count: 0,
      area: 0,
      surfaceArea: 0,
      volume: 0
    };
  }

  componentDidMount = () => {
    this.getCurrentPiVal()
  }

  //Utilizing Axios to use a get API request for the latest Pi value
  getCurrentPiVal = () => {
    axios.get('/getCurrentPiVal')
      .then(res => {
        this.setState({ piVal: res.data.message })
      }).catch(err => { console.log(err) })
  }

  //Handler function to update the Pi value, calculate the selected planet's circumference, 
  //update the dropdown value and move the slider to the correct image
  handlePlanetSelect = (planet) => {
    this.getCurrentPiVal()
    if (radiusReference.some(e => e.planetName === planet)) {
      this.calcCircumference(planet)
      this.calcArea(planet)
      this.calcSurfaceArea(planet)
      this.calcVolume(planet)
      this.slider.slickGoTo(radiusReference.findIndex(e => e.planetName === planet))
      this.setState({ planet: planet })
    }
  }

  //Calculates the selected planet's circumference
  calcCircumference = (planet) => {
    let value = this.state.piVal * radiusReference.find(e => e.planetName === planet).radius * 2
    this.setState({ circumference: value.toFixed(2) })
  }

  //Calculates the selected planet's area
  calcArea = (planet) => {
    if (radiusReference.some(e => e.planetName === planet)) {
      let value = this.state.piVal * Math.pow(radiusReference.find(e => e.planetName === planet).radius, 2)
      this.setState({ area: value.toFixed(2) })
    }
  }

  //Calculates the selected planet's surface area
  calcSurfaceArea = (planet) => {
    if (radiusReference.some(e => e.planetName === planet)) {
      let value = this.state.piVal * Math.pow(radiusReference.find(e => e.planetName === planet).radius, 2) * 4
      this.setState({ surfaceArea: value.toFixed(2) })
    }
  }

  //Calculates the selected planet's volume
  calcVolume = (planet) => {
    if (radiusReference.some(e => e.planetName === planet)) {
      let value = this.state.piVal * Math.pow(radiusReference.find(e => e.planetName === planet).radius, 3) * (4 / 3)
      this.setState({ volume: value.toFixed(2) })
    }
  }

  //Renders dropdown item's programmatically for cleaner code
  renderDropdownItems = () => {
    return radiusReference.map((e, i) => {
      return (
        <Dropdown.Item onClick={() => { this.handlePlanetSelect(e.planetName) }} key={i}>{e.planetName}</Dropdown.Item>
      )
    })
  }

  //Renders images programmatically for cleaner code
  renderImages = () => {
    return radiusReference.map((e, i) => {
      return (
        <img src={require(`./assets/${e.planetName}.gif`)} className='slider-image' alt="" key={i} />
      )
    })
  }


  render() {
    return (
      <Container className="cont-header py-5" fluid>
        <Row className="justify-content-center">
          <p className="title">Naluri Space Project</p>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={8} className='py-5'>
            <Slider ref={c => (this.slider = c)} settings={{
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }} afterChange={(e) => { this.handlePlanetSelect(radiusReference[e].planetName) }}>
              {this.renderImages()}
            </Slider>
          </Col>
          <Col xs={12} md={8}>
            <Dropdown>
              <Dropdown.Toggle variant="primary" className="planet-selector">
                {this.state.planet}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.renderDropdownItems()}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          {this.state.circumference > 0 && <Col xs={12} md={8} className='pt-3'>
            <p className="data">Circumference: {Number(this.state.circumference).toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km
            </p>
          </Col>}
          {this.state.area > 0 && <Col xs={12} md={8}>
            <p className="data">Area: {Number(this.state.area).toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km²
            </p>
          </Col>}
          {this.state.surfaceArea > 0 && <Col xs={12} md={8}>
            <p className="data">Surface Area: {Number(this.state.surfaceArea).toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km²
            </p>
          </Col>}
          {this.state.volume > 0 && <Col xs={12} md={8}>
            <p className="data">Volume: {Number(this.state.volume).toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km³
            </p>
          </Col>}
          <Col xs={12} md={8} className='pt-3 d-flex flex-column justify-content-center align-items-center'>
            <textarea defaultValue={this.state.piVal} className='textArea' />
            <Button className='updateBtn mt-3' onClick={() => {
              this.handlePlanetSelect(this.state.planet)
            }}>Update Pi Value</Button>
          </Col>
        </Row>
      </Container >
    );
  }
}