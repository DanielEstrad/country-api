import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CountryInformation() {
    let { name } = useParams()
    const [information, setInformation] = useState(Object)

    useEffect(() => {
        fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
            .then(data => data.json())
            .then(data => {
                setInformation(data[0])
            })
    }, [])

    return (
        <div className="country-information">
            <button className="back-button">
                <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Arrow Back</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' /></svg>
                Back
            </button>
            <div className="country-wrapper">
                <img src={information.flag} alt={information.name + " Flag"} />
                <div className="country-wrapper-text">
                    <h3>{information.name}</h3>
                </div>
            </div>
        </div>
    )
}

export default CountryInformation;