Papa.parse('HollywoodsMostProfitableStories.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    console.log("running");
    console.log(results.data);
    const tbody = document.querySelector('#dataTable tbody');
 
    results.data.forEach(row => {
 
      const tr = document.createElement('tr');
 
      tr.innerHTML = `
        <td>${row.Film}</td>
        <td>${row.Genre}</td>
        <td>${row.LeadStudio}</td>
        <td>${row.Audience}</td>
        <td>${row.Profitability}</td>
        <td>${row.RottenTomatoes}</td>
        <td>${row.WorldwideGross}</td>
        <td>${row.Year}</td>
      `;
 
      tbody.appendChild(tr); 
    });
  },
 
  error: function(err) {
    console.error("FAILED");
    console.error(err);
  }
});
