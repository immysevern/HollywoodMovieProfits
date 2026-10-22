Papa.parse('HollywoodsMostProfitableStories.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
 
  complete: function(results) {
 
    const labels = [];
    const values = [];
 
    results.data.forEach(row => {
      labels.push(row.Film);
      values.push(cleanNumber(row.RottenTomatoes));
    });
 
    new Chart(
      document.getElementById('revenueChart'),
      {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'RottenTomatoes',
            data: values,
            backgroundColor: '#4e79a7'
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'RottenTomatoes'
              }
            }
          }
        }
      }
    );
  }
});
function cleanNumber(value) {
  return Number(
    String(value).replace(/[^0-9.-]/g, '')
  );
}
