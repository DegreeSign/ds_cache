import { Stats } from 'node:fs';
declare const 
/** Validate Folder (create if does not exist)  */
safeFolder: (targetFolder: string) => boolean, 
/** Delete Folder */
delFolder: (targetFolder: string) => boolean, 
/** Delete File */
delFile: (targetFile: string) => boolean, 
/** File Stats */
fileStats: (targetFile: string) => Stats | undefined;
export { safeFolder, delFolder, delFile, fileStats, };
