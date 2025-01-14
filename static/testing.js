function CreateChart() {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {
  // Prepare the chart container
  var Power_input = document.getElementById('Number').value;

  // Make a POST request to fetch the data
  $.post('/encryption_testing', { Power: Power_input }, function (data) {
      var Graph_data = new google.visualization.DataTable();

      // Define columns
      Graph_data.addColumn('number', 'X');
      var lineData = data.graphData.split(','); // Split by comma to get each line
      var numLines = lineData.length;

      // Add a column for each line in the graph
      for (var i = 0; i < numLines; i++) {
          Graph_data.addColumn('number', `Text split per power of ${i+1}`);
      }

      // Parse the data and prepare rows
      var maxPoints = 0;
      var parsedData = lineData.map(line => line.split(':').map(Number));
      maxPoints = Math.max(...parsedData.map(line => line.length));

      // Create rows with X values and line values
      for (var x = 0; x < maxPoints; x++) {
          let row = [x]; // First column is X
          for (var i = 0; i < numLines; i++) {
              row.push(parsedData[i][x] || null); // Add Y values or null for missing points
          }
          Graph_data.addRow(row);
      }

      // Set chart options
      var options = {
          title: 'Time complexity of Different Text Split',
          legend: { position: 'bottom' },
      };

      // Create and draw the chart
      var chart = new google.visualization.LineChart(document.getElementById('myChart'));
      chart.draw(Graph_data, options);
  });
}


function return_home(){
    document.location.href = "/index";
}
