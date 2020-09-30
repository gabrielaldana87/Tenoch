import * as d3 from 'd3';

const heatmap = (props) => {
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 720,
    height = 240,
    xValue = function(d) {
      return d[0];
    }, // dates
    yValue = function(d) {
      return d[1];
    }, // usually hours [1-24]
    zValue = function(d) {
      return d[2];
    }, // value for coloring
    color = d3.scaleLinear()
      .range(["rgba(255,255,255,0)","#313695", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]),
    //   .range(["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"]),
    xScale = d3.scaleTime(),
    yScale = d3.scaleLinear(),
    xAxis = d3.axisBottom(xScale).tickSize(6, 0),
    yAxis = d3.axisRight(yScale);

  const chart = selection => {
    const
      heatmap = props.data,
      dx = heatmap[0].length,
      dy = heatmap.length;

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    selection.each(function(data) {

      // Convert data to standard representation
      data = data.map((d, i) => [xValue.call(data, d, i), yValue.call(data, d, i), zValue.call(data, d, i)]);

      // Update the x-scale.
      xScale
        .domain(props.domain)
        .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      yScale
        .domain([0, dy])
        .range([height - margin.top - margin.bottom, 0]);

      // Select the svg element, if it exists.

      var svg = d3.select(`.${props.name}`).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg")
        // .style("position", 'absolute')
        .append("g");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");
      gEnter.append("g").attr("class", "canvas");

      // Update the outer dimensions.
      svg.attr("width", width + margin.right )
        .attr("height", height);

      // draw canvas
      var canvas = d3.select(this).append("canvas")
        .attr("id", "canvas")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom)
        // .style("position", 'absolute')
        .style("margin-left", margin.left + "px")
        .style("margin-top", margin.top + "px");

      var context = canvas.node().getContext("2d");

      // there should be an easier solution to set yo color domain
      var extents = d3.extent(data, d => Z(d));

      let step = (extents[1] - extents[0]) / color.range().length - 1;

      color.domain([0, 1, 5, 9, 13, 17, 21, 25, 27]);

      // update graph
      var numberOfDays = Math.round(Math.abs((xScale.domain()[1].getTime() - xScale.domain()[0].getTime()) / (oneDay)));
      var numberOfHours = Math.round(Math.abs((yScale.domain()[1] - yScale.domain()[0])));

      var xGridSize = (width - margin.left - margin.right) / numberOfDays;
      var yGridSize = (height - margin.top - margin.bottom) / numberOfHours;

      // Update the inner dimensions.
      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the x-axis.
      g.select(".x.axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis.ticks(20));

      // Update the y-axis.
      g.select(".y.axis")
        .attr("transform", `translate(1160 ,0)`)
        .call(yAxis);

      data.forEach(d => {
        //Draw the rectangle
        context.fillStyle = color(Z(d));
        context.fillRect(X(d), Y(d), xGridSize, yGridSize);
      });

      d3.select('canvas').on('mousemove', () => {

      })

    });



  }

  // The x-accessor
  function X(d) {
    return xScale(d[0]);
  }

  // The x-accessor for hours
  function Y(d) {
    return yScale(d[1]);
  }

  // The x-accessor for hours
  function Z(d) {
    return d[2];
  }

  chart.margin = function(_) {
    if(!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if(!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if(!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.color = function(_) {
    if(!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.x = function(_) {
    if(!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if(!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.z = function(_) {
    if(!arguments.length) return zValue;
    zValue = _;
    return chart;
  };

  return chart;
}

export default heatmap;