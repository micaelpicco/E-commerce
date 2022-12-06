const colors = ["Verde", "Rojo", "Azul", "Gris", "Marron", "Negro", "Blanco",
"Rosado", "Amarillo"]

const {sizes} = require("../utils/sizes")

const variant = () => {
    const v = {
        size: sizes[Math.floor(Math.random() * (sizes.length - 1))],
        color: colors[Math.floor(Math.random() * (colors.length - 1))],
        stock: Math.floor(Math.random() * 100)

    }
    //console.log(v)
    return v
}

module.exports = variant