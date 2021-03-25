const express = require('express');
const Joi = require('joi');
const router = express.Router();
const Film = require("../models/film.js");

const validation_schema = Joi.object({
    name : Joi.string()
    .min(3)
    .required(),
    actors : Joi.array().items(Joi.string().min(3).required()),
    seances : Joi.array().items({date : Joi.date().greater('now').required(), temps : Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(), places : Joi.number().integer().required()}),
    

})

router.get('',(req,res)=>{
    Film.find({}).then(film => {res.json(film)});})

router.get('/:name',(req,res)=>{
    Film.findOne({ name: req.params.name })
    .then(film => {res.json(film)})
    .catch(err => res.json(err))

});


router.post('',(req,res) =>{
    let vald_res = validation_schema.validate(req.body)
    if(vald_res.error)
        return res.status(400).send(vald_res.error.details[0].message)
        const newFilm = new Film ({
            name : req.body.name,
            actors : req.body.actors,
            seances : req.body.seances
        });
    
    
    Film.findOne({ name: req.body.name }).then(film => {
            if (film) {
              return res.status(400).json({ email: "Le film existe deja" });
            } else {
                newFilm
                .save()
                .then(film => res.json(film))
                .catch(err => console.log(err));
} })});


router.delete('/:name',(req,res)=>{
        Film.findOneAndDelete({ name: req.params.name })
        .then(()=> {res.status(200).send("film deleted")})
        .catch(err => {res.json(err);res.status(400).send("film not found")})
    
           
});

router.post('/:name/:date/:temps/:nombredeplaces', (req,res)=>{
    Film.findOne({ name: req.params.name })
    .then(film => {
        if (!film) {
          return res.status(400).json( "Le film n'existe pas");
        } else {
            let seance = film.seances.find(seance => seance.date===req.params.date&&seance.temps===req.params.temps)
            if (req.params.nombredeplaces > seance.places){
                return res.status(400).json("Pas de places suffisants")
            }
            else{
                seance.places -= req.params.nombredeplaces;
                film.save()
                return res.status(200).json(film)
                
            }
        } })
.catch(err=>res.status(400).json(err))
})


module.exports = router;
