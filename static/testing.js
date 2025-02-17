var DataGraph
var min_Power_input
var str_length_index
var str_length_grow

function CreateChart() {
  var Power_input = document.getElementById('Number').value;
  var max_text_length_input = document.getElementById('max-text-length').value;
  min_Power_input = document.getElementById('min-power').value;
  var trial_num = document.getElementById('trial_num').value;
  if (document.getElementById("expon-length").checked){
    str_length_grow = "exp"
  } else{
    str_length_grow = "mul"
  };
  str_length_index = document.getElementById('str-length-index').value;
  // Make a POST request to fetch the data
  $.post('/encryption_testing', { Power: Power_input,
    max_text_length:max_text_length_input,
    min_power:min_Power_input,
    trial_num:trial_num,
    Str_grow:str_length_grow,
    str_index:str_length_index}, function (data) {
      DataGraph = data.graphData
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);
    })
}

function drawChart() {
  // Prepare the chart container

    var Graph_data = new google.visualization.DataTable();

    // Define columns
    Graph_data.addColumn('number', 'X');
    var lineData = DataGraph.split(','); // Split by comma to get each line
    var numLines = lineData.length;

    // Add a column for each line in the graph
    for (var i = 0; i < numLines; i++) {
        Graph_data.addColumn('number', `Text split per power of ${i+Number(min_Power_input)}`);
    }
    

    // Parse the data and prepare rows
    var maxPoints = 0;
    var parsedData = lineData.map(line => line.split(':').map(Number));
    maxPoints = Math.max(...parsedData.map(line => line.length));

    // Create rows with X values and line values
    for (var x = 0; x < maxPoints; x++) {
      if (str_length_grow == "exp"){
        var row = [str_length_index**x]; // First column is X
      }else {
        var row = [str_length_index*x];
      }
        
        for (var i = 0; i < numLines; i++) {
            row.push(parsedData[i][x] || null); // Add Y values or null for missing points
        }
        Graph_data.addRow(row);
    }
    
    if(document.getElementById("normal-scale").checked){
      var scale_type = ''
    }else{
      var scale_type = 'log'
    }

    var trendlines = {};
    for (var i = 0; i < numLines; i++) {
        trendlines[i] = {showR2: true, visibleInLegend: true}; // You can customize the trendline type (linear, exponential, etc.)
    }
    

    // Set chart options
    var options = {
        title: 'Time complexity of Different Text Split',
        legend: { position: 'bottom' },
        vAxis:{
          title:"Time(s)"
        },
        hAxis:{
          title:"String Length",
          scaleType: scale_type
          
        },
        trendlines: trendlines
    };
    
    // Create and draw the chart
    var chart = new google.visualization.ScatterChart(document.getElementById('myChart'));
    chart.draw(Graph_data, options);
    
    alert("Done!")
  
  
}


function return_home(){
    document.location.href = "/index";
}
