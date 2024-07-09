const path = require('node:path')
const fs = require('node:fs/promises')

const createDirectoryAndFiles = async () => {
    const projectFolder = path.join(__dirname, 'baseFolder')
    await fs.mkdir(projectFolder);
    const pathToBaseDir = path.join(projectFolder)

    for (let i = 1; i <= 5; i++) {
        await fs.mkdir(path.join(pathToBaseDir, `someDir ${i}`), {recursive: true})
        await fs.writeFile(path.join(pathToBaseDir, `someDir ${i}`, 'text.txt'), 'Hello world')
        const pathToFile = path.join(pathToBaseDir, `someDir ${i}`, 'text.txt')
        console.log(`Path to file text.txt in someDir ${i} is ${pathToFile}`)
        const stat = await fs.stat(path.join(pathToBaseDir, `someDir ${i}`, 'text.txt'))
        console.log(`isDirectory? ${stat.isDirectory()}`)
        console.log(`isFile? ${stat.isFile()}`)

    }

}

createDirectoryAndFiles()