let player1 = 0;
let player2 = 0;


for(let i=0;i<Array.length;i++){
    if(arr[i] == 1){
        player1++;
    }
    else{
        player2++;
    }
    
}
if(player1 > player2){
    return player1;
}
else if(player2 > player1){
    return player2;
}
else{
    return player1;
}