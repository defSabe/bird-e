const express = require('express');

const Bird = require('../models/Bird.model');

const router = express.Router();

router.get('/birds', (req, res) => {
    if (!req.user) {
        res.redirect('/login'); // can't access the page, so go and log in
        return;
    }
    // ok, req.user is defined
    Bird.find({})
        .then((birdsFromDB) => {
            res.render('users/birds', {
                birdsFromDB
            });
        })
        .catch((err) => `Error fetching birds: ${err}`);
});

// SEE MORE DETAILS
router.get("/birds/:id", (req, res) => {
    const {
        id
    } = req.params

    Bird.findById(id)
        .then((birdDetails) => res.render('users/bird-details', birdDetails))
        .catch((err) => `Error fetching birds: ${err}`);
});

// ADD BIRD
router.get('/create', (req, res, next) => {

    res.render("users/create");
});

router.post('/create', (req, res, next) => {

    const {
        name,
        scientificName,
        dateOfSight,
        location,
        imageUrl,
        moreInfo,
    } = req.body;

    Bird.create({
            name,
            scientificName,
            dateOfSight,
            location,
            imageUrl,
            moreInfo,
        })
        .then(() => res.redirect("/birds"))
        .catch((err) => `Error while creating a new bird: ${err}`);
});

// EDIT BIRD
router.get('/birds/:id/edit', (req, res, next) => {

    const { id } = req.params;

    Bird.findById(id)
        .then((birdToEdit) => {
            res.render('users/edit', birdToEdit);
        })
        .catch((err) => `Error while updating bird ${err}`);
});

router.post('/birds/:id/edit', (req, res, next) => {
    
    const { id } = req.params;
    const {
        name,
        scientificName,
        dateOfSight,
        location,
        imageUrl,
        moreInfo
    } = req.body;

    Bird.findByIdAndUpdate(
            id, req.body , {
                new: true
            }
        )
        .then(() => res.redirect(`/birds`))
        .catch((err) =>
            console.log(`Error while updating a single bird: ${err}`)
        );
});

//DELETE BIRD
router.post('/birds/:id/delete', (req, res, next) => {
    const {
        id
    } = req.params;

    Bird.findByIdAndDelete(id)
        .then(() => res.redirect("/birds"))
        .catch((err) => console.log(`Error while deleting a bird: ${err}`));
});

module.exports = router;