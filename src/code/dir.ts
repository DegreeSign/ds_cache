import {
    existsSync,
    mkdirSync,
    rmSync,
    statSync,
    unlinkSync,
    Stats,
} from 'node:fs';
import { logDate } from './utils';

const
    /** Validate Folder (create if does not exist)  */
    safeFolder = (targetFolder: string): boolean => {
        try {
            if (!existsSync(targetFolder)) // if dir does not exist
                mkdirSync(targetFolder, { recursive: true }); // create dir 
            return true
        } catch (e) {
            console.error(logDate(), `safeFolder failed for:`, targetFolder);
        };
        return false
    },
    /** Delete Folder */
    delFolder = (targetFolder: string): boolean => {
        try {
            if (existsSync(targetFolder)) // if dir exist
                rmSync(targetFolder, { recursive: true, force: true });
            return true
        } catch (e) {
            console.error(logDate(), `delFolder failed for:`, targetFolder);
        };
        return false
    },
    /** Delete File */
    delFile = (targetFile: string): boolean => {
        try {
            if (existsSync(targetFile)) // check file exists
                unlinkSync(targetFile); // delete file
            return true
        } catch (e) {
            console.error(logDate(), `delFile failed for:`, targetFile);
        };
        return false
    },
    /** File Stats */
    fileStats = (targetFile: string): Stats | undefined => {
        try {
            return statSync(targetFile);
        } catch (e) {
            console.error(logDate(), `fileStats failed for:`, targetFile);
        };
    };

export {
    safeFolder,
    delFolder,
    delFile,
    fileStats,
}