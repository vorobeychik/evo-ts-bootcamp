import {EventEmitter} from "events"
import {readFile} from "fs/promises";
const csvjson = require('csvjson');
const prettyjson = require('prettyjson')
import {File} from "./dirwatcher";
import {readFileSync} from "fs";


export class Importer{

    constructor(private eventEmitter:EventEmitter) {
    }

    listen(){
        this.eventEmitter.on('newFiles',(files) => {
            files.forEach((file:File) => {
                console.log('New File:',file.filePath)
            })
        })

        this.eventEmitter.on('changedFiles',async (files:File[]) => {
            files.forEach(async (file:File) => {
                const data = await this.import(file.filePath)
                console.log(`File Changed: ${file.filePath} \n ${data}`)
            })

        })

        this.eventEmitter.on('deletedFiles',(files) => {
            files.forEach((file:File) => {
                console.log('File Delete:',file.filePath)
            })
        })
    }

    async import(path:string):Promise<Record<string, string>>{
        const file = await readFile(path,"utf8");
        const jsonData = csvjson.toObject(file)
        return prettyjson.render(jsonData);
    }

    importSync(path:string){
        const file =  readFileSync(path,"utf8");
        const jsonData = csvjson.toObject(file)
        return prettyjson.render(jsonData);
    }
}