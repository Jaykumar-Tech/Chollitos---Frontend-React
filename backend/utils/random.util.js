exports.generateLongNumber = () => {
    var result = "";
    var length = Math.floor(Math.random()*100+100);
    for ( let i = 0 ; i < length ; i ++ ) {
        result += Math.floor(Math.random()*10);
    }
    return result ;
}