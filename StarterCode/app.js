// 1. Use the D3 library to read in samples.json.
function buildDemos(test) {
    d3.json("samples.json").then((data) => {
        var demographics = data.metadata;
        
        var testData = demographics.filter(testObj => testObj.id == test);
        var filteredData = testData[0];
        
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        
        Object.entries(filteredData).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
});
}

function plotSubject(test) {
    d3.json("samples.json").then((data) => {
        
        var subject = data.samples;
        
        var testData = subject.filter(testObj => testObj.id == test);
        var filteredData = testData[0];
        
        var otuIds = filteredData.otu_ids;
        var otuLabels = filteredData.otu_labels;
        var sampleValues = filteredData.sample_values;

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// * Use `sample_values` as the values for the bar chart.
// * Use `otu_ids` as the labels for the bar chart.
// * Use `otu_labels` as the hovertext for the chart.
        var trace1 = {
        x: sampleValues.slice(0, 10).reverse(),
        y: otuIds.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
            color: 'purple'
        },
        
        
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 Operational Taxonomic Units, OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };
        
        Plotly.newPlot("bar", data1, layout1);
    });
}

// 3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values. 
// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// 6. Update all of the plots any time that a new sample is selected. 
function init() {
    d3.json("samples.json").then((data) => {

        var testSubject = d3.select("#selDataset");

        data.names.forEach((ids) => {
            testSubject
              .append("option")
              .text(ids)
              .property("value", ids)
          })
      
          subjectOne = data.names[0];
      
          buildDemos(subjectOne);
          plotSubject(subjectOne);
      
        })
      }
      
      function optionChanged(subjectID) {
      
        buildDemos(subjectID);
        plotSubject(subjectID);
      }
      

  init();