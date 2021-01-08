export var chart4;
export var chart5; 
export var chart6;

export function drawChartCasesState(label,confirmedCasesCumulativeState,recoveredCasesCumulativeState,deceasedCasesCumulativeState){
    var ctx1 = document.getElementById('casesChartState').getContext('2d');
    chart4 = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: label,
            datasets: [{
                label: 'Daily Confirmed Cases',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: confirmedCasesCumulativeState,
                fill: false
            },
            {
                label: 'Daily Recovered Cases',
                borderColor: 'rgba(75, 192, 192, 1)',
                data: recoveredCasesCumulativeState,
                fill: false
            },
            {
                label: 'Daily Deceased Cases',
                borderColor: 'rgba(102, 102, 102, 1)',
                data: deceasedCasesCumulativeState,
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
                text: 'COVID-19 Cases',
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

export function drawChartTestingState(label,totalTest,totalPositiveTest,totalNegativeTest){
    var ctx2 = document.getElementById('testChartState').getContext('2d');
    chart5 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: label,
            datasets: [{
                label: 'Daily Tests',
                borderColor: '#cc65fe',
                data: totalTest,
                fill: false
            },
            {
                label: 'Negative Cases',
                borderColor: '#36a2eb',
                data: totalNegativeTest,
                fill: false
            },
            {
                label: 'Positive Test',
                borderColor: '#ff6384',
                data: totalPositiveTest,
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
                text: 'Cumulative COVID-19 Tests',
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

export function drawChartTestingRateState(label,testPositivityRate){
    var ctx3 = document.getElementById('testChartPositiveRateState').getContext('2d');
    chart6 = new Chart(ctx3, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: label,
            datasets: [{
                label: 'Testing Positive Rate',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: testPositivityRate,
                backgroundColor: 'rgba(204,101,254,0.7)',
                borderWidth: 2
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
                text: 'COVID-19 Testing-Positive-Rate',
                fontSize: 14

            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Testing-Positive-Rate %'
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}