function heatmap(data){
  
   const variance = data.monthlyVariance;
   const base = data.baseTemperature;
  
   console.log(variance, base)
  
   const width = 1200;
   const height = 600;
  
   const margin = {
     top: 20,
     right: 20,
     bottom: 20,
     left: 20
   };
  
   const innerWidth = width - margin.left - margin.right;
   const innerHeight = height - margin.top - margin.bottom;
  
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

   const colorSelector = temperature => {
	let color = '';
	if(temperature >= 0 && temperature < 2.8)
	  color = colors[0];
	else if (temperature >= 2.8 && temperature < 3.9)
	  color = colors[1];
	else if (temperature >= 3.9 && temperature < 5.0)
	  color = colors[2];
	else if (temperature >= 5.0 && temperature < 6.1)
	  color = colors[3];
	else if (temperature >= 6.1 && temperature < 7.2)
	  color = colors[4];
	else if (temperature >= 7.2 && temperature < 8.3)
	  color = colors[5];
	else if (temperature >= 8.3 && temperature < 9.5)
	  color = colors[6];
	else if (temperature >= 9.5 && temperature < 10.6)
	  color = colors[7];
	else if (temperature >= 10.6 && temperature < 11.7)
	  color = colors[8];
	else if (temperature >= 11.7 && temperature < 12.8)
	  color = colors[9];
	else 
	  color = colors[10];
	return color;
	 };
  
   const main = d3.select("#main");
   
   main.append("h1")
          .attr("id", "title")
          .text("Monthly global land-surface temperature");
  
   main.append("h2")
          .attr("id", "description")
          .html(variance[0].year + " - " + variance[variance.length - 1].year + ": Base temperature " + base + "&#8451;");
  
   const svg = main.append("svg")
                   .attr("align", "centre")
                   .attr("width", width - margin.left - margin.right)
                   .attr("height", height - margin.top - margin.bottom);
   
   let tooltip = main.append("div")
                     .attr("id", "tooltip")
                     .style("opacity", 1)
                     .text('hello there i love you all');
  
   const yScale = d3.scaleBand()
                    .domain(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
                    .range([margin.top, 480]);
  
   const xScale = d3.scaleLinear()
                   .domain([variance[0].year, variance[variance.length - 1].year])
                   .range([margin.left, width - (9 * margin.right)]);
  
   svg.append("text")
      .attr("class", "text")
      .attr("transform", "rotate(-90)")
      .attr("x", - height/2)
      .attr("y", margin.left)
      .text("Months");
  
   svg.append("text")
     .attr("class", "text")
     .attr("x", width / 2)
     .attr("y", height - margin.bottom * 3)
     .text("Years")
  
   svg.append("text")
     .attr("class", "signature")
     .attr("transform", "rotate(90)")
     .attr("x", height/4)
     .attr("y", - width + 3 * margin.right)
     .text("Made by Milan V. Kecojević");
  
   const xAxis = d3.axisBottom()
                   .scale(xScale)
                   .tickFormat(d => d);
  
   const yAxis = d3.axisLeft(yScale);
  
   svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(100, 500)")
      .call(xAxis);

   svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(120, " + margin.top + ")") 
      .call(yAxis);  
  
   const g = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top}`)
  
   g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "cell");
   
 };
 
 d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
   const data = json;
   heatmap(data);
 });

