function heatmap(dataset){

  let margin = 50;
  let w = 1200;
  let h = 480;
  
  let tooltip = d3.select("#map")
                  .append("div")
                  .attr("id", "tooltip")
                  .style("opacity", 0)
  
  const svg = d3.select("#map")
                .append("svg")
                .attr("align", "centre")
                .attr("width", w)
                .attr("height", h);
  
  svg.append("text")
     .attr("class", "text")
     .attr("transform", "rotate(-90)")
     .attr("x", -130)
     .attr("y", 11)
     .text("Months");
  
  svg.append("text")
     .attr("class", "text")
     .attr("x", w/2.5 + 320)
     .attr("y", h - 30)
     .text("Years");
  
}

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
  const dataset = json.data;
  heatmap(dataset)
});
