import React from "react";
import Card from "./Card";
import "isomorphic-fetch";
import "es6-promise";
// import logo from "../assets/logo"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      people: [],
      showFilms: false,
      showPeople: false,
      filmsLoaded: false,
      peopleLoaded: false,
      loaded: false
    };
  }

  componentDidMount() {
    fetch("http://ghibliapi.herokuapp.com/films")
      .then(res => res.json())
      .then(films => {
        this.setState({
          films: films
        });
      });
  }

  handleClick() {
    if (!this.state.filmsLoaded) {
      fetch("http://ghibliapi.herokuapp.com/films")
        .then(res => res.json())
        .then(films => {
          this.setState({
            loaded: true,
            films,
            filmsLoaded: true
          });
        });
    }

    this.setState({
      showPeople: false,
      showFilms: true
    });
  }

  handleClick2() {
    if (!this.state.peopleLoaded) {
      fetch("http://ghibliapi.herokuapp.com/people")
        .then(res => res.json())
        .then(people => {
          this.setState({
            loaded: true,
            peopleLoaded: true,
            people
          });
        });
    }

    this.setState({
      showFilms: false,
      showPeople: true
    });
  }

  renderCards() {
    return this.state.films.map(film => {
      return (
        <Card
          key={film.id}
          title={film.title}
          description={film.description}
        />
      );
    });
  }

  renderPeople() {
    return this.state.people.map(people => {
      return <Card key={people.id} name={people.name} age={people.age} />;
    });
  }

  render() {
    let buttons = (
      <React.Fragment>
        <img
          alt="derp"
          src="data:image/png;base64,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"
        />
        <button onClick={e => this.handleClick(e)}>Load Films</button>
        <button onClick={e => this.handleClick2(e)}>Load People</button>
      </React.Fragment>
    );

    if (this.state.showFilms) {
      return (
        <React.Fragment>
          {buttons}
          <div className="row"> {this.renderCards()}</div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {buttons} <div className="row"> {this.renderPeople()}</div>
        </React.Fragment>
      );
    }
  }
}

export default App;
