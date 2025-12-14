declare const 
/** Format */
utf8 = "utf8", 
/** Date for error log */
logDate: () => string, 
/** Log errors */
logErr: ({ fileName, disableLog, error, read, json, compressed, }: {
    fileName: string;
    disableLog?: boolean;
    error?: boolean;
    read?: boolean;
    json?: boolean;
    compressed?: boolean;
}) => void, 
/** Check if data is JSON */
getStrJSON: <T>(code: T) => string | undefined;
export { utf8, logDate, logErr, getStrJSON, };
