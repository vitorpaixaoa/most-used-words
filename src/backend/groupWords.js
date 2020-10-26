
module.exports = words => {
    return new Promise((resolver, reject) =>{
        try {
            // ['ana','ana','ana', 'bia','bia','bia']
            // {ana: 3, bia: 2}
            // ['ana','ana','ana', 'bia','bia','bia']
            const groupedWords = words.reduce((obj, word) =>{
                if(obj[word]){
                    obj[word] = obj[word] + 1 //sempre que ele já achar a palavra nesse objeto ele vai acrescentar um ao numero total
                }else{
                    obj[word] = 1
                }
                return obj
            },{})

            const groupedWordsArray = Object
                    .keys(groupedWords)
                    .map(key => ({ name: key, amount: groupedWords[key] }))
                    .sort((w1,w2) => w2.amount - w1.amount)



            resolver(groupedWordsArray)
        } catch (e) {
            reject(e)
            
        }
    })
}