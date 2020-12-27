const express = require('express');
const router = express.Router();

let data = [
    {
        id:1,
        name:"Dara",
        ht:5.3,
        createdOn : new Date(),
    },
    {
        id:2,
        name:"suma",
        ht:5.4,
        createdOn : new Date(),
    },
    {
        id:3,
        name:"mala",
        ht:5.7,
        createdOn : new Date(),
    },
];

router.get('/',function(req,res){
    res.status(200).json(data);
    // console.log(typeof res.send());
    // console.log(typeof res.json());
    //res.send("All items")
});

router.get('/:id',function(req,res){
    let fnd = data.find(function(item){
        return item.id === parseInt(req.params.id);
    });
    if(fnd){
        res.status(200).json(fnd);
    }
    else{
        res.sendStatus(404);
    }
});

router.post('/',function(req,res){
    let itemIds = data.map(item => item.id);
    let  hts = data.map(item => item.ht);
    let newId = itemIds.length>0?Math.max.apply(Math,itemIds)+1:1;
     let newHtNum = hts.length > 0 ? Math.max.apply(Math,hts)+1:1;
    let newItem = {
        id : newId,
        name : req.body.name,
        ht : newHtNum,
    };

    data.push(newItem);
    res.status(201).json(newItem);
});

router.put('/:id',function(req,res){
    let fnd = data.find(function(item){
        return item.id == parseInt(req.params.id);
    });

    if(fnd){
        let updated = {
            id:fnd.id,
            name : req.body.name,
            ht : req.body.ht,
        };
        let tagInd = data.indexOf(fnd);

        data.splice(tagInd,1,updated);

        res.sendStatus(204);
    }
    else{
        res.sendStatus(404);
    }
});
router.delete('/:id', function (req, res) {
    // find item from array of data
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = data.indexOf(found);

        // splice means delete item from `data` array using index
        data.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
});
module.exports = router;