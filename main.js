function heatmap(data){
  
   console.log(data);
  
   const variance = data.monthlyVariance;
   const base = data.baseTemperature;
  
   console.log(variance, base)
  
   const width = 1100;
   const height = 480;
  
   const margin = {
     top: 20,
     right: 50,
     bottom: 90,
     left: 80
   };
  
   const innerWidth = width - margin.left - margin.right;
   const innerHeight = height - margin.top - margin.bottom;
  
   const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
   ];
  
   const colors = ['#313695', '#4675B4', '#74ADD1', '#ABD9E9', '#E0F2F8', '#FEFBBE', '#FCE090', '#F5AD60', '#EF6C42', '#D6322D', '#A62527'];
  
   const varianceMin = d3.min(variance, d => d.year);
   const varianceMax = d3.max(variance, d => d.year);
  
   const main = d3.select("#main");
   
   main.append("h1")
          .attr("id", "title")
          .text("Monthly global land-surface temperature");
  
   main.append("h2")
          .attr("id", "description")
          .html(variance[0].year + " - " + variance[variance.length - 1].year + ": Base temperature " + base + "&#8451;");
  
   const svg = main.append("svg")
                   .attr("align", "centre")
                   .attr("width", width)
                   .attr("height", height);
   
   const g = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
   
   let tooltip = main.append("div")
                     .attr("id", "tooltip")
                     .style("opacity", 1)
                     .text('Hello there');
  
   const xScale = d3.scaleLinear()
                    .domain([varianceMin, varianceMax])
                    .range(margin.right, innerWidth);
  
   const yScale = d3.scaleLinear()
                    .domain([1, 13])
                    .range(margin.top, innerHeight);
  
   let colorScale = d3.scaleQuantize()
    .domain([d3.min(variance, (d) => d.variance), d3.max(variance, (d) => d.variance)])
    .range(colors);
  
   g.selectAll("rect")
    .data(variance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.month))
    .attr("width", width / variance.length * 12)
    .attr("height", height / 12)
    .attr('fill', (d) => colorScale(d.variance));
  
  };
 
 d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
   const data = json;
   heatmap(data);
 });


