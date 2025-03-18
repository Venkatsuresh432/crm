<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
	import { text } from "@sveltejs/kit";
    let canvases = [];
    let charts = [{
            type: "bar",
            data: [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
            label: "Blogs"
        },
        {
            type: "line",
            data: [5, 6, 4, 8, 7, 3, 5, 7, 9, 4, 6, 8],
            label: "Users"
        },
        {
            type: "pie",
            data: [12, 19, 3, 5, 2, 3],
            label: "Product Sales (Pie Chart)"
        },
        {
            type: "doughnut",
            data: [10, 15, 5, 8, 7],
            label: "Customer Distribution"
        },
        {
            type: "radar",
            data: [4, 3, 7, 6, 8, 5, 9],
            label: "Api Integration"
        },
        {
            type: "polarArea",
            data: [9, 4, 7, 5, 6],
            label: "Market Share"
        }
    ];
    onMount(() => {
        canvases.forEach((canvas, index) => {
            if (canvas) {
                new Chart(canvas.getContext("2d"), {
                    type: charts[index].type,   
                    data: {
                        labels: charts[index].type === "pie" || charts[index].type ===
                            "doughnut" || charts[index].type === "polarArea" ?
                            ["A", "B", "C", "D", "E", "F"] :
                            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                                "Oct", "Nov", "Dec"
                            ],
                        datasets: [{
                            label: charts[index].label,
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56",
                                "#4BC0C0", "#9966FF", "#FF9F40"
                            ],
                            borderColor: "#fff",
                            data: charts[index].data
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: charts[index].type === "pie" || charts[index].type ===
                            "doughnut" || charts[index].type === "polarArea" ?
                            {} :
                            {
                                x:{
                                   title:{
                                        display:true,
                                        text : charts[index].type === "bar" ? "Months" : '' ||
                                               charts[index].type === "line" ? "Months" : '' ||
                                               charts[index].type === "radar" ? "Months" : ''
                                   }
                                },
                                y: {
                                   title:{
                                        display:true,
                                        text:charts[index].type === "bar" ? "Data" : '' ||
                                             charts[index].type === "line" ? "Data" : '' ||
                                             charts[index].type === "radar" ? "Data" : ''
                                    },
                                    beginAtZero: true
                                }
                            }
                    }
                });
            }
        });
    });
</script>

<div class="row">
    {#each charts as chart, i}
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">{chart.label}</div>
                </div>
                <div class="card-body">
                    <div class="chart-container">
                        <canvas bind:this={canvases[i]}></canvas>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>