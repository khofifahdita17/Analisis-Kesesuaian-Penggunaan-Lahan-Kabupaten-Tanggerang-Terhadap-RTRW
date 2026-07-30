document.addEventListener("DOMContentLoaded", function () {

    const dashboard = document.getElementById("dashboard");

    dashboard.innerHTML = `

<h2 style="margin:10px 0;text-align:center;color:white;">
Dashboard Analisis Kesesuaian Penggunaan Lahan
</h2>

<div class="dashboard-info">
    <div class="item">Sesuai : <span class="sesuai">53%</span></div>
    <div class="item">Perlu Evaluasi : <span class="evaluasi">20%</span></div>
    <div class="item">Tidak Sesuai : <span class="tidak">27%</span></div>
</div>

<div class="dashboard-content">

    <div class="box">
        <h3 style="color:white;margin-bottom:10px;">
            Grafik Persentase Kesesuaian
        </h3>
        <canvas id="pieChart"></canvas>
    </div>

    <div class="box">
        <h3 style="color:white;margin-bottom:10px;">
            Grafik Luas Tiap Kategori (Ha)
        </h3>
        <canvas id="barChart"></canvas>
    </div>

    <div class="box">
        <h3 style="color:white;margin-bottom:10px;">
            Peta Lokasi (Inset Map)
        </h3>
        <div id="insetMap"></div>
    </div>

</div>
`;

    // ==========================
    // PIE CHART
    // ==========================

    const pieCtx = document.getElementById("pieChart");

    new Chart(pieCtx,{

        type:"pie",

        data:{

            labels:[
                "Sesuai",
                "Perlu Evaluasi",
                "Tidak Sesuai"
            ],

            datasets:[{

                data:[
                    12345,
                    2876,
                    654
                ],

                backgroundColor:[
                    "#7BC96F",
                    "#F6D04D",
                    "#E74C3C"
                ],

                borderColor:"#ffffff",

                borderWidth:2

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    position:"bottom"
                }

            }

        }

    });


    // ==========================
    // BAR CHART
    // ==========================

    const barCtx = document.getElementById("barChart");

    new Chart(barCtx,{

        type:"bar",

        data:{

            labels:[
                "Sesuai",
                "Perlu Evaluasi",
                "Tidak Sesuai"
            ],

            datasets:[{

                label:"Luas (Ha)",

                data:[
                    12345,
                    2876,
                    654
                ],

                backgroundColor:[
                    "#7BC96F",
                    "#F6D04D",
                    "#E74C3C"
                ]

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                y:{
                    beginAtZero:true
                }

            }

        }

    });

// ==========================
// PETA INSET
// ==========================

setTimeout(function () {

    const inset = document.getElementById("insetMap");
    if (!inset) return;

    inset.innerHTML = "";

    var insetMap = L.map("insetMap",{
        attributionControl:false,
        zoomControl:true,
        dragging:true,
        scrollWheelZoom:true,
        doubleClickZoom:true,
        boxZoom:true,
        keyboard:true,
        touchZoom:true
    });

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom:19
        }
    ).addTo(insetMap);

    // Fokus awal ke Kabupaten Tangerang
    insetMap.setView([-6.18,106.53],10);

    // Kotak extent peta utama
    var kotak = L.rectangle(
[
    [-6.25,106.43],
    [-6.04,106.64]
],
{
    color:"#ff0000",
    weight:2,
    fill:false
}).addTo(insetMap);

    // Hanya kotaknya yang mengikuti peta utama
    map.on("moveend zoomend", function () {

    var b = map.getBounds();

    kotak.setBounds([
        [
            b.getSouth() + 0.30,
            b.getWest() - 0.100
        ],
        [
            b.getNorth() - 0.60,
            b.getEast() - 0.100
        ]
    ]);

});

},300);
});