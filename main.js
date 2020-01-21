function heatmap(data){
  
   const variance = data.monthlyVariance;
   const base = data.baseTemperature;
   const w = 1200;
   const h = 600;
  
   const margin = {
     top: 20,
     right: 20,
     bottom: 20,
     left: 20
   };
  
   const months = [
     "January",
     "February",
     "March",
     "April",
     "May", 
     "June", 
     "July", 
     "August", 
     "September", 
     "October", 
     "November",
     "December"
   ];
   
   const singleBar = w / 260;
   const main = d3.select("#main");
   
   main.append("h1")
          .attr("id", "title")
          .text("Monthly global land-surface temperature");
  
   main.append("h2")
          .attr("id", "description")
          .html(variance[0].year + " - " + variance[variance.length - 1].year + ": Base temperature " + base + "&#8451;");
  
   const svg = main.append("svg")
                   .attr("align", "centre")
                   .attr("width", w - margin.left - margin.right)
                   .attr("height", h - margin.top - margin.bottom);
   
   let tooltip = main.append("div")
                     .attr("id", "tooltip")
                     .style("opacity", 1)
                     .text('hello there i love you all');
  
   const yScale = d3.scaleLinear()
                    .domain([0, 11])
                    .range([h - margin, margin]);
  
   const xScale = d3.scaleLinear()
                   .domain([variance[0].year, variance[variance.length - 1].year])
                   .range([margin, w - margin]);
  
   svg.append("text")
      .attr("class", "text")
      .attr("transform", "rotate(-90)")
      .attr("x", - margin.left * 10)
      .attr("y", margin.top * 4)
      .text("Months");
  
   svg.append("text")
     .attr("class", "text")
     .attr("x", w / 2 + 100)
     .attr("y", h - 100)
     .text("Years")
  
   svg.append("text")
     .attr("class", "signature")
     .attr("transform", "rotate(90)")
     .attr("x", 50)
     .attr("y", - w + (margin.right * 5))
     .text("Made by Milan V. Kecojević");
  
   const xAxis = d3.axisBottom()
                   .scale(xScale);
  
   const yAxis = d3.axisLeft()
                   .scale(yScale);
  
   svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0, " + (h - margin) + ")")
      .call(xAxis);

   svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + margin + ", 0)") 
      .call(yAxis);  
  
   svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr("class", "cell");
   
 };
 
 d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
   const data = json;
   heatmap(data);
 });

