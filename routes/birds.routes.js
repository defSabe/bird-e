const express = require('express');

const Bird = require('../models/Bird.model')

const router = express.Router();

router.get('/main-board', (req, res,) => {
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
        .catch((err) => `Error fetching birds: ${err}`)
});

// SEE MORE DETAILS
router.get("/birds/:id", (req, res) => {
    const { id } = req.params

    Bird.findById(id)
      .then((birdDetails) => res.render('users/bird-details',  birdDetails  ))
      .catch((err) => `Error fetching birds: ${err}`)
});


// router.get('/birds/create', (req, res, next) => {
//     // Iteration #3: Add a new bird
//     res.render("birds/create-form")
// });

// router.post('/create', (req, res, next) => {
//     // Iteration #3: Add a new bird
//     const {
//         name,
//         scientificName,
//         dateOfSight,
//         location,
//         imageUrl,
//         moreInfo,
//     } = req.body;

//     Bird.create({
//             name,
//             scientificName,
//             dateOfSight,
//             location,
//             imageUrl,
//             moreInfo,
//         })
//         .then(() => res.redirect("users/create"))
//         .catch((err) => `Error while creating a new bird: ${err}`);
// });

// EDIT BIRD
router.get('/birds/:id/edit', (req, res, next) => {
    // Iteration #4: Update the bird
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
        moreInfo,
    } = req.body;

    Bird.findByIdAndUpdate(
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
        .then((updatedBird) => res.redirect(`/main-board`))
        .catch((err) =>
            console.log(`Error while updating a single bird: ${err}`)
        );
});

//DELETE BIRD
router.post('/birds/:id/delete', (req, res, next) => {
    // Delete the bird
    const { id } = req.params;

    Bird.findByIdAndDelete(id)
        .then(() => res.redirect("/main-board"))
        .catch((err) => console.log(`Error while deleting a bird: ${err}`));
});

module.exports = router;