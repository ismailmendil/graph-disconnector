function articulation_point(adj){
    
    count = 0;
    init_val = 0;
    visited = [];
    copy = [];
    connexe = [];
    v = adj.length;
    for (i=0;i<v;i++){
        visited[i] = false;
    }
   //console.log(visited);
        
    for (i=0;i<v;i++){
        if (visited[i] == false){
            DFS(adj,v,visited,i);
            init_val = init_val+1;
        }
    }

    
    for(i=0;i<v;i++){
        
        for( j=0;j<v;j++){
            visited[j] = false;
            copy[j]=adj[i][j];
            adj[i][j] = 0;            
            adj[j][i] = 0;
            
        }
        
        nval = 0;
        
        for (k=0;k<v;k++){
            if (visited[k] == false && k!=i){
                nval = nval + 1;
                DFS(adj,v,visited,k);
                
            }
        }
        
        
        if (nval > init_val){
            connexe[count] = i;
            count = count + 1;
        }
        
        for (j=0; j<v;j++){
            adj[i][j]= copy[j];
            adj[j][i]= copy[j];
        }

        
    }
    return connexe;
    
}

function DFS(adj,v,visited,i){
    stack = [];
    stack.push(i);
    visited[i]= true;
    while(stack.length > 0){
        a = stack.pop();
        for(j=0;j<v;j++){
            if (adj[a][j] ==1){
                if (visited[j]== false){
                    stack.push(j);
                    visited[j]= true;
                }
            
            }
        }
    }
        

}


/*

Test1
adj = new Array(4);
    adj[0] = [0,1,0,0];
    adj[1] = [1,0,1,0];
    adj[2] = [0,1,0,1];
    adj[3] = [0,0,1,0];


//Test2
adj = [
    [0,1,0,0,0,1],
    [1,0,1,1,0,0],
    [0,1,0,1,1,0],
    [0,1,1,0,1,0],
    [0,0,1,1,0,0],
    [1,0,0,0,0,0]
]

connexe = articulation_point(adj);
console.log("Solution is: ");
console.log(connexe);
*/
