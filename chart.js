//console.log("Hello world")
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    //console.log(data);
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
} 

// Create the buildCharts function.
function buildCharts(sample) {
// Use d3.json to load and retrieve the samples.json file 
  
  d3.json("samples.json").then((data) => {
// Create a variable that holds the samples array. 
  var samples1=data.samples;

// Create a variable that filters the samples for the object with the desired sample number.
  var resultArray1=samples1.filter(sampleObj => sampleObj.id == sample);
//  Create a variable that holds the first sample in the array.
  var result1=resultArray1[0];

// Create variables that hold the otu_ids, otu_labels, and sample_values.
   //var otu_ids, otu_labels, sample_values
   var ids=result1.otu_ids;
   var labels=result1.otu_labels;
   var sample_values=result1.sample_values;
   console.log(ids);
   //console.log(ids);
   //console.log(sample_values);

  // Create the yticks for the bar chart.
  // Hint: Get the the top 10 otu_ids and map them in descending order  
  // so the otu_ids with the most bacteria are last. 
   var yticks = ids.slice(0,10).map(id => "OTU " + id).reverse();
   //console.log(yticks)
   var xticks = sample_values.slice(0,10).reverse();
   var text_=labels.slice(0, 10).reverse();

  // Create the trace for the bar chart. 
  var barData=[
 {
    x: xticks,
    y: yticks,
    text:text_,
    type: "bar",
    orientation: "h"
 }
];
  // Create the layout for the bar chart. 
   var barLayout = {
     title:"Top 10 Bacteria Cultures Found"
    };
  // Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout);

  });
  }


 