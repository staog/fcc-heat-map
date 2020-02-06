function heatmap(data){
  
   console.log(data);
  
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
   
   console.log(innerWidth, innerHeight);
  
   const colors = ['#313695', '#4675B4', '#74ADD1', '#ABD9E9', '#E0F2F8', '#FEFBBE', '#FCE090', '#F5AD60', '#EF6C42', '#D6322D', '#A62527'];
  
   const varianceMin = d3.min(tempVariance, d => d.year);
   const varianceMax = d3.max(tempVariance, d => d.year);
  
   const main = d3.select("#main");
   
   main.append("h1")
          .attr("id", "title")
          .text("Monthly global land-surface temperature");
  
   main.append("h2")
          .attr("id", "description")
          .html(tempVariance[0].year + " - " + tempVariance[tempVariance.length - 1].year + ": Base temperature " + base + "&#8451;");
  
   const svg = main.append("svg")
                   .attr("align", "centre")
                   .attr("width", width)
                   .attr("height", height);
   
   const g = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
   
   let tooltip = main.append("div")
                     .attr("id", "tooltip")
                     .style("opacity", 0)
                     .text('Hello there');
  
   const xScale = d3.scaleLinear()
                    .domain([varianceMin, varianceMax])
                    .range([margin.right, innerWidth]);
  
   console.log(xScale.domain()); // 1753, 2015
   console.log(xScale.range()); // 50, 970
  
   const yScale = d3.scaleBand()
                    .domain( ['Jan',
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
                              'Dec']
                           )
                    .range([margin.top, innerHeight]);
  
   console.log(yScale.domain()); // 12 Months
   console.log(yScale.range()); // 20, 370
  
   let colorScale = d3.scaleQuantize()
    .domain([d3.min(tempVariance, (d) => d.variance), d3.max(tempVariance, (d) => d.variance)])
    .range(colors);
  
   const xAxis = d3.axisBottom()
                   .scale(xScale)
                   .tickFormat(d => d);
  
   const yAxis = d3.axisLeft()
                   .scale(yScale)
                   .tickSize(0);
  
   svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(${margin.left}, ${innerHeight})`)
      .call(xAxis);

   svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${margin.left + margin.right}, 0)`) 
      .call(yAxis); 
  
   g.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(-90)")
     .attr("x", -innerHeight/2)
     .attr("y", -margin.top)
     .text("Month");
  
   g.append("text")
     .attr("class", "text")
     .attr("x", innerWidth/3)
     .attr("y", innerHeight + margin.right)
     .text("Year");
  
   g.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(90)")
     .attr("x", innerHeight/5)
     .attr("y", -innerWidth - margin.top)
     .text("Made by Milan V. Kecojević");
  
   g.selectAll("rect")
    .data(tempVariance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.month))
    .attr("width", innerWidth/tempVariance.length * 12)
    .attr("height", innerHeight/12)
    .attr('fill', d => colorScale(d.variance));
  
  };
 
 d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
   const data = json;
   heatmap(data);
 });


