import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function CountryInformation() {
    let { name } = useParams()
    const [information, setInformation] = useState(Object)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(data => data.json())
            .then(data => {
                console.log(data[0])
                setInformation(data[0])
                setIsLoaded(true)
            },
                (err) => {
                    setIsLoaded(true)
                }
            )
    }, [])

    if (isLoaded) {
        return (
            <div className="country-information">
                <Link to="/">
                    <button className="back-button">
                        <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'><title>Arrow Back</title><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M244 400L100 256l144-144M120 256h292' /></svg>
                        Back
                    </button>
                </Link>
                <div className="country-wrapper">
                    <img src={information.flags.svg} alt={information.name + " Flag"} />
                    <div className="country-wrapper-text">
                        <h1>{information.name.common}</h1>
                        <ol>
                            <li>
                                <strong>Native Name: </strong> {information.name.official}
                            </li>
                            <li>
                                <strong>Population: </strong>{information.population}
                            </li>
                            <li>
                                <strong>Region: </strong>{information.region}
                            </li>
                            <li>
                                <strong>Sub Region: </strong>{information.subregion}
                            </li>
                            <li>
                                <strong>Capital: </strong>{information.capital}
                            </li>
                            <li>
                                <strong>Top Level Domain: </strong>{information.tld[0]}
                            </li>
                            <li>
                                <strong>Currencies: </strong>{information.currencies.length > 1 ? Object.values(information.currencies).map(currency => (" " + currency.name)) : Object.values(information.currencies)[0].name}
                            </li>
                            <li>
                                <strong>Languages: </strong>{information.languages.length > 1 ? Object.values(information.languages).map(language => (" " + language.name)) : Object.values(information.languages)[0]}
                            </li>
                        </ol>
                        <div className="border-countries">
                            <strong>Border Countries: </strong>
                            {information.borders.map(x => <button className="country-button" key={x}>{x}</button>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Loading />
        )
    }
}

export default CountryInformation;
