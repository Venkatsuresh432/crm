<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    let canvas;
    onMount(() => {
        var barChart = canvas.getContext("2d");
        new Chart(barChart, {
            type: "bar",
            data: {
                labels: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                datasets: [{
                    label: "Sales",
                    backgroundColor: "rgb(23, 125, 255)",
                    borderColor: "rgb(23, 125, 255)",
                    data: [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        });
    });
</script>

<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <div class="card-title">Blogs</div>
            </div>
            <div class="card-body">
                <div class="chart-container">
                    <canvas bind:this={canvas}></canvas>
                </div>
            </div>
        </div>
    </div>

    
</div>