export function drawChartCasesIndia(label,confirmedCasesDaily,recoveredCasesDaily,deceasedCasesDaily){
    var ctx = document.getElementById('casesChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: label,
            datasets: [{
                label: 'Daily Confirmed Cases',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: confirmedCasesDaily,
                fill: false
            },
            {
                label: 'Daily Recovered Cases',
                borderColor: 'rgba(75, 192, 192, 1)',
                data: recoveredCasesDaily,
                fill: false
            },
            {
                label: 'Daily Deceased Cases',
                borderColor: 'rgba(102, 102, 102, 1)',
                data: deceasedCasesDaily,
                fill: false
            }]
        },

        // Configuration options go here
        options: {
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            title: {
                display: true,
                text: 'Daily COVID-19 Cases',
                fontSize: 14

            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display:true
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Count'
                    },
                    gridLines: {
                        display:true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

export function drawChartCasesCumulativeIndia(label,confirmedCasesCumulative,recoveredCasesCumulative,deceasedCasesCumulative){
    var ctx = document.getElementById('casesCumulativeChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: label,
            datasets: [{
                label: 'Total Confirmed Cases',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: confirmedCasesCumulative,
                fill: false
            },
            {
                label: 'Total Recovered Cases',
                borderColor: 'rgba(75, 192, 192, 1)',
                data: recoveredCasesCumulative,
                fill: false
            },
            {
                label: 'Total Deceased Cases',
                borderColor: 'rgba(102, 102, 102, 1)',
                data: deceasedCasesCumulative,
                fill: false
            }]
        },

        // Configuration options go here
        options: {
            tooltips: {
                mode: 'index',
                intersect: false,
            },
                hover: {
                mode: 'nearest',
                intersect: true
            },
            title: {
                display: true,
                text: 'Cumulative COVID-19 Cases',
                fontSize: 14

            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Count'
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

export function drawChartTestingIndia(label,totalsamplestested){
    var ctx = document.getElementById('testsChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: label,
            datasets: [{
                label: 'Total Samples Tested',
                data: totalsamplestested,
                backgroundColor: 'rgba(204,101,254,0.7)'
            }]
        },

        // Configuration options go here
        options: {
            tooltips: {
                mode: 'index',
                intersect: false,
            },
                hover: {
                mode: 'nearest',
                intersect: true
            },
            title: {
                display: true,
                text: 'COVID-19 Testing',
                fontSize: 14

            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Count'
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}