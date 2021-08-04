import React from 'react';
import Card from './Card';
/* import SearchIcon from '../images/search-outline.svg' */
import Loading from './Loading';

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
            return <Loading />
        } else {
            return (
                <>
                    <div className="tools-wrapper">
                        <div className="input-wrapper">
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Search</title><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32' /><path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M338.29 338.29L448 448' /></svg>
                            <input type="text" name="search" placeholder="Search for a country..." id="search-country" onChange={this.handleChange} />
                        </div>
                        <div className="select-wrapper">
                            <select name="regions" id="region-selector" onChange={this.selectorChange}>
                                <option value="">Filter by Region               </option>
                                <option value="africa">Africa</option>
                                <option value="americas">America</option>
                                <option value="asia">Asia</option>
                                <option value="europe">Europe</option>
                                <option value="oceania">Oceania</option>
                            </select>
                            {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M112 184l144 144 144-144' /></svg> */}
                        </div>
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