const ctx = document.getElementById('stats').getContext('2d');

export function createChart(stats) {
    const data = {
        labels: [
            'HP',
            'Attack',
            'Defense',
            ['Special', 'Attack'],
            ['Special', 'Defense'],
            'Speed',
        ],
        datasets: [{
            data: stats,
            fill: true,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'rgb(255, 255, 255)',
            pointBackgroundColor: 'rgb(0, 0, 0)',
            pointBorderColor: 'white',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };


    return new Chart(ctx, {
        type: 'radar',
        data,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'white'
                    },

                    pointLabels: {
                        color: 'white'
                    },

                    angleLines: {
                        color: 'white'
                    }
                }
            }
        }
    });
}