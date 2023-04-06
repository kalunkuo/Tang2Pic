
loadStyleData();
let poemData_style;
function loadStyleData() {
    d3.csv('data/poetrySchool.csv', row => {

        return row
    }).then(csv => {
        poemData_style = csv;
        filterPoem(poemData_style);
    });
}


let poemStyle_button = 'Frontier fortress';
function filterPoem(){

    let button_chart = document.getElementsByName('poemStyle');
    for (i = 0; i < button_chart.length; i++) {
        if (button_chart[i].checked)
            poemStyle_button = button_chart[i].value;
    }
    console.log(poemStyle_button);

    let displayData = [];
    for (let i=0; i<poemData_style.length; i++) {
        if(poemData_style[i]['School_e'] === poemStyle_button){
            displayData.push(poemData_style[i]);
        }
    }
    console.log(displayData.length);
    // displayPoem(displayData);

}


let poemMountain_e = ['After the new rain in the empty mountains,',
                    'the weather is late to autumn.',
                    'The bright moon shines among the pines,',
                    'and the clear spring stones flow upwards.',
                    'The bamboo noise returns to Huannu,',
                    'and the lotus moves off the fishing boat.',
                    'Break free to Chun-fang,',
                    'Sun-self to stay.'];

let poemMountain_c = ['空山新雨后', '天气晚来秋', '明月松间照', '清泉石上流','竹喧归浣女','莲动下渔舟','随意春芳歇','王孙自可留']

let poemMountain = [];

for(let i=0; i<poemMountain_c.length; i++){
    poemMountain.push({
        "verse_c": poemMountain_c[i],
        "verse_e": poemMountain_e[i],
        "order": i+1
    })
}

console.log(poemMountain)


const mg_3_3 = {top: 0, right: 0, bottom: 0, left: 0};
const wd_3_3= document.getElementById('viz3_3').getBoundingClientRect().width - mg_3_3.left - mg_3_3.right;
const ht_3_3 = document.getElementById('viz3_3').getBoundingClientRect().height - mg_3_3.top - mg_3_3.bottom;

const svg_3_3 = d3.select('#viz3_3').append("svg")
    .attr("width", wd_3_3 + mg_3_3.left + mg_3_3.right)
    .attr("height", ht_3_3 + mg_3_3.top + mg_3_3.bottom)
    .append("g")
    .attr("transform", "translate(" + mg_3_3.left + "," + mg_3_3.top + ")");
var defs = svg_3_3.append("defs");

displayPoemVerse();

function displayPoemVerse(){

    var elem = svg_3_3.selectAll("g").data(poemMountain)
    var elemEnter = elem.enter().append("g")

    var poemMountainTxt = elemEnter.append("text")
        .classed("poemMountainTxt", true)
        .attr("dx", (d,i)=>(wd_3_3-80*8)/2+80*i)
        .attr("dy", 0)
        .attr('fill', 'rgb(231,231,231)')
        .attr("writing-mode", "vertical-rl")
        .attr("letter-spacing", "10px")
        .attr("font-family", 'DFKai-sb')
        .attr("font-size", 30)
        .text(d=>d['verse_c']);

    var poemMountainTxt_e= elemEnter.append("text")
        .classed("poemMountainTxt_e", true)
        .attr("dx", (d,i)=>(wd_3_3-80*8)/2+80*i+30)
        .attr("dy", 0)
        .attr('fill', 'rgba(255,255,255,0.8)')
        .attr("font-family", "Roboto Light")
        .attr("writing-mode", "vertical-rl")
        .attr("font-size", 15)
        .text(d=>d['verse_e']);

    var poeMountainmImg = svg_3_3.append("svg:image")
        .classed("poemImg", true)
        .attr("x", wd_3_3/2-256/2)
        .attr("y", ht_3_3-256-200)
        .attr("width", 256)
        .attr("height", 256)
        // .attr("xlink:href", "img/Poem/Mountain/Mountain Dwelling in Autumn_v1.png")
        .style("opacity", 0.9)

    elemEnter.on('mouseover', function(event, d) {
        let mouse = d3.pointer(event);
        console.log(d)

        svg_3_3.selectAll(".poemImg")
            .style("opacity", 1)
            .attr("xlink:href", "img/Poem/Mountain/Mountain Dwelling in Autumn_v"+d.order+".png")
    })
        .on("mouseout", function(event,d){
            svg_3_3.selectAll(".poemImg")
                .style("opacity", 0)
        })


}

