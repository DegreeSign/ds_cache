import {
    existsSync,
    mkdirSync,
    rmSync,
    statSync,
    writeFileSync,
    readFileSync,
    unlinkSync,
} from 'node:fs';

const
    /** Date for error log */
    logDate = () => new Date()?.toISOString(),
    /**
     * Validate Folder
     * 
     * create if does not exist 
     * */
    safeFolder = (targetFolder: string) => {
        try {
            if (!existsSync(targetFolder)) // if dir does not exist
                mkdirSync(targetFolder, { recursive: true }); // create dir 
            return true
        } catch (e) {
            console.log(logDate(), `safeFolder failed`, e);
            return false
        };
    },
    /** Delete Folder */
    delFolder = (targetFolder: string) => {
        try {
            if (existsSync(targetFolder)) // if dir exist
                rmSync(targetFolder, { recursive: true, force: true });
            return true
        } catch (e) {
            console.log(logDate(), `delFolder failed`, e);
            return false
        };
    },
    /** Delete File */
    delFile = (file: string) => {
        try {
            if (existsSync(file)) // check file exists
                unlinkSync(file); // delete file
            return true
        } catch (e) {
            console.log(logDate(), `no data to read:`, file);
            return undefined;
        };
    },
    /** File Stats */
    fileStats = (targetFile: string) => {
        try {
            return statSync(targetFile);
        } catch (e) {
            console.log(logDate(), `fileStats failed`, e);
            return
        };
    },
    /** Write to files */
    wrt = (file: string, code: string) => {
        try {
            return code ? (
                writeFileSync(file, code, `utf8`),
                true
            ) : (
                console.log(logDate(), `no data to write to`, file),
                false
            )
        } catch {
            console.log(logDate(), `failed to write to`, file);
            return false
        };
    },
    /** Write JSON to files */
    wrtJ = <T>(file: string, code: T) => {
        try {
            if (Object.keys(code || {})?.length) {
                const codeStr = JSON.stringify(code)
                return codeStr ? (
                    wrt(file, codeStr) ? 1
                        : (
                            console.log(logDate(), `error writing to:`, file),
                            0
                        )
                ) : (
                    console.log(logDate(), `no JSON data to write.`, file),
                    0
                );
            } else {
                console.log(logDate(), `no JSON data to write.`, file);
                return 0;
            };
        } catch (e) {
            console.log(logDate(), `major error writing to:`, file);
            return 0
        };
    },
    /** Read files */
    red = (file: string, disableLog?: boolean) => {
        try {
            return readFileSync(file, `utf8`);
        } catch (e) {
            if (!disableLog) console.log(logDate(), `no data to read at`, file);
            return undefined;
        };
    },
    /** Read JSON files */
    redJ = <T>(file: string, disableLog?: boolean): T | undefined => {
        try {
            const data = red(file, disableLog)
            return data ? JSON.parse(data) : undefined;
        } catch (e) {
            if (!disableLog) console.log(logDate(), `no JSON data to read:`, file);
            return undefined
        };
    };

export {
    wrt,
    wrtJ,
    red,
    redJ,
    safeFolder,
    delFolder,
    delFile,
    fileStats,
}