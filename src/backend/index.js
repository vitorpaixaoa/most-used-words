const { ipcMain } = require("electron")  // comunicar backend com o front e acessar sistemas de arquivos e etc

const pathsToRows = require("./pathsToRows")
const prepareData = require("./prepareData")
const groupWords = require("./groupWords")

ipcMain.on('process-subtitles', (event, paths)=>{
    pathsToRows(paths)
        .then(rows => prepareData(rows))
        .then(words => groupWords(words))
        .then( groupedWords => event.reply('process-subtitles',groupedWords))
})