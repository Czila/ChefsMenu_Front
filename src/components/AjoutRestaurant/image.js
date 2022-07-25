function uploadImage(req, res){
    let images = req.jsonilo.images;
    images.upload(req, res, function(err){
        if (err){
            res.status(204).end();
        }
        else if (req.file == undefined){
            res.status(422).end();
        }
        else{
            images.resize(path.resolve(__dirname))
            let data = {"imageName" : req.file.originalname}
            let response = responseHandler.prepareResponse(req, 200, data);
            res.status(200).json(response);
        }
    });
    function getImage(req, res){
        res.sendFile(path.resolve)
    }
}

