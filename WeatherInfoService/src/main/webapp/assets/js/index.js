$(function() {
    let ctx = $("#regional_status");
    let regionalChart = new Chart(ctx, {
        type:'bar',
        options:{
            responsive:false
        },
        data:{
            labels:['seoul', 'daegu', 'incheon', 'busan', 'gyeongnam', 'gyeongbuk', 'chungnam', 'gangwon', 
            'daejeon', 'chungbuk', 'gwangju', 'ulsan', 'jeonbuk', 'jeonnam', 'jeju', 'sejong'],
            datasets:[{
                label:"2021-08-09 신규확진",
                data:[415, 408, 86, 123, 88, 30, 68, 24, 42, 39, 19, 25, 21, 14, 11, 1],
                backgroundColor:['rgba(216, 178, 218, 0.733)']
            }]
        }
    });

    let ctx2 = $("#confirmed_chart");
    let confirmed_chart = new Chart(ctx2, {
        type:"pie",
        options:{
            responsive:false
        },
        data:{
            labels:["확진", "음성"],
            datasets:[
                {
                    label:"확진/음성",
                    data:[100, 200],
                    backgroundColor:["rgba(255, 0, 0, 0.4)", "rgba(0,0,255,0.4)"]
                }
            ]
        }
    })
    let ctx3 = $("#vaccine_chart");
    let vaccineChart = new Chart(ctx3, {
        type:'bar',
        options:{
            responsive:false
        },
        data:{
            labels:['seoul', 'daegu', 'incheon', 'busan', 'gyeongnam', 'gyeongbuk', 'chungnam', 'gangwon', 
            'daejeon', 'chungbuk', 'gwangju', 'ulsan', 'jeonbuk', 'jeonnam', 'jeju', 'sejong'],
            datasets:[{
                label:"2021-08-09 1차 접종현황",
                data:[415, 408, 86, 123, 88, 30, 68, 24, 42, 39, 19, 25, 21, 14, 11, 1],
                backgroundColor:['rgba(30, 255, 30, 0.7)']
            },
            {
                label:"2021-08-09 2차 접종현황",
                data:[415, 408, 86, 123, 88, 30, 68, 24, 42, 39, 19, 25, 21, 14, 11, 1],
                backgroundColor:['rgba(30, 30, 255, 0.7)']
            }]
        }
    });
})