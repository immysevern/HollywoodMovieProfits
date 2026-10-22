Papa.parse('HollywoodsMostProfitableStories.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
 
  complete: function(results) {
 
    const labels = [];
    const values = [];
 
    results.data.forEach(row => {
      labels.push(row.Platform);
      values.push(cleanNumber(row.Year));
    });
 
    new Chart(
      document.getElementById('revenueChart'),
      {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Year',
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
                text: 'Year'
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
