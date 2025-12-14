declare const 
/** Read Compressed JSON files */
redJCompressed: <T>({ fileName, disableLog, }: {
    fileName: string;
    disableLog?: boolean;
}) => T | undefined, 
/** Write Compressed JSON files */
wrtJCompressed: <T>({ fileName, inputData, }: {
    fileName: string;
    inputData: T;
}) => boolean;
export { redJCompressed, wrtJCompressed, };
