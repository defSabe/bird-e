const express = require('express');

const Bird = require('../models/Bird.model');
const fileUploader = require('../configs/cloudinary.config');
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
    } = req.params;

    Bird.findById(id)
        .then((birdDetails) => res.render('users/bird-details', birdDetails))
        .catch((err) => `Error fetching birds: ${err}`);
});

// ADD BIRD
router.get('/create', (req, res, next) => {

    res.render("users/create");
});
router.post('/create', fileUploader.single('imageUrl'), (req, res) => {
    const {
        name,
        scientificName,
        dateOfSight,
        location,
        imageUrl,
        moreInfo
    } = req.body;

    Bird.create({
            name,
            scientificName,
            dateOfSight,
            location,
            imageUrl: req.file.path,
            moreInfo,
        })
        .then(() => res.redirect('/birds'))
        .catch(error => console.log(`Error while creating a new bird: ${error}`));
});

// EDIT BIRD
router.get('/birds/:id/edit', (req, res, next) => {

    const {
        id
    } = req.params;

    Bird.findById(id)
        .then((birdToEdit) => {
            res.render('users/edit', birdToEdit);
        })
        .catch((err) => `Error while updating bird ${err}`);
});

router.post('/birds/:id/edit', fileUploader.single('imageUrl'), (req, res, next) => {

    const {
        id
    } = req.params;
    const {
        name,
        scientificName,
        dateOfSight,
        location,
        moreInfo
    } = req.body;

    const {
        path
    } = req.file;

    let imageUrl;

    if (req.file) {
        imageUrl = path;
    } else {
        imageUrl = existingImage;
    }

    Bird.findByIdAndUpdate(
            id, {
                name,
                scientificName,
                dateOfSight,
                location,
                imageUrl,
                moreInfo
            }, {
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


//UPLOAD IMG (create form)

module.exports = router;