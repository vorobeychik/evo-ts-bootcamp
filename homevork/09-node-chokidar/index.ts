import {DirWatcher} from './dirwatcher'
import {Importer} from "./importer";
import { EventEmitter } from "events"

const eventEmitter = new EventEmitter()
const dirWatcher = new DirWatcher(eventEmitter)
const importer = new Importer(eventEmitter)

dirWatcher.watch('./data',500)
importer.listen()