$.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
});

$(function() {
    var coronaWeeksChart = new Chart($("#accDecideChart"), {
        type:"line",
        options:{
            responsive:false,
        },
        data:{
            labels:null,
            datasets:[{
                label:'코로나 누적 확진',
                data:null,
                backgroundColor:[
                    'rgba(200, 70, 100, 0.5)'
                ]
            }]
        }
    });

    var coronaVaccineWeeksChart = new Chart($("#accVaccineChart"), {
        type:"line",
        options:{
            responsive:false,
        },
        data:{
            labels:null,
            datasets:[{
                label:'백신 접종 누적',
                data:null,
                backgroundColor:[
                    'rgba(200, 70, 100, 0.5)'
                ]
            }]
        }
    });

    $("#date").datepicker();
    $("#date").datepicker("setDate", new Date());
    $("#date").change(function(){
        let region = $("#region_select").find("option:selected").val();
        let date = $("#date").val();
        getCoronaSidoInfo(region, date);
        getCoronaVaccineInfo(region, date);
    })
    $("#region_select").change(function(){
        let region = $("#region_select").find("option:selected").val();
        let date = $("#date").val();
        getCoronaSidoInfo(region, date);
        getCoronaVaccineInfo(region, date);
    });

    getCoronaSidoInfo("서울");
    getCoronaVaccineInfo("서울");

    function getCoronaSidoInfo(sido, date) {
        let url = "http://localhost:8077/api/regional?region="+sido;
        if(date != undefined && date != null && date != '') {
            url += "&date="+date
        }
        $.ajax({
            type:"get",
            url:url,
            success:function(r) {
                console.log(r);
                if(r.coronaWeeksList != null) {
                    let coronaWeeksLabel = new Array();
                    let coronaWeeksData = new Array();
                    for(let i=0; i<r.coronaWeeksList.length; i++) {
                        coronaWeeksLabel.push(r.coronaWeeksList[i].date);
                        coronaWeeksData.push(r.coronaWeeksList[i].defCnt);
                    }

                    coronaWeeksChart.data.datasets = new Array();
                    coronaWeeksChart.data.labels = coronaWeeksLabel;
                    coronaWeeksChart.data.datasets.push({
                        label:'코로나 누적 확진',
                        data:coronaWeeksData,
                        backgroundColor:['rgba(200, 70, 100, 0.5)']
                    });
                    coronaWeeksChart.update();

                    // var coronaWeeksChart = new Chart($("#accDecideChart"), {
                    //     type:"line",
                    //     options:{
                    //         responsive:false
                    //     },
                    //     data:{
                    //         labels:coronaWeeksLabel,
                    //         datasets:[{
                    //             label:'코로나 누적 확진',
                    //             data:coronaWeeksData,
                    //             backgroundColor:[
                    //                 'rgba(200, 70, 100, 0.5)'
                    //             ]
                    //         }]
                    //     }
                    // });
                }

                if(r.dangerAge == null) {
                    $("#dangerAge").html("-");
                }
                else {
                    $("#dangerAge").html(r.dangerAge+"대");
                }
                if(r.data == null) {
                    $("#accDecideCnt").html("-");
                    $("#newDecideCnt").html("-");
                    $("#isolateCnt").html("-");
                    $("#clearIsolateCnt").html("-");
                    $("#covidDanger span").css("display", "none");
                    $("#covidDanger span").eq(0).css("display", "inline").css("color", "#66ff99");
                    return;
                }
                $("#accDecideCnt").html(r.data.defCnt);
                $("#newDecideCnt").html(r.data.incDec);
                $("#isolateCnt").html(r.data.isolIngCnt);
                $("#clearIsolateCnt").html(r.data.isolClearCnt);
                $("#covidDanger span").css("display", "none");
                let danger = r.data.incDec + r.data.diff;
                if(danger >= 200) {
                    $("#covidDanger span").eq(3).css("display", "inline").css("color", "#ff0000");
                }
                else if(danger >=100) {
                    $("#covidDanger span").eq(2).css("display", "inline").css("color", "#ffcc66");
                }
                else if(danger >=100) {
                    $("#covidDanger span").eq(1).css("display", "inline").css("color", "#ffcc66");
                }
                else {
                    $("#covidDanger span").eq(0).css("display", "inline").css("color", "#ffff99");
                }
            }
        })
    };

    function getCoronaVaccineInfo(sido, date) {
        let url = "/api/regional/vaccine?region="+sido;
        if(date != undefined && date != null & date != '') {
            url += "&date="+date;
        }
        $.ajax({
            type:"get",
            url:url,
            success:function(r) {
                console.log(r);
                if(r.coronaVaccineWeeksList != null) {
                    let coronaVaccineWeeksLabel = new Array();
                    let coronaVaccineWeeksData1 = new Array();
                    let coronaVaccineWeeksData2 = new Array();
                    for(let i=0; i<r.coronaVaccineWeeksList.length; i++) {
                        coronaVaccineWeeksLabel.push(r.coronaVaccineWeeksList[i].date);
                        coronaVaccineWeeksData1.push(r.coronaVaccineWeeksList[i].accFirstCnt);
                        coronaVaccineWeeksData2.push(r.coronaVaccineWeeksList[i].accSecondCnt);
                    }

                    coronaVaccineWeeksChart.data.datasets = new Array();
                    coronaVaccineWeeksChart.data.labels = coronaVaccineWeeksLabel;
                    coronaVaccineWeeksChart.data.datasets.push({
                        label:'1차 백신 접종 누적',
                        data:coronaVaccineWeeksData1,
                        backgroundColor:['rgba(200, 70, 100, 0.5)']
                    });
                    coronaVaccineWeeksChart.data.datasets.push({
                        label:'2차 백신 접종 누적',
                        data:coronaVaccineWeeksData2,
                        backgroundColor:['rgba(100, 200, 100, 0.5)']
                    });
                    coronaVaccineWeeksChart.update();
                }

            //     if(r.status == false) {
            //         $("#vaccineFirstCnt").html("-");
            //         $("#vaccineSecondCnt").html("-");
            //         return;
            //     }
            //     $("#vaccineFirstCnt").html(r.formattedFirstCnt);
            //     $("#vaccineSecondCnt").html(r.formattedSecondCnt);
            }
        })
    };

})