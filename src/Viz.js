import React, {Component} from "react";
import PropTypes from "prop-types";

import {assign} from "d3plus-common";

/**
    @class Viz
    @extends React.Component
    @desc Creates SVG paths and coordinate points based on an array of data. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started using the geomap generator.
*/
class Viz extends Component {

  /**
      @memberof Viz
      @desc Initializes the specific visualization's class instance and binds it to the container <div>.
      @private
  */
  componentDidMount() {
    const {type: Constructor} = this.props;

    this.viz = new Constructor().select(this.container);
    this.renderViz.bind(this)();

  }

  /**
      @memberof Viz
      @desc Updates visualization config on component update.
      @private
  */
  componentDidUpdate(prevProps) {

    const globalConfig = this.context.d3plus || {};
    const {config, forceUpdate} = this.props;
    const c = assign({}, globalConfig, config);
    const c2 = assign({}, globalConfig, prevProps.config);

    const same = forceUpdate ? false : JSON.stringify(c) === JSON.stringify(c2);
    if (!same) this.renderViz.bind(this)();

  }

  /**
      @memberof Viz
      @desc Sets visualization config, accounting for dataFormat, and renders the visualization.
      @private
  */
  renderViz() {
    const {viz} = this;
    const {config, dataFormat} = this.props;
    const globalConfig = this.context.d3plus || {};
    const c = assign({}, globalConfig, config);

    if (dataFormat && c.data) viz.config(c).data(c.data, dataFormat);
    else viz.config(c);
    viz.render();

  }

  /**
      @memberof Viz
      @desc Renders an empty container to hold the visualization.
      @private
  */
  render() {
    const {className} = this.props;
    return <div className={className} ref={container => this.container = container}></div>;
  }

}

Viz.contextTypes = {d3plus: PropTypes.object};
Viz.defaultProps = {
  className: "viz",
  forceUpdate: false
};

/**
    @memberof Viz
    @param {Object} [config = {}] An object containing method/value pairs to be passed to the visualization's .config( ) method.
    @param {Function} [dataFormat = d3plus.dataFold] A custom formatting function to be used when formatting data from an AJAX request. The function will be passed the raw data returned from the request, and is expected to return an array of values used for the data method.
*/
export default Viz;
