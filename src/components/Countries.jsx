import React from 'react';
import Card from './Card';
import SearchIcon from '../images/search-outline.svg'

class Countries extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            countries: [],
            temporalList: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.selectorChange = this.selectorChange.bind(this)
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(data => data.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    countries: data,
                    temporalList: data
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    handleChange(event) {
        if (event.target.value) {
            fetch(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
                .then(data => data.json())
                .then(data => {
                    this.setState({
                        countries: data
                    })
                })
        } else {
            this.setState({
                countries: this.state.temporalList
            })
        }
    }

    selectorChange(event) {
        if (event.target.value) {
            fetch(`https://restcountries.eu/rest/v2/region/${event.target.value}`)
                .then(data => data.json())
                .then(data => {
                    this.setState({
                        countries: data
                    })
                })
        } else {
            this.setState({
                countries: this.state.temporalList
            })
        }
    }

    render() {
        const { error, isLoaded, countries } = this.state;
        if (error) {
            <p>{error.message}</p>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <>
                    <div className="tools-wrapper">
                        <input style={{ backgroundImage: `url(${SearchIcon})` }} type="text" name="search" placeholder="Search for a country..." id="search-country" onChange={this.handleChange} />
                        <select name="regions" id="region-selector" onChange={this.selectorChange}>
                            <option value="">Filter by Region</option>
                            <option value="africa">Africa</option>
                            <option value="americas">America</option>
                            <option value="asia">Asia</option>
                            <option value="europe">Europe</option>
                            <option value="oceania">Oceania</option>
                        </select>
                    </div>
                    <div className="grid-container">
                        {countries.map(country => (
                            <Card key={country.numericCode} name={country.name} flag={country.flag} population={country.population} region={country.region} capital={country.capital} />
                        ))}
                    </div>
                </>
            )
        }
    }
}

export default Countries;