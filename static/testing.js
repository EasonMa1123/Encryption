function CreateChart(){

  google.charts.load('current',{packages:['corechart']});
  google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {
  // Prepare the data from the Python variable passed into JavaScript
  var Graph_data = new google.visualization.DataTable();
  Graph_data.addColumn('number', 'X');
  Graph_data.addColumn('number', 'Values');
  var Power_input = document.getElementById('Number').value

  // The data passed from Python to JS as a list // Convert Python list to JS array
  $.post('/encryption_testing',{Power:Power_input },function(data){
    // Populate the data table with the Python data (index as X-axis)
    var Value = data.graphData
    
    for (var i = 0; i < Value.length; i++) {
      
      Graph_data.addRow([i, Value[i]]);
    }

    // Set chart options
    var options = {
        title: 'Line Chart Example',
        legend: { position: 'bottom' }
    };

    // Create the chart
    var chart = new google.visualization.LineChart(document.getElementById('myChart'));

    // Draw the chart
    chart.draw(Graph_data, options);
  })
}

