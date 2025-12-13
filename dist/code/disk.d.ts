declare const 
/**
 * Validate Folder
 *
 * create if does not exist
 * */
safeFolder: (targetFolder: string) => boolean, 
/** Delete Folder */
delFolder: (targetFolder: string) => boolean, 
/** Delete File */
delFile: (file: string) => true | undefined, 
/** File Stats */
fileStats: (targetFile: string) => import("fs").Stats | undefined, 
/** Write to files */
wrt: (file: string, code: string) => boolean, 
/** Write JSON to files */
wrtJ: <T>(file: string, code: T) => 0 | 1, 
/** Read files */
red: (file: string, disableLog?: boolean) => string | undefined, 
/** Read JSON files */
redJ: <T>(file: string, disableLog?: boolean) => T | undefined;
export { wrt, wrtJ, red, redJ, safeFolder, delFolder, delFile, fileStats, };
