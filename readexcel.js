const fs = require('fs');
const xlsx = require('xlsx');


async function readExcel (nameFile = 'listaVentas.xlsx',model, res) {
    const listBook = xlsx.readFile('./public/docs/listaVentas.xlsx');
    let workSheet = listBook.Sheets["List"] ;
    let listJson = xlsx.utils.sheet_to_json(workSheet);
    console.log(listJson);
    const data = await model.create(listJson);
    res.status(200).json({
        success: true,
        data
    })
}

module.exports = {
    readExcel
}


