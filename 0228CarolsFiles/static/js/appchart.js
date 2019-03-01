
// function buildMetadata(sample) {
//   console.log('buildMetadata');
//   // @TODO: Complete the following function that builds the metadata panel

//   // Use `d3.json` to fetch the metadata for a sample

//   d3.json(`/metadata/${sample}`).then((sampleMetadata) => {
//     // Use d3 to select the panel with id of `#sample-metadata`
//     console.log(sampleMetadata)
//     var ulMetadata = d3.select("#metadataList");
//     // Use `.html("") to clear any existing metadata
//     ulMetadata.html("");
//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//     Object.entries(sampleMetadata).forEach(([key, value]) => {
//       ulMetadata
//         .append("li")
//         .text(`${key}:${value}`)
//     })
//   });

  // BONUS: Build the Gauge Chart
  // buildGauge(data.WFREQ);
// }


// Build a Bubble Chart using the school ranking data
    //https://plot.ly/python/bubble-charts/
function buildCharts(school_type) {
  console.log('buildCharts');
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json('/school_ranking_all/').then((result) => {
    console.log("in promise");
    var Name = result.Name;
    var Ranking = result.Ranking;
    var Address = result.Addres;
    var Median_Price = result.Median_Price;

    var sizes =Median_Price.map(x=>x/10000);
    console.log(sizes);

    var bubbleData = [{
      mode: 'markers',
      x: Ranking,
      y: Median_Price,
      text: Name,
      title: "High School Ranking and Median Price",
      marker: { color: Ranking, colorscale: 'Blues', size: sizes}
    }];

    var layout = {
      showlegend: false,
      height: 600,
      width: 1200
    };

    try { Plotly.newPlot('bubble', bubbleData, layout); }
    catch (error) { console.log("plotly fail with " + error) }
  });

    // @TODO: Build a Bubble Chart using the sample data
    //https://plot.ly/python/bubble-charts/
  //   d3.json('/school_ranking_all/' + sample).then((sample) => {
  //     var otu_ids = sample.otu_ids;
  //     var otu_labels = sample.otu_labels;
  //     var sample_values = sample.sample_values;


  //   var bubbleData = [{
  //     mode: 'markers',
  //     x: otu_ids,
  //     y: sample_values,
  //     text: otu_labels,
  //     marker: { color: otu_ids, colorscale: 'Rainbow', size: sample_values }
  //   }];


  //   var layout = {
  //     showlegend: false,
  //     height: 600,
  //     width: 1200
  //   };
  //   console.log('Stuff')
  //   Plotly.newPlot('bubble', bubbleData, layout);
  //   console.log('other stuff')

  // });
}

// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("/names").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// function optionChanged(schoolName) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(school_type);
//   buildMetadata(school_type);
// }

// Initialize the dashboard
// init();
buildCharts("school_type");