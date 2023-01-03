function validateFileFormat(file){

    const allowed_files  = ['png', 'jpeg', 'jpg', 'gif', 'pdf'];
    const file_extension = file.name.slice(
        ((file.name.lastIndexOf('.') - 1) >>> 0) + 2
    );

    return allowed_files.includes(file_extension);
    
}

module.exports = { validateFileFormat };