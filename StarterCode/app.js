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
            color: 'rgb(204, 0, 153)',
        },
        
        
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 Operational Taxonomic Units, OTUs",
            font: {
                family: 'sans-serif, monospace',
                size: 12,
                color: '#9f0fd8'
              },
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };
        
        Plotly.newPlot("bar", data1, layout1);

        // 3. Create a bubble chart that displays each sample.
        // * Use `otu_ids` for the x values.
        // * Use `sample_values` for the y values.
        // * Use `sample_values` for the marker size.
        // * Use `otu_ids` for the marker colors.
        // * Use `otu_labels` for the text values. 

        var trace2 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
              color: otuIds,
              colorscale: 'Bluered',
            //   opacity: otuIds,
              size: sampleValues,
              line: {
                color: otuIds,
                colorscale: 'Bluered',
              }
            },
            type: 'scatter'
          };
          
        var data2 = [trace2];
          
        var layout2 = {
            showlegend: false,
            title: "Subject Demographics",
            font: {
                family: 'sans-serif, monospace',
                size: 12,
                color: '#9f0fd8'
              },
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values" }
        };
          
          Plotly.newPlot("bubble", data2, layout2);

//Bonus Gauge
        var trace3 = [
          {
            type: "indicator",
            mode: "gauge+number+delta",
            value: 420,
            title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
            delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
            gauge: {
              axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
              bar: { color: "darkblue" },
              bgcolor: "white",
              borderwidth: 2,
              bordercolor: "gray",
              steps: [
                { range: [0, 250], color: "cyan" },
                { range: [250, 400], color: "royalblue" }
              ],
              threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 490
              }
            }
          }
        ];
        var data3 = [trace3];
        var layout3 = {
          width: 500,
          height: 400,
          margin: { t: 25, r: 25, l: 25, b: 25 },
          paper_bgcolor: "lavender",
          font: { color: "darkblue", family: "Arial" }
        };
      
          Plotly.newPlot("gauge", data3, layout3);
        });
      }

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