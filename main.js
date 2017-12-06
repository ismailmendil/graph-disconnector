
var elements = [];
var nodes = [ { 
    data: { id: '0' }
  },
  { // node b
    data: { id: '1' }
  },
  { // node a
      data: { id: '2' },
      position: {x: 100, y: 50}
    },
    { // node b
      data: { id: '3' }
    }      
 ];
var edges = [{
    data: {id: '13', source: '1', target: '3'}
}];
var nbNodes = 0;
var nbEdges = 0;



var cy = null;

(function initialize(){
    nodes.forEach (elt =>{
        elements.push(elt);
    });
    edges.forEach(elt => {
        elements.push(elt);
    })
    nbNodes = nodes.length;
    nbEdge = edges.length;
    cy = cytoscape({
        
          container: document.getElementById('cy'), // container to render in
        
          elements: elements, // list of graph elements to start with
        
          style: [ // the stylesheet for the graph
            {
              selector: 'node',
              style: {
                'background-color': '#666',
                'label': 'data(id)'
              }
            },
        
            {
              selector: 'edge',
              style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
              }
            }
          ],
        
          layout: {
            name: 'grid',
            rows: 1
          },
          pan: {x: 100, y: 100}
        
        });

})();
function addNode(){
        cy.add({
            data: {
                id: nbNodes + '',
            },
            position: {x: 500, y: 200}
        });
        nodes.push({
            data: {
                id: nbNodes + '',
            },
            position: {x: 500, y: 200}
        });
        nbNodes ++;
}

function addEdge(){
    var sourceInput = document.getElementById("sourceInput");
    var targetInput = document.getElementById("targetInput");
    var from = parseInt(sourceInput.value);
    var to = parseInt(targetInput.value);
    if (!isNaN(from) && !isNaN(to)){
        if( from >=0 && from < nodes.length && to >= 0 && to < nodes.length){
            if (!containsEdge(from, to)) {
                cy.add({
                    data: {
                        id: from + '' + to,
                        source: from + '',
                        target: to + ''
                    }
                });
                edges.push({data: {
                    id: from + '' + to,
                    source: from + '',
                    target: to + ''
                }});
                nbEdges++;
            } else {
                //console.log("The edge aleady exists.");
                showErrorMessage("The edge aleady exists.");
            }
        } else {
            //console.log("numbers don't exist");
            showErrorMessage("Specified nodes don't exist");
            
        }
    } else {
        //console.log("Aren't numbers");
        showErrorMessage("Inputs aren't numbers. Please insert valid node numbers");
    }
    sourceInput.value  = "";
    targetInput.value = "";
    console.log(getGraphMatrix());

}

function containsEdge(node1, node2){
    var isIn = false;
    var i = 0;
    var keySearch = node1 + '' + node2;
    while(!isIn && i < edges.length){
        if (edges[i].data.id === keySearch || edges[i].data.id === mirrorify(keySearch)){
            isIn = true;
        }
        i++;
    }
    return isIn;
}

function mirrorify(s){
    return s.split('').reverse().join('');
}

function getGraphMatrix(){
    var matrix = [];
    var i = 0;
    var j = 0;
    var endPoints = null;
    for (i = 0; i < nodes.length; i++){
        matrix.push([]);
        for (j = 0; j < nodes.length; j++){
            matrix[i].push(0)
        }
    }

    edges.forEach(elt => {

        endPoints = elt.data.id.split('');
        matrix[endPoints[0]][endPoints[1]] = 1;
        matrix[endPoints[1]][endPoints[0]] = 1;
    }
    );
    return matrix;
    
}

function removeJoinPoints(points){
    points.forEach( elt => {
        cy.remove(cy.$("#" + elt));
    })
}


function validate(){

    //hide all control elements
    var controls = document.getElementsByClassName("control");
    for(i=0;i<controls.length;i++) controls[i].style.display = "none";
    
    //add a retry button
    var retryButton = document.createElement("button");
    //retryButton.setAttribute("class","control");
    retryButton.innerText = "Retry";
    document.getElementsByClassName("controls")[0].appendChild(retryButton);
    
    //display control elements again and hide retry button
    retryButton.onclick = function(){
        
        for(i=0;i<controls.length;i++) controls[i].style.display = "";
        retryButton.style.display = "none";
        reset();

    }

    var adjMatrix = getGraphMatrix();
    var articulationPoints = articulation_point(adjMatrix);
    
    
    colorNodes(articulationPoints,"red");

}

function colorNodes(points, color){
    points.forEach( elt => {
        node = cy.$("#" + elt)["0"];
        
        
    });
}
function getIdNodes(){
    var i = 0;
    var ids = [];
    for (; i < nbNodes; i++){
        ids.push(i);
    }
    return ids;
}

function reset(){
    removeJoinPoints(getIdNodes());
    nbNodes = 0;
    nbEdges = 0;
    nodes = [];
    edges = [];
    document.getElementById("sourceInput").value = "";
    document.getElementById("targetInput").value = "";
    
}




var modal = document.getElementById("modal");

        function hideModal(){
            modal.style.display = "none";
        }

        window.onclick = function(event){
            if (event.target == modal){
                hideModal();
            }
        }


        function showErrorMessage(message){
            msgContainer = document.getElementById("message");
            msgContainer.innerText = message;
            modal.style.display = "block";
        }
        