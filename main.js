function heatmap(dataset){

  let margin = 60;
  let w = 1600;
  let h = 800;
  
  let barWidth = (w - 2 * margin) / (dataset.length / 12);
  let barHeight = (h - 2 * margin) / 12;
  
  const div = d3.select("body").append("div");
    
  const heading = div.append("heading");
  
  heading.append("h1")
         .attr("id", "title")
         .text("Monthly global land-surface temperature");
  heading.append("h3")
         .attr("id", "description")
         .html(data.monthlyVariance[0].year + " - " + data.monthlyVariance[data.monthlyVariance.length-1].year + ": base temperature " + data.baseTemperature + "&#8451;");
  
  let tooltip = d3.select("#map")
                  .append("div")
                  .attr("id", "tooltip")
                  .style("opacity", 0);
  
  const years = dataset.map(d => d.year);
  const months = dataset.map(d => d.month);
  
  const xScale = d3.scaleBand()
                   .domain(dataset.map(d => d.year))
                   .rangeRound([0, w])
                   .padding(margin/1000);
  
  const yScale = d3.d3.scaleLinear()
                   .domain([0, d3.max(GDP)])
                   .range([h - margin, margin]);
               
  const svg = d3.select("#map")
                .append("svg")
                .attr("align", "centre")
                .attr("width", w)
                .attr("height", h);
  
  svg.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(-90)")
     .attr("x", -130)
     .attr("y", 30)
     .text("Months");
  
  svg.append("text")
     .attr("class", "text")
     .attr("x", w/2.5 + 320)
     .attr("y", h - 20)
     .text("Years");
  
  const xAxis = d3.axisBottom()
                  .scale(xScale)
                  .tickFormat(d => d);
  
  const yAxis = d3.axisLeft()
                  .scale(yScale)
                  .tickFormat(timeFormat);
  
  svg.append("g")
     .attr("id", "x-axis")
     .attr("transform", `translate(0, ${h - margin - margin/2})`)
     .call(xAxis);
  
  svg.append("g")
     .attr("id", "y-axis")
     .attr("transform", `translate(${margin}, ${-margin/2})`)
     .call(yAxis)
  
}

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
  const dataset = json.monthlyVariance;
  heatmap(dataset)
});
