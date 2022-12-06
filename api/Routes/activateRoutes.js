const { Router } = require("express");
const router = Router();
//controllers
const activateProfile = require("./Controllers/activateProfile")
const deActivateProfile = require("./Controllers/deActivateProfile")
const activateProduct = require("./Controllers/activateProduct")
const deActivateProduct = require("./Controllers/deActivateProduct")
const activateModerator = require("./Controllers/activateModerator")
//Activa usuarios
router.put("/user/:id", async (req, res) => {
    const id = req.params.id
    try {
        const response = await activateProfile(id)
        res.status(200).send(response)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
//desactiva usuarios
router.delete("/user/:id", async (req, res) => {
    const id = req.params.id
    try {
        const response = await deActivateProfile(id)
        res.status(200).send(response)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
//Activa productos
router.put("/product/:id", async (req, res) => {
    const id = req.params.id
    try {
        const response = await activateProduct(id)
        res.status(200).send(response)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
//desactiva productos
router.delete("/product/:id", async (req, res) => {
    const id = req.params.id
    try {
        const response = await deActivateProduct(id)
        res.status(200).send(response)
    } catch (error) {
        res.status(404).send(error.message)
    }
})
//Activa el moderador
router.put("/user/moderator/:id", async (req, res) => {
    const id = req.params.id
    try {
        const response = await activateModerator(id)
        res.status(200).send(response)
    } catch (error) {
        res.status(404).send(error.message)
    }
})


module.exports = router