const
    /** Format */
    utf8 = `utf8`,
    /** Date for error log */
    logDate = (): string => new Date()?.toISOString(),
    /** Log errors */
    logErr = ({
        fileName,
        disableLog,
        error,
        read,
        json,
        compressed,
    }: {
        fileName: string;
        disableLog?: boolean;
        error?: boolean;
        read?: boolean;
        json?: boolean;
        compressed?: boolean;
    }) => {
        // skip
        if (disableLog) return

        /** Error String */
        let errStr = `${error ? `error ${read ? ` reading` : ` writing`}` : `no`}`;
        errStr += `${compressed ? ` compressed` : ``}${json ? ` JSON` : ``} data`;
        errStr += read ? ` at` : ` to${!error ? ` write to` : ``}`;
        errStr += `:`;

        // log
        if (error) console.error(logDate(), errStr, fileName);
        else console.log(logDate(), errStr, fileName);
    },
    /** Check if data is JSON */
    getStrJSON = <T>(code: T): string | undefined => {
        try {
            if (
                code != undefined
                && Object.keys(code || {})
                    ?.length
            ) {
                return JSON.stringify(code);
            };
        } catch (e) { };
    };

export {
    utf8,
    logDate,
    logErr,
    getStrJSON,
}