const fs = require('fs-extra')
 
fs.copy("files/a.txt","dist/a.txt")
.then(() => console.log('success!'))
.catch(err => console.error(err))
