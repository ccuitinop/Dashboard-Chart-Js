import { fetchApi } from "./fetch.js";

const rgbaRedColor = 'rgba(255, 99, 132, 0.2)'
const rgbRedColor = 'rgb(255, 99, 132)'

const rgbaOrangeColor = 'rgba(255, 159, 64, 0.2)';
const rgbOrangeColor = 'rgb(255, 159, 64)'

async function renderData() {

    const data = await fetchApi(`https://mindicador.cl/api/euro/2023`)

  
    const valores = data.serie.map(indicador => parseInt(indicador.valor, 10));

    
    const diaMes = data.serie.map(indicador => formatDateToYearMonth(indicador.fecha));


    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: diaMes,
            datasets: [{
                
                data: valores,
                borderWidth: 1,
                backgroundColor: "#5899e2",
                borderColor: "#5899e2",
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false 
                  },
                title: {
                    display: true,
                    text: 'Valor Euro Diario Acumulado Año 2023 ',
                    padding: {
                        top: 20,
                        bottom: 30
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += 'valor: ';
                            }
                            if (context.parsed.y !== null) {
                                label += 'Valor $' + " " + context.parsed.y  ;
                            }
                            return label;
                        }
                    }
                }
            },
        }
    });
}
renderData()


function formatDateToYearMonth(diaMes) {
    return new Date(diaMes).toISOString().slice(0, 10); 
    }

    Chart.defaults.color = 'rgba(255, 255, 235, 0.5)';
    Chart.defaults.font.size = 12;
    Chart.defaults.borderColor = 'rgba(255, 255, 235, 0.025)';