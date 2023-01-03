const express   = require('express');
const fs        = require('fs');
const converter = require('../helpers/converter');
const validate  = require('../helpers/validateFiles');
const router    = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true
  });
});

router.post('/uploadFile/:dir?', (req, res) => {

  let sampleFile;
  let finalPath = '';
  let errors    = [];

  if(!req.files || Object.keys(req.files).length === 0){

    return res.status(400).json({
      success: false,
      error: 'file not found'
    });

  }else{

    if(req.params.dir) finalPath = converter.pathFormat(req.params.dir);

    if(req.files.file.length > 1){

        req.files.file.forEach(function(sampleFile){

            if(!validate.validateFileFormat(sampleFile)){
                return res.status(500).json({
                    success: false,
                    error: 'file format not allowed'
                  });
            }

            uploadPath = 'uploadedFiles/' + finalPath + '/' + sampleFile.name;

            sampleFile.mv(uploadPath, (err) => {
                if(err) errors.push(err);
            });
        });

      if(errors.length > 0){

        return res.status(400).json({
          success: false,
          error: 'file not found',
        });

      }else{
        return res.status(200).json({
          success: true
        });
      }

    }else{

      sampleFile = req.files.file;

      if(!validate.validateFileFormat(sampleFile)){
        return res.status(500).json({
            success: false,
            error: 'file format not allowed'
          });
      }

      uploadPath = 'uploadedFiles/' + finalPath + '/' + sampleFile.name;

      sampleFile.mv(uploadPath, (err) => {

        if(err){
          return res.status(400).json({
            success: false,
            error: 'file not found',
          });

        }else{
          return res.status(200).json({
            success: true
          });
        }
      });
    }
  }
});

router.post('/createDirectory/:dir?', (req, res) => {
  let finalPath = '';

  if(req.params.dir) finalPath = converter.pathFormat(req.params.dir);

  fs.mkdir('./uploadedFiles/' + finalPath, (err) => {
    if(err){
        return res.status(500).json({
            success: false,
            error: 'directory cannot be created' + err,
        });
    }
    else{
        return res.status(200).json({
            success: true
        });
    }
  });
});

router.get('/showFiles/:id?', (req, res) => {

  let finalPath = '';
  if(req.params.id) finalPath = converter.pathFormat(req.params.id);

  fs.readdir('./uploadedFiles/' + finalPath, { withFileTypes: true }, (err, files) => {
      if(err){
        return res.status(400).json({
            success: false,
            error: 'directory not found',
        });
      } 
      else{

        let directories = [];
        let onlyFiles   = [];

        files.forEach(function(file){
            if(file.isDirectory()) directories.push(file);
            else onlyFiles.push(file);
        });

        return res.status(200).json({
            success: true,
            onlyFiles, 
            directories 
        });
      }
    }
  );
});

module.exports = router;
