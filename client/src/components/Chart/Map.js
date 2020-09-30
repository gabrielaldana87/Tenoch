import React , { Component } from 'react';
import Svg from './Elements/Svg';
import G from './Elements/G';
import _ from 'underscore';
import * as d3 from 'd3';
import Trail from '../../javascript/vendor/mschmidt/pathlayout';
import './Map.scss';

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }
  ;
  cScale () {
    return d3.scaleSequential(d3.interpolateViridis);
  }
  ;
  projection () {
    let
      svg = d3.select('.map'),
      width = svg.attr('width'),
      height = svg.attr('height')
      ;
    return d3.geoMercator()
      .center([-73.955515, 40.764663])
      .scale(67500000)
      .translate([(width) / 1.5, (height) /1.7]);
  }
  ;
  path () {
    let projection = this.projection();
    return d3.geoPath().projection(projection);
  }
  ;
  groupByAccount () {
    let grouping = _.groupBy(this.state.data, o => o.epc);
    this.setState({grouping: grouping });
  }
  ;
  reformatDataForPathGeneration () {
    let
      grouping = this.state.grouping;
    return Object.keys(grouping).map( (o,i) => {
      let obj = {};
      obj.visit = i + 1;
      obj.values = grouping[o];
      return obj;
    });
  }
  ;
  uniqueLocationNames () {
     return _.chain(this.state.data)
      .indexBy('displayname')
        .values()
        .value()
        .map( o => {
          return {
            'x': +o.leftcss,
            'y': +o.topcss,
            'coordinate': [o.leftcss, o.topcss],
            'location': o.displayname,
            'location_id': o.locationid,
            'date':o.capturedatts
          }
    });
  }
  ;
  drawPaths (selector) {
    let path = this.path();
    selector
      .enter()
      .append('path')
      .attr('d', d => path(d) );
  }
  ;
  drawCircles (selector) {
    let
      trail_layout = this.state.trailLayout,
      projection = this.projection()
    ;
    selector
      .selectAll('circle')
      .data(trail_layout)
      .enter()
      .append('circle')
      .attr('class', 'location-circle')
      .attr('cx', d => projection([d.leftcss, d.topcss])[0])
      .attr('cy', d => projection([d.leftcss, d.topcss])[1])
      .attr('r', '4px')
      .attr('fill', (d,i) => {
        if (i == 0) return 'red';
        if (i == trail_layout.length - 1) return 'green';
        else return 'none'
      });
  }
  ;
  drawTimeTexts (selector) {
    let
      timestamp = this.state.timestamp,
      projection = this.projection(),
      groupByLocationId = _.groupBy(timestamp, o => o.locationid),
      formatTime = d3.timeFormat('%H:%M %p')
    ;
    selector
      .selectAll('.time-text')
      .data(timestamp)
      .enter()
      .append('text')
      .attr('class', 'time-text')
      // .attr('stroke-width', .20)
      .attr('x', d => projection([d.leftcss, d.topcss])[0])
      .attr('y', d => projection([d.leftcss, d.topcss])[1])
      .text( d => formatTime(new Date(d.capturedatts * 1000)) )
      .style('opacity', (d,i) => {
        let index = groupByLocationId[d.locationid].indexOf(d);
      //  if (i == 0 || i == timestamp.length - 1 ) return 1;
        return index == 0 ? 1 : 0;
      })
      .attr('transform', d => 'translate(-80,4)');
  }
  ;
  drawLocationNames (selector) {
    let
      locations = this.uniqueLocationNames(),
      projection = this.projection()
    ;
    selector
      .selectAll('.location-names')
      .data(locations)
      .enter()
      .append('text')
      .attr('class', 'location-names')
      .attr('x', d => projection(d.coordinate)[0] + 5)
      .attr('y', d => projection(d.coordinate)[1])
      .text(d => d.location )
      .style('opacity', 1)
      .attr('transform', 'translate(5,5)' );
  }
  ;
  ready () {
    let
      cScale = this.cScale(),
      path = this.path(),
      routes = this.state.data,
      grouping = this.groupByAccount(),
      reformattedData = this.reformatDataForPathGeneration(),
      svg = d3.select('.map')
    ;
    svg
      .selectAll('visits')
      .data(reformattedData)
      .enter().append('g')
      .attr('class','visits')
      .attr('stroke', d => cScale(d.visit) )
      .each( (d,i,t) => {
        let
          g = d3.select(t[i]),
          trail = Trail().positioner(d => [d.leftcss, d.topcss]).coordType('coordinates'),
          trail_layout = trail.data(d.values).layout(),
          paths = g.selectAll('line').data(trail_layout),
          group_times_by_minute = _.groupBy(trail_layout, o => o['row_key'].split('|')[1].substr(0,16)),
          timestamp = Object.keys(group_times_by_minute).map(o => _.find(trail_layout, k => o ===
          k['row_key'].split('|')[1].substr(0,16)))
        ;
        //DRAW THE VISUAL ELEMENTS OF THE GRAPH BELOW

        this.setState({trailLayout: trail_layout});
        this.setState({timestamp: timestamp});
        this.drawPaths(paths);
        this.drawCircles(g);
        this.drawTimeTexts(g);
        this.drawLocationNames(svg);
      });
  }
  ;
  componentDidMount () {
    const { path } = this.props;
    fetch(`./data/${ path }.json`)
      .then(res => res.json() )
      .then(data => { this.setState({ data: data.elements });} )
      .then(paths => this.ready());
  }
  ;
  render () {
    const style = { width: 1200, height: 800 }
    ;
    return (
      <div>
        <Svg
          className='map' { ...style }>
          <G
            className='feature-group'>
          </G>
        </Svg>
      </div>
    )
  }
}

export default Map;