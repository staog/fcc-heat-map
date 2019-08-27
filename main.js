function heatmap(dataset){

  let margin = 50;
  let w = 1200;
  let h = 480;
  
  const svg = d3.select("#map")
                .append("svg")
                .attr("align", "centre")
                .attr("width", w)
                .attr("height", h);
  
}

d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
  const dataset = json.data;
  heatmap(dataset)
});
