import React, {Component, Fragment} from 'react'
import {CloudDrizzle, CloudRain, SunnyHigh} from './WeatherIcons'
import {connect} from 'react-redux'
import {getWeather} from '../../actions/weather'
import cities from '../../dataset/citis'
import GetIcon from './GetIcon'
import '../App.css'
import { PuffLoader} from "react-spinners"

class Dashboard extends Component {

    state = {
        city: '',
        cities: cities
    }

    styles = {
        style1: {color: '#808080', fontWeight: 400},
        fontWeight4: {fontWeight: 400}

    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault()
        this.state.show = false
        let selectedCity = this.state.cities.filter(city => city.city === this.state.city);
        let lat = selectedCity[0].lat
        let lng = selectedCity[0].lng
        this.props.getWeather(lat, lng)
    }

    timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var ampm = hour < 12 || hour === 24 ? 'AM' : 'PM';
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        min = min < 10 ? '0' + min : min;
        var time = this.timeConvertToDay(UNIX_timestamp)+ ' ' + hour + ':' + min + ' ' + ampm
        return time;
    }

    timeConvertToDay = UNIX_timestamp => {
        var a = new Date(UNIX_timestamp * 1000);
        var weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        var day = weekDay[a.getDay()]
        return day
    }

    timeConvertToDate = UNIX_timestamp => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        var year = a.getFullYear()
        var month = months[a.getMonth()]
        var date = a.getDate()
        var time = date + ' ' + month + ' ' + year
        return time
    }

    kelvinToCelcius = temp => {
        return Math.round(temp - 273.15)
    }

    meterSecToKiloHour = wind => {
        return Math.round(wind*3.6)
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cardList = () => {
        return(
        <div className="row">
            {this.props.weather.daily.map(day => {
                return(
                    <div className="col-md-3 weather_card" key={day.dt}>
                        <div className="card card-body shadow p-3 mb-5 bg-white rounded">
                            <div className="row">
                                <h6 style={this.styles.style1} className="col-sm-6">{this.timeConvertToDay(day.dt)}</h6>
                                <h6 style={this.styles.style1} className="col-sm-6 text-right">{this.timeConvertToDate(day.dt)}</h6>
                            </div>
                            <div className="row py-2 text-center">
                                <div className="col-sm-4">
                                    <h4 style={this.styles.fontWeight4}>{this.kelvinToCelcius(day.temp.day)}&deg;</h4>
                                </div>
                                <div className="col-sm-8">
                                    <h6 className="text-right mb-0">{this.kelvinToCelcius(day.temp.max)}&deg;</h6>
                                    <GetIcon code={day.weather[0].id} />
                                    <h6 className="text-right mb-0">{this.kelvinToCelcius(day.temp.min)}&deg;</h6>
                                </div>
                            </div>
                            <div className="text-center p-1">
                                <h6>{this.capitalize(day.weather[0].description)}</h6>
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Humidity</td>
                                        <td>{day.humidity}%</td>
                                    </tr>
                                    <tr>
                                        <td>Wind Speed</td>
                                        <td>{this.meterSecToKiloHour(day.wind_speed)} Km/h</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })}
        </div>
        )
    }

    currentWeather = () => {
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="row pt-2 mb-5">
                        <div className="col-md-3">
                            <h2 style={this.styles.fontWeight4}>{this.kelvinToCelcius(this.props.weather.current.temp)}<sup style={{fontSize: 18, marginTop: -10}}>&deg; C</sup></h2>
                            <h6 style={this.styles.style1}>Feels Like: {this.kelvinToCelcius(this.props.weather.current.feels_like)}&deg;C</h6>
                        </div>
                        <div className="col-md-3">
                            <div style={{marginTop: -30}}>
                                <GetIcon code={this.props.weather.current.weather[0].id} />
                            </div>
                            <h6 style={this.styles.style1}>{this.capitalize(this.props.weather.current.weather[0].description)}</h6>
                        </div>
                        <div className="col-md-3">
                            <h6 style={this.styles.style1}>Humidity: {this.props.weather.current.humidity}%</h6>
                            <h6 style={this.styles.style1}>Wind Speed: {this.meterSecToKiloHour(this.props.weather.current.wind_speed)} Km/h</h6>
                        </div>
                        <div className="col-md-3 text-right">
                            <h4 style={this.styles.fontWeight4}>{this.state.city}</h4>
                            <h5 style={this.styles.style1}>{this.timeConverter(this.props.weather.current.dt)}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){

        const city = this.state.city
        return (
            <Fragment>
                <div className="row mt-3 mb-3 pt-2 pb-2">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-row">
                            <div className="col-5">
                            <select
                                className="form-control"
                                name="city"
                                onChange={this.onChange}
                            >
                                <option value="">Select City</option>
                                {this.state.cities.map(city => (
                                    <option key={city.lat} value={city.city}>{city.city}</option>
                                ))}
                            </select>
                            </div>
                            <div className="col-2">
                            <input type="submit" className="btn btn-outline-primary" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center">
                        <PuffLoader color={'#0000FF'} loading={this.props.pending} size={300} />
                    </div>
                </div>
                {this.props.show? this.currentWeather() : ''}
                {this.props.show? this.cardList() : '' }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    weather: state.weather.weather,
    pending: state.weather.forecast_pending,
    show: state.weather.show_result
})

export default connect(mapStateToProps, {getWeather})(Dashboard)
