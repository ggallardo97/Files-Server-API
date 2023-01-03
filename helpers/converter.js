function pathFormat(path){

    let finalPath = path.replace(/-/g,'/');
    return finalPath;
    
}

module.exports = { pathFormat };