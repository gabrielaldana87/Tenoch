import * as d3 from 'd3';
import heatmap from './heatmap';

const draw = props => {

  const { dataset , name } = props;

  const chart = heatmap(props)
    .width(1200)
    .height(360)
    .x(d => d.dt ) // dates
    .y(d => + d.t_e_t ) // usually hours [1-24]
    .z(d => +d[name] ) // value for coloring;

    dataset.forEach(function(d){
      d.t_e_t = +d.total_elapsed_time.replace('at least ','').replace(' days','')
      // create date for each data point
      // hours are all set to 0
      d.dt = new Date(d.elapsed_date);
    });

    d3.select(`.${props.name}`)
      .datum(dataset)
      .call(chart);

  // const
  //   width = Math.max(document.documentElement.clientWidth/2, window.innerWidth/1.2 || 0),
  //   height = Math.max(document.documentElement.clientHeight/3, window.innerHeight/2.5 || 0),
  //   heatmap = props.data;
  // console.log(heatmap);
  // var dx = heatmap[0].length,
  //   dy = heatmap.length;
  //
  // // Fix the aspect ratio.
  // // var ka = dy / dx, kb = height / width;
  // // if (ka < kb) height = width * ka;
  // // else width = height / ka;
  //
  // var x = d3.scaleTime()
  //   .domain(props.domain)
  //   .range([0, width]);
  //
  // var y = d3.scaleLinear()
  //   .domain([0, dy])
  //   .range([height, 0]);
  //
  // var color = d3.scaleLinear()
  //   .domain([0, 1, 5, 9, 13, 17, 21, 25, 27])
  //   // .domain([5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
  //   .range(["white", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]);
  //
  // var xAxis = d3.axisTop(x)
  //   .tickFormat(d3.timeFormat('%m/%d'))
  //   .ticks(dx);
  //
  // var yAxis = d3.axisRight(y)
  //   .ticks(dy);
  //
  // d3.select(`.${props.name}`).append("canvas")
  //   .attr("width", dx)
  //   .attr("height", dy)
  //   .style("width", width + "px")
  //   .style("height", height + "px")
  //   .call(drawImage);
  //
  // var svg = d3.select(`.${props.name}`).append("svg")
  //   .attr("width", width)
  //   .attr("height", height);
  //
  // svg.append("g")
  //   .attr("class", "x axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(xAxis)
  //   .call(removeZero);
  //
  // svg.append("g")
  //   .attr("class", "y axis")
  //   .attr('transform',`translate(${ width  - 20 },0)`)
  //   .call(yAxis)
  //   .call(removeZero);
  //
  // // Compute the pixel colors; scaled by CSS.
  // function drawImage(canvas) {
  //   var context = canvas.node().getContext("2d"),
  //     image = context.createImageData(dx, dy);
  //
  //   for (var y = dy-1, p = -1; y >=0; --y) {
  //     for (var x = 0; x < dx; ++x) {
  //       var c = d3.rgb(color(heatmap[y][x]));
  //       image.data[++p] = c.r;
  //       image.data[++p] = c.g;
  //       image.data[++p] = c.b;
  //       image.data[++p] = 255;
  //     }
  //   }
  //
  //   context.putImageData(image, 0, 0);
  // }
  //
  // function removeZero(axis) {
  //   axis.selectAll("g").filter(function(d) { return !d; }).remove();
  // }


};

export default draw;