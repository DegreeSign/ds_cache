import {
    writeFileSync,
    readFileSync,
} from 'node:fs';
import {
    getStrJSON,
    logErr,
    utf8
} from './utils';

const
    /** Write to files */
    wrt = (fileName: string, inputData: string): boolean => {
        try {
            if (inputData != undefined) {
                writeFileSync(fileName, inputData, utf8);
                return true
            } else logErr({ fileName });
        } catch (e) {
            logErr({
                fileName,
                error: true,
            });
        };
        return false
    },
    /** Write JSON to files */
    wrtJ = <T>(fileName: string, inputData: T): boolean => {
        try {
            const data = getStrJSON(inputData);
            if (data) return wrt(fileName, data);
            else logErr({
                fileName,
                json: true,
            });
        } catch (e) {
            logErr({
                fileName,
                error: true,
                json: true,
            });
        };
        return false
    },
    /** Read files */
    red = (fileName: string, disableLog?: boolean): string | undefined => {
        try {
            return readFileSync(fileName, utf8);
        } catch (e) {
            logErr({
                fileName,
                disableLog,
                error: true,
                read: true,
            });
        };
    },
    /** Read JSON files */
    redJ = <T>(fileName: string, disableLog?: boolean): T | undefined => {
        try {
            const data = red(fileName, disableLog)
            return data ? JSON.parse(data) : undefined;
        } catch (e) {
            logErr({
                fileName,
                disableLog,
                error: true,
                read: true,
                json: true,
            });
        };
    };

export {
    wrt,
    wrtJ,
    red,
    redJ,
}