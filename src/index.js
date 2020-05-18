import React from "react";
import ReactDOM from "react-dom";

import "./myStyles.scss";

class App extends React.Component {
  state = {
    apiData: {},
    Stranger: null, // Stranger is out component
  };

  componentDidMount() {
    this.getApiData();
    import(/* webpackChunkName: 'Stranger' */ "./Stranger").then((Stranger) => {
      this.setState({ Stranger: Stranger.default });
    });
  }

  getApiData = async () => {
    try {
      const result = await fetch(
        "http://stapi.co/api/v1/rest/character/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: {
            title: "James T. Kirk",
            name: "James T. Kirk",
          },
        }
      );
      const resultJSON = await result.json();
      const character = resultJSON.characters[0];
      this.setState({ apiData: character });
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { apiData, Stranger } = this.state;
    return (
      <div className="app">
        <img
          alt="header"
          src="/dist/images/header.jpg"
          className="app-header"
        />
        <p>
          <strong>
            This is a React boiler plate App with Babel 7 and Webpack 4 setup
          </strong>
        </p>
        <p>
          Below is the response from a sample API call -
          http://stapi.co/api/v1/rest/character/search
        </p>
        <section>
          {Object.values(apiData).length === 0 ? (
            <p>Loading User Information</p>
          ) : (
            <p style={{ wordBreak: "break-all" }}>{JSON.stringify(apiData)}</p>
          )}
        </section>
        <p> Below is an example of lazy loading </p>

        {Stranger ? (
          <Stranger />
        ) : (
          <p>
            This is a component - but loaded dynamically on run time by lazy
            loading
          </p>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
