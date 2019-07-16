const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

//@route GET api/items
//@desc GET All items
//@access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(Items => res.json(Items))
});

//@route POST api/items
//@desc Create an Item
//@access Public
router.post('/', (req, res) => {
    const NewItem = new Item({
        name: req.body.name
    });

    NewItem.save().then(item => res.json(item));
});


//@route DELETE api/items
//@desc Delete an Item
//@access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(Item => Item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;