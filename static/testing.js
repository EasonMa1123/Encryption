google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // Prepare the data from the Python variable passed into JavaScript
  var Graph_data = new google.visualization.DataTable();
  Graph_data.addColumn('number', 'X');
  Graph_data.addColumn('number', 'Values');

  // The data passed from Python to JS as a list // Convert Python list to JS array
  $.post('/encryption_testing',function(data){
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

function call_test_data(){
    $.post('/encryption_testing',function(data){
        alert(Object.entries(data.graph_data))
        return Object.entries(data.graph_data)
    })
}

