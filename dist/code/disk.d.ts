declare const 
/** Write to files */
wrt: (fileName: string, inputData: string) => boolean, 
/** Write JSON to files */
wrtJ: <T>(fileName: string, inputData: T) => boolean, 
/** Read files */
red: (fileName: string, disableLog?: boolean) => string | undefined, 
/** Read JSON files */
redJ: <T>(fileName: string, disableLog?: boolean) => T | undefined;
export { wrt, wrtJ, red, redJ, };
