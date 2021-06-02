import { EventEmitter } from "events"
const fs =  require("fs/promises")
const path =  require("path")


export type File = {
    fileName:string,
    filePath,
    modifiedTime:string,
}


export class DirWatcher{

    delay:number = 10000;
    path?:string;
    dirState:File[] = [];

    constructor(private eventEmitter:EventEmitter) {
    }

    watch(path:string,delay:number){
        this.delay = delay
        this.path = path
        setInterval(async () => await this.step(),this.delay)
    }

    async step(){
        const files = await this.findFiles()

        const newFiles = files.filter((file:File) => !this.dirState.some((dirFile:File) => dirFile.fileName === file.fileName))
        const changedFiles = files.filter((file:File) => this.dirState.some((dirFile:File) => dirFile.fileName === file.fileName && dirFile.modifiedTime !== file.modifiedTime))
        const deletedFiles =  this.dirState.filter((dirFile:File) => !files.some((file:File) => dirFile.fileName === file.fileName))

        this.dirState = files

        if(newFiles.length){
            this.eventEmitter.emit('newFiles',newFiles)
        }
        if(changedFiles.length){
            this.eventEmitter.emit('changedFiles',changedFiles)
        }
        if(deletedFiles.length){
            this.eventEmitter.emit('deletedFiles',deletedFiles)
        }
    }

    async findFiles(){

        let files:string[] = await fs.readdir(this.path)

        const data = files.map(async (fileName:string) => {
            const filePath = this.path + path.sep + fileName
            const fileInfo = await fs.stat(filePath)
            return {
                filePath,
                fileName,
                modifiedTime: String(fileInfo.mtime)
            }
        })

        return await Promise.all(data)
    }


}


