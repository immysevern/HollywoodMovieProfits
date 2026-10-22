let allData = [];
let chart = null;

Papa.parse('HollywoodsMostprofitableStories.csv', {
    download: true, 
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        allData = results.data;

        populateFilter();

        drawPage(allData);

        document
            .getElementById('typeFilter')
            .addEventListener('change', filterData);
    }
});

function populateFilter() {

    const filter =
        document.getElementById('typeFilter');

    filter.innerHTML = '';

    filter.add(new Option('All Types', 'All'));

    const values =
        [...new Set(allData.map(row => row.Type))]
        .sort();

    values.forEach(value => {

        filter.add(
            new Option(value, value)
        );

    });
}

function filterData() {

    const selected =
        document.getElementById('typeFilter').value;

    let filteredData;

    if (selected === 'All') {

        filteredData = allData;

    } else {

        filteredData = allData.filter(
            row => row.Type === selected
        );

    }

    drawPage(filteredData);
}

function drawPage(data) {

    // Sort by % (highest first)

    data.sort((a, b) =>
        Number(b.RottenTomatoes) -
        Number(a.RottenTomatoes)
    );

    const tbody =
        document.querySelector('#dataTable tbody');

    tbody.innerHTML = '';

    const labels = [];
    const values = [];

    data.forEach(row => {

        // Build table row

        const tr =
            document.createElement('tr');

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

        // Build chart arrays

        labels.push(row.Film);

        values.push(
            Number(row.RottenTomatoes)
        );

    });

    // Destroy old chart if one exists

    if (chart) {
        chart.destroy();
    }

    // Create chart

    chart = new Chart(
        document.getElementById('revenueChart'),
        {
            type: 'bar',

            data: {
                labels: labels,

                datasets: [{
                    label: 'Rotten Tomatoes (%)',
                    data: values,
                    backgroundColor: '#4e79a7'
                }]
            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}
