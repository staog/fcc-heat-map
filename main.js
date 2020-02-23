function heatmap(data){
  
   const tempVariance = data.monthlyVariance;
   const base = data.baseTemperature;
  
   const width = 1100;
   const height = 480;
  
   const margin = {
     top: 20,
     right: 40,
     bottom: 80,
     left: 80
   };
  
   const innerWidth = width - margin.left - margin.right;
   const innerHeight = height - margin.top - margin.bottom;
  
   const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
   const colors = [
     '#313695',
     '#4675B4',
     '#74ADD1',
     '#ABD9E9',
     '#E0F2F8',
     '#FEFBBE',
     '#FCE090',
     '#F5AD60',
     '#EF6C42',
     '#D6322D',
     '#A62527'
   ];
  
   const startYear = d3.min(tempVariance, d => d.year);
   const endYear = d3.max(tempVariance, d => d.year);
   const varianceMin = d3.min(tempVariance, d => d.variance);
   const varianceMax = d3.max(tempVariance, d => d.variance);
  
   const main = d3.select("#main");
   
   main.append("h1")
          .attr("id", "title")
          .text("Monthly global land-surface temperature")
          
   main.append("h2")
          .attr("id", "description")
          .html(tempVariance[0].year + " - " + tempVariance[tempVariance.length - 1].year + ": Base temperature " + base + "&#8451;");
  
   const svg = main.append("svg")
                   .attr("align", "centre")
                   .attr("width", width)
                   .attr("height", height);
   
   const g = svg.append("g")
                .attr("transform", `translate(${margin.right + margin.top}, ${margin.top})`);
   
   let tooltip = main.append("div")
                     .attr("id", "tooltip")
                     .style("visibility", "hidden");
  
   const xScale = d3.scaleLinear()
                    .domain([startYear, endYear])
                    .range([margin.right, innerWidth]);
  
   const yScale = d3.scaleBand()
                    .domain(months)
                    .range([margin.top, innerHeight]);
  
   let colorScale = d3.scaleQuantize()
                      .domain([varianceMin, varianceMax])
                      .range(colors);
  
   const xAxis = d3.axisBottom()
                   .scale(xScale)
                   .tickFormat(d => d);
  
   const yAxis = d3.axisLeft()
                   .tickSize(0)
                   .scale(yScale);
  
   g.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${innerHeight - margin.top})`)
      .call(xAxis);

   g.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${margin.right}, ${-margin.top})`) 
      .call(yAxis); 
  
   g.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(-90)")
     .attr("x", - innerHeight / 2)
     .attr("y", - margin.top)
     .text("Month");
  
   g.append("text")
     .attr("class", "text")
     .attr("x", innerWidth / 4)
     .attr("y", innerHeight + margin.top)
     .text("Year");
  
   g.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(90)")
     .attr("x", innerHeight / 5)
     .attr("y", - innerWidth - margin.top)
     .text("Made by Milan V. Kecojević");
  
   g.selectAll("rect")
    .data(tempVariance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr('data-month', d => d.month - 1)
    .attr('data-year', d => d.year)
    .attr('data-temp', d => d.variance)
    .attr("x", d => xScale(d.year))
    .attr('y', (d, i) => yScale(months[d.month - 1]) - margin.top)
    .attr("width", innerWidth / tempVariance.length * 12)
    .attr("height", innerHeight / 12)
    .attr('fill', d => colorScale(d.variance))
    .on("mouseover", (d, i) => {         
       tooltip.transition()
              .style("visibility", "visible")
              .attr("data-year", d.year)
       tooltip.html(`Year: ${d.year}, Month: ${d.month}<br/>Temp: ${(base + d.variance).toFixed(1)}℃<br/>Variance: ${d.variance.toFixed(2)}`)
              .style('left', `${d3.event.pageX - 460}px`)
              .style('top', `${d3.event.pageY - 40}px`)
     })
     .on("mouseout", d => {
       tooltip.transition()
              .style("visibility", "hidden");
     });
  
   const tempMin = (base + varianceMin).toFixed(2);
   const tempMax = (base + varianceMax).toFixed(2);
  
   const cellWidth = 30;
   const legendWidth = 330;
   const legendHeight = 25;
  
   const legendValueScale =  d3.scaleLinear()
                               .domain([tempMin, tempMax])
                               .range([0, legendWidth]);
  
   const legendColorScale = d3.scaleQuantize()
                              .domain([tempMin, tempMax])
                              .range(colors);
   
   const cellColors = d3.range(tempMin, tempMax, (tempMax - tempMin)/colors.length);
  
   const legendXAxis = d3.axisBottom()
                         .scale(legendValueScale);
  
   const legend = svg.append("g")
                     .attr("id", "legend")
                     .attr("transform", `translate(${innerWidth/2.3}, ${innerHeight + margin.right})`)
   
   legend.selectAll("rect")
         .data(cellColors)
         .enter()
         .append("rect")
         .attr("x", d => legendValueScale(d))
         .attr("width", cellWidth)
         .attr("height", legendHeight)
         .style("fill", d => legendColorScale(d));
  
   legend.append("g")
         .attr("id", "legendXAxis")
         .attr("transform", `translate(0, ${margin.top * 1.25})`)
         .call(legendXAxis);
    
};
 
 d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
   const data = json;
   heatmap(data);
 });


