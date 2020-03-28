// import React from 'react';

// const App = () => {
//   return <div> Hello Mike! </div>;
// };

// export default App;
import React, { Component } from 'react';

import SearchBar from './searchBar';
import Gif from './gif';
import GifList from './gifList';

const giphy = require('giphy-api')('KsltJNEs1v3QDDVlinP6EFo2GqjFxgRR');
// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGifId: "l46CySTsO9JqWL8di",
      gifIds: ["WuGSL4LFUMQU", "HuVCpmfKheI2Q", "u6uAu3yyDNqRq"]
    };
    this.fetchGiphy("vape nation");
  }

  fetchGiphy = (keyword) => {
    giphy.search({
      q: keyword,
      rating: 'g',
      limit: 10
    }, (err, res) => {
      this.setState({ gifIds: res.data.map(gif => gif.id) });
    });
  }

  changeSelectedGif = (newGifId) => {
    this.setState({ selectedGifId: newGifId });
  }

  render() {
    const { selectedGifId, gifIds } = this.state;
    return (
      <div>
        <div className="left-scene">
          <SearchBar fetchGiphy={this.fetchGiphy} />
          <div className="selected-gif">
            <Gif gifId={selectedGifId} />
          </div>
        </div>
        <div className="right-scene">
          <GifList gifIds={gifIds} changeGif={this.changeSelectedGif} />
        </div>
      </div>
    );
  }
}
