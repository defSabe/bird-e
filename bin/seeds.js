const mongoose = require('mongoose');
const Bird = require('../models/Bird.model');
const DB_NAME = 'bird-e';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const birds = [{
        name: "Black-headed Gull",
        scientificName: "Chroicocephalus ridibundus",
        dateOfSight: "11 / 09 / 2020",
        location: "Amsterdam",
        imageUrl: "/images/birds/Black-headed Gull - Chroicocephalus ridibundus.jpg",
        moreInfo: "The common small seagull in many areas, from duck ponds and farm fields to wild wetlands and seacoasts; locally occurs in flocks of hundreds, sometimes thousands."
    },
    {
        name: "Common Swift",
        scientificName: "Apus apus",
        sateOfSight: "05 / 06 / 2020",
        location: "Amsterdam",
        imageUrl: "/images/birds/Common Swift - Apus apus.jpg",
        moreInfo: "Almost always seen in flight, which, as the name suggests, is swift. Nests in cavities in cliffs and buildings.",
    },
    {
        name: "Common Wood-Pigeon",
        scientificName: "Columba palumbus",
        dateOfSight: "17 / 11 / 2020",
        location: "Rotterdam",
        imageUrl: "/images/birds/Common Wood-Pigeon (White-necked) Columba palumbus.jpg",
        moreInfo: "Common and conspicuous in wooded and semiopen habitats, including towns and gardens. Forms flocks, especially in winter.",
    },
    {
        name: "Eurasian Blackbird",
        scientificName: "Turdus merula",
        dateOfSight: "17 / 11 / 2020",
        location: "Amstelveen",
        imageUrl: "/images/birds/Eurasian Blackbird - Turdus merula.jpg",
        moreInfo: "Common and widespread in wooded habitats, parks, gardens, farmland with hedges; often feeds in fields and on lawns.",
    },
    {
        name: "Eurasian Jay",
        scientificName: "Garrulus glandarius",
        dateOfSight: "20 / 10 / 2020",
        location: "Amsterdam",
        imageUrl: "/images/birds/Eurasian Jay - Garrulus glandarius.jpg",
        moreInfo: "An inhabitant of woodland, forest, parkland, and gardens with larger trees, especially oaks.",
    },
    {
        name: "Eurasian Magpie",
        scientificName: "Pica pica",
        dateOfSight: "12 / 10 / 2020",
        location: "Aalsmeer",
        imageUrl: "/images/birds/Eurasian Magpie - Pica pica.jpg",
        moreInfo: "Common and conspicuous, this flashy, long-tailed crow relative is unmistakable, and its loud chattering calls are a familiar sound in many areas.",
    },
    {
        name: "Eurasian Oystercatcher",
        scientificName: "Haematopus ostralegus",
        dateOfSight: "02 / 07 / 2020",
        location: "Zaandam",
        imageUrl: "/images/birds/Eurasian Oystercatcher - Haematopus ostralegus.jpg",
        moreInfo: "Common, conspicuous, and often noisy large wader (shorebird) of varied coastal habitats, especially beaches and mudflats; also nearby fields and locally inland.",
    },
    {
        name: "Great Tit",
        scientificName: "Parus major",
        dateOfSight: "17 / 11 / 2020",
        location: "Amsterdam",
        imageUrl: "/images/birds/Great Tit - Parus major.jpg",
        moreInfo: "Common and conspicuous in woods, forests, parks, gardens, and hedges in farmland. Often visits bird feeders and uses nest boxes.",
    },
    {
        name: "Mute Swan",
        scientificName: "Cygnus olor",
        dateOfSight: "10 / 05 / 2020",
        location: "Amsterdam",
        imageUrl: "/images/birds/Mute Swan - Cygnus olor.jpg",
        moreInfo: "Native to northern Europe and Asia, but introduced in many regions, where it is now common on ponds, lakes, and calm coastal waters.",
    },
    {
        name: "Rose-ringed Parakeet",
        scientificName: "Psittacula krameri",
        dateOfSight: "05 / 09 / 2020",
        location: "Amsterdam",
        imageUrl: "/images/birds/Rose-ringed Parakeet - Psittacula krameri.jpg",
        moreInfo: "Native to Africa and South Asia, introduced locally in Europe and Japan.",
    },
];

Bird.create(birds)
    .then((birdsFromDB) => {
        console.log(`Created ${birdsFromDB.length} birds`);
        mongoose.connection.close();
    })
    .catch((err) =>
        console.log(`An error ocurred while getting birds from the DB: ${err}`));