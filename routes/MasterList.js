const express = require('express');
const { addMasterList, getAllMasterList, findOneMasterList, updateMasterList, deleteMasterList } = require('../controllers/MasterList');
const router = express.Router();


router.route('/')
    .get(getAllMasterList)
    .post(addMasterList);

router.route('/:id')
    .get(findOneMasterList)
    .put(updateMasterList)
    .delete(deleteMasterList);


module.exports =  router;
