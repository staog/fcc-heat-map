d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(json){
  const dataset = json.data;
  heatmap(dataset)
});
