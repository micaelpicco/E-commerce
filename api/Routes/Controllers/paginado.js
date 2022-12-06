const divider = (array, cant) => {
    let finalArray = []
        while(array.length){
            finalArray.push(array.splice(0, cant))
        }
    return finalArray
}

module.exports = divider