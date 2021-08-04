import React from 'react';
import { Link } from 'react-router-dom';

class Card extends React.Component {

    render() {
        return (
            <Link to={`/country/${this.props.name}`}>
                <div className="card">
                    <img src={this.props.flag} alt={this.props.name + " Flag"}></img>
                    <div className="information-wrapper">
                        <h2>{this.props.name}</h2>
                        <p><strong>Population: </strong>{this.props.population}</p>
                        <p><strong>Region: </strong>{this.props.region}</p>
                        <p><strong>Capital: </strong>{this.props.capital}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Card;