
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        clueMaker(this);
    }
};
xhttp.open("GET", "media/clues.xml", true);
xhttp.setRequestHeader("Content-Type", "text/xml");
xhttp.send();

    /*xmlParser = new DOMParser();
    xmlDoc = xmlParser.parseFromString("http://chrisg.ismakinggames.com/xml/clues.xml", "text/xml");*/
    //loadData();
    //clueMaker();


function clueMaker(clueDoc){
    var xmlClues = clueDoc.responseXML.querySelectorAll("clue");
    console.log("clue: " + xmlClues[i].childNodes[1].innerHTML);
    for(var i = 0; i < xmlClues.length; i++){
        if(xmlClues[i].getAttribute("type") == "intro") openings.push(new Clue(xmlClues[i].childNodes[1].innerHTML));
        else if(xmlClues[i].getAttribute("type") == "clue") clues.push(new Clue(xmlClues[i].childNodes[1].innerHTML));
        else if(xmlClues[i].getAttribute("type") == "murder") murders.push(new Clue(xmlClues[i].childNodes[1].innerHTML));
        else {endings.push(new Clue(xmlClues[i].childNodes[1].innerHTML)); }
    }
    console.log("clues: "+clues[0].text);
}


/*function loadData(){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		var xml = xhr.response;
		//var allClues = xml.querySelectorAll('clue');
		clueMaker(xml);
	}
	
	var url = "media/clues.xml";
	xhr.open('GET', url, true);
	xhr.send();
}*/