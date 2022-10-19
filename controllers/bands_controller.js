// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')  //requiring this folder allows access to the index.js which gives access to all models files
const { Band, Meet_Greet, Set_Time } = db             //with the db variable above, we could access using db.modelname...to make referencing easier, destructure {} to avoid having to specify db each time 
const { Op } = require('sequelize')

// FIND ALL BANDS
//INDEX ROUTE
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: Meet_Greet,
                    as: 'meet_greets',
                    attributes: { exclude: ["band_id", "event_id"] },
                    include: {
                        model: Event,
                        as: 'event',
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                },
                {
                    model: Set_Time,
                    as: 'set_times',
                    attributes: { exclude: ["band_id", "event_id"] },
                    include: {
                        model: {
                            model: Event,
                            as: 'event',
                            where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                        }
                    }
                }
            ]
        })

        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})







// EXPORT
module.exports = bands
