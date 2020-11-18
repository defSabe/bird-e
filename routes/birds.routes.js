const express = require('express');

const Bird = require('../models/Bird.model')

const router = express.Router();

router.get('/birds', (req, res, next) => {
    // Iteration #2: List the birds
    Drone.find({})
        .then((birdsFromDB) => res.render('birds/list', {
            birdsFromDB
        }))
        .catch((error) => `Error fetching birds: ${error}`)
});

router.get('/birds/create', (req, res, next) => {
    // Iteration #3: Add a new bird
    res.render("birds/create-form")
});

router.post('/birds/create', (req, res, next) => {
    // Iteration #3: Add a new bird
    const {
        name,
        scientificName,
        dateOfSight,
        location,
        imageUrl,
        moreInfo,
    } = req.body;

    Drone.create({
            name,
            scientificName,
            dateOfSight,
            location,
            imageUrl,
            moreInfo,
        })
        .then(() => res.redirect("/birds"))
        .catch((error) => `Error while creating a new bird: ${error}`);
});

router.get('/birds/:id/edit', (req, res, next) => {
    // Iteration #4: Update the bird
    const {
        id
    } = req.params;

    Drone.findById(id)
        .then((birdToEdit) => {
            res.render('birds/update-form', birdToEdit);
        })
        .catch((error) => `Error while updating bird ${error}`);
});

router.post('/birds/:id/edit', (req, res, next) => {
    // Iteration #4: Update the bird
    const {
        id
    } = req.params;
    const {
        name,
        scientificName,
        dateOfSight,
        location,
        imageUrl,
        moreInfo,
    } = req.body;

    Drone.findByIdAndUpdate(
            id, {
                name,
                scientificName,
                dateOfSight,
                location,
                imageUrl,
                moreInfo,
            }, {
                new: true
            }
        )
        .then((updatedDrone) => res.redirect(`/birds`))
        .catch((error) =>
            console.log(`Error while updating a single bird: ${error}`)
        );
});

router.post('/birds/:id/delete', (req, res, next) => {
    // Iteration #5: Delete the bird
    const {
        id
    } = req.params;

    Drone.findByIdAndDelete(id)
        .then(() => res.redirect("/birds"))
        .catch((error) => console.log(`Error while deleting a bird: ${error}`));
});

module.exports = router;