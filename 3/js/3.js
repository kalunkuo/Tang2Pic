/* * * * * * * * * * * * * *
*          3_POEM          *
* * * * * * * * * * * * * */


//TUTORIALS-------------------------------------------------------------------------------------------------------------------------------------
// ---Drop shadows
//https://stackoverflow.com/questions/12277776/how-to-add-drop-shadow-to-d3-js-pie-or-donut-chart
//---Nested data
//https://stackoverflow.com/questions/46900028/d3-nested-variable-data-binding
//---Dall-E
//https://www.youtube.com/watch?v=sibEVMI1gWY&t=1539s


//POEM LOADING-----------------------------------------------------------------------------------------------------------------------------

// BOUNDARY
const mg_3 = {top: 0, right: 0, bottom: 0, left: 0};
const wd_3= document.getElementById('viz3_1').getBoundingClientRect().width - mg_3.left - mg_3.right;
const ht_3 = document.getElementById('viz3_1').getBoundingClientRect().height - mg_3.top - mg_3.bottom;

const svg = d3.select('#viz3_1').append("svg")
    .attr("width", wd_3 + mg_3.left + mg_3.right)
    .attr("height", ht_3 + mg_3.top + mg_3.bottom)
    .append("g")
    .attr("transform", "translate(" + mg_3.left + "," + mg_3.top + ")");
var defs = svg.append("defs");


// DROP SHADOW
var filter = defs.append("filter")
    .attr("id", "dropshadow")

filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 4)
    .attr("result", "blur");
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 2)
    .attr("dy", 2)
    .attr("result", "offsetBlur");

var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode").attr("in", "offsetBlur")
feMerge.append("feMergeNode").attr("in", "SourceGraphic");


loadIntroData();
let poem_data;
function loadIntroData() {
    d3.csv('data/poetrySchool_sm.csv', row => {

        return row
    }).then(csv => {
        poem_data = csv;
        // displayPoem(poem_data);
        // filterPoem();

        processData(poem_data)
    });
}


function processData(_data){

    var poem_dis = wd_3/_data.length;

    // APPEND POSITION OF EACH POEM
    for (let i=0; i<_data.length; i++) {
        _data[i]['pos_x'] = i*poem_dis;
        _data[i]['Order'] = i;
    }

    // SPLIT POEM VERSE INTO NESTED ARRAY: CHINESE
    for(let i=0; i<_data.length; i++){
        let conTemp = _data[i]['Content'].split(/[。，？！]/);
        let conTempArr = []
        // console.log(conTemp)

        for (let j=0; j<conTemp.length; j++){
            if(conTemp[j] != ""){
                conTempArr.push(conTemp[j].trim())
            }
        }
        _data[i]['Content_split'] = conTempArr;
    }

    // SPLIT POEM VERSE INTO NESTED ARRAY: ENGLISH
    for(let i=0; i<_data.length; i++) {
        let conTemp = _data[i]['Content_e'].split(/(?<=[.?!]\s)(?=[A-Z])/);
        let conTempArr = [];

        for (let j=0; j<conTemp.length; j++){
            let conTemp2;
            if(conTemp[j] != ""){
                conTemp2 = conTemp[j].split(",");
            }
            for(let k=0; k<conTemp2.length; k++){
                if (conTemp2[k].length < 3){
                    conTemp2[k+1] = conTemp2[k] + conTemp2[k+2];
                    delete conTemp2[k];
                }
            }
            for(let h=0; h<conTemp2.length; h++){
                if(conTemp2[h] != ""){
                    conTempArr.push(conTemp2[h])
                }
            }
        }
        _data[i]['Content_e_split'] = conTempArr;
    }

    displayPoem(_data)

}


//DISPLAY POEM-----------------------------------------------------------------------------------------------------------------------------
// POEM DISTANCE
var rect_y = ht_3-300;
var rect_wd = 500;
var rect_ht = 800;
var trans_dur = 1000;
var poem_text_y = rect_y+15;
var buff = 20;
var buff_c = 30;
var buff_e = 15;

function displayPoem(_data) {
    console.log(_data);

    // SLICING THE DATASET FOR TESTING
    // _data = _data.slice(0, 100);

    var elem = svg.selectAll("g").data(_data)
    var elemEnter = elem.enter().append("g")

    var rect = elemEnter.append("rect")
        .classed("poemRec", true)
        .attr("x", function(d,i) { return d['pos_x']; })
        .attr("y", rect_y)
        .attr("width", rect_wd)
        .attr("height", rect_ht)
        .attr("stroke-width", 0.1)
        .attr("stroke", 'rgb(0,0,0)')
        .attr('fill', 'rgb(238,238,238)')
        .attr("filter", "url(#dropshadow)")

    var poemTxt = elemEnter.append("text")
        .classed("poemTxt", true)
        .attr("dx", function(d,i) { return d['pos_x']+10; })
        .attr("dy", poem_text_y)
        .attr('fill', 'rgb(0,0,0)')
        .attr("writing-mode", "vertical-rl")
        .attr("font-size", 10)
        .text(function(d){return d.Title + "  ——  " + d.Author});

    var poemTit = elemEnter.append("text")
        .classed("poemTit", true)
        .attr("dx", function(d,i) { return d['pos_x']+buff*2; })
        .attr("dy", poem_text_y-5)
        .attr('fill', 'rgba(0,0,0,0.1)')
        .attr("writing-mode", "vertical-rl")
        .attr("font-size", 40)
        .text(function(d){return d.Title});

    var poemStyle = elemEnter.append("text")
        .classed("poemStyle", true)
        .attr("dx", function(d,i) { return d['pos_x']+rect_wd-buff; })
        .attr("dy", poem_text_y+260)
        .attr('fill', 'rgba(0,0,0,0.1)')
        .attr("font-size", 30)
        .attr("text-anchor", "end")
        .attr("font-family", 'DFKai-sb')
        .text(function(d){return d['School']});

    var poemImgBox = elemEnter.append("rect")
        .classed("poemImgBox", true)
        .attr("x", function(d,i) { return d['pos_x']+rect_wd-256-buff; })
        .attr("y", rect_y+300)
        .attr("width", 256)
        .attr("height", 256)
        .attr("stroke-width", 0.1)
        .attr("stroke", 'rgb(56,56,56)')
        .attr("fill", 'rgb(238,238,238)')

    var poemImg = elemEnter.append("svg:image")
        .classed("poemImg", true)
        .attr("x", function(d,i) { return d['pos_x']+rect_wd-256-buff; })
        .attr("y", rect_y+300)
        .attr("width", 256)
        .attr("height", 256)
        // .attr("xlink:href", "img/rural.png")
        .style("opacity", 0.9)
        .attr("xlink:href", function(d){

            // RANDOM ASSIGN IMAGES TO POEMS BASED ON STYLE
            if(d['School_e']=='Frontier fortress'){
                let poemInt = d3.randomInt(1, 28)();
                return "img/Style/Frontier/" + poemInt + ".png";
            }
            if(d['School_e']=='Reality'){
                let poemInt = d3.randomInt(1, 17)();
                return "img/Style/Reality/" + poemInt + ".png";
            }
            if(d['School_e']=='Romantic'){
                let poemInt = d3.randomInt(1, 23)();
                return "img/Style/Romantic/" + poemInt + ".png";
            }
            if(d['School_e']=='Landscape and pastoral'){
                let poemInt = d3.randomInt(1, 22)();
                return "img/Style/Rural/" + poemInt + ".png";
            }

        })
        .attr("id", function(d, i) { return "img_"+d['Order']; });

    var poemContent = elemEnter.selectAll("g")
        .data(function(d){
            return d['Content_split'];
        })
        .enter()
        .append('text')
        .classed("poemContent", true)
        .attr("x", function(d){
            let dataTemp = d3.select(this.parentNode).data();
            return dataTemp[0]['pos_x']+buff*2.125;
        })
        .attr("y", (d,i) => poem_text_y+buff*6+buff_c*i)
        .attr('fill', 'rgb(0,0,0)')
        .attr("font-size", 20)
        .attr("font-family", 'DFKai-sb')
        .text(d=>d);

    var poemContent_e = elemEnter.selectAll("g")
        .data(function(d){
            return d['Content_e_split'];
        })
        .enter()
        .append('text')
        .classed("poemContent_e", true)
        .attr("x", function(d){
            let dataTemp = d3.select(this.parentNode).data();
            return dataTemp[0]['pos_x']+rect_wd-buff;
        })
        .attr("y", (d,i) => poem_text_y+buff+buff_e*i)
        .attr('fill', 'rgb(80,80,80)')
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("font-family", 'Roboto Light')
        .text(d=>d);

    rect
        .on('mouseover', function(event, d) {
            let mouse = d3.pointer(event);

        })
        .on('click', function(event, d) {
            d3.select(this.parentNode)
                .transition()
                .ease(d3.easePoly)
                .duration(trans_dur)
                .attr('transform', 'translate(0, '+ -(rect_ht-200) +')');
        })
        .on('dblclick', function(event, d) {
            d3.select(this.parentNode)
                .transition()
                .ease(d3.easePoly)
                .duration(trans_dur)
                .attr('transform', 'translate(0, 1)');
        })
        .on('mouseout', function(event, d) {
        })

    // for (let i=0; i<dataArray[0].length; i++){
    //     let text = dataArray[0][i]['Content']
    //     if (text.includes("山")){
    //         console.log("Mountain")
    //     }else if(text.includes("水")){
    //         console.log("Water")
    //     }
    // }

}


//VISUALIZE POEM-----------------------------------------------------------------------------------------------------------------------------
const dalleEndpoint = 'https://api.openai.com/v1/images/generations';
const reqButton = document.getElementById('button-request');
const reqStatus = document.getElementById('request-status');

var selectedText = ['中国水墨画'];

function emptySelectedText(){
    selectedText = ['中国水墨画'];
    document.testform.selectedtext.value = selectedText;
}

function getSelectedText() {
    if (window.getSelection) {
        selectedText.push(window.getSelection().toString());
    }
    else if (document.getSelection) {
        selectedText.push(document.getSelection().toString());
    }
    else if (document.selection) {
        selectedText = document.selection.createRange().text;
    } else return;
    document.testform.selectedtext.value = selectedText;
    console.log(selectedText.toString());
}

reqButton.onclick = function () {

    reqButton.disabled = true;
    reqStatus.innerHTML = "Request started...";

    // Fetch image request data
    const key = document.getElementById('api-key').value;
    const count = 1;
    const size = 256;

    console.log(key)

    // Form the request body according to the API:
    // https://beta.openai.com/docs/api-reference/images/create
    const reqBody = {
        prompt: selectedText.toString(),
        n: count,
        size: size + "x" + size,
        response_format: 'url',
    };

    // Form the data for a POST request:
    const reqParams = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify(reqBody)
    }

    // Use the Fetch API to do an async POST request to OpenAI:
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    fetch(dalleEndpoint, reqParams)
        .then(res => res.json())
        .then(json => addImages(json, prompt))
        .catch(error => {
            reqStatus.innerHTML = error;
            reqButton.disabled = false;
        });
}

function addImages(jsonData, prompt) {

    // console.log(jsonData);
    reqButton.disabled = false;

    // Handle a possible error response from the API
    if (jsonData.error)
    {
        reqStatus.innerHTML = 'ERROR: ' + jsonData.error.message;
        return;
    }

    // Parse the response object, deserialize the image data,
    // and attach new images to the page.
    const container = document.getElementById('image-container');
    // console.log("container: ", container);
    for (let i = 0; i < jsonData.data.length; i++) {
        let imgData = jsonData.data[i];
        let img = document.createElement('img');
        img.src = imgData.url;
        img.alt = prompt;
        container.innerHTML = '';
        container.prepend(img);
    }

    reqStatus.innerHTML = jsonData.data.length +' image received ';
}


