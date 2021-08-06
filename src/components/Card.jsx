import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
    const [show, setShow] = useState(false)
    const elementRef = useRef(null)

    useEffect(() => {
        const onChange = (entries, observer) => {
            const element = entries[0]
            if (element.isIntersecting) {
                setShow(true)
                observer.disconnect()
            }
        }
        const observer = new IntersectionObserver(onChange, {
            rootMargin: '50px'
        })
        observer.observe(elementRef.current)
    })

    return (
        <Link to={`/country/${props.name}`}>
            <div className="card" ref={elementRef}>
                {show ? <img src={props.flag} alt={props.name + " Flag"} /> : <div>Loading...</div>}
                <div className="information-wrapper">
                    <h2>{props.name}</h2>
                    <p><strong>Population: </strong>{props.population}</p>
                    <p><strong>Region: </strong>{props.region}</p>
                    <p><strong>Capital: </strong>{props.capital}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card;