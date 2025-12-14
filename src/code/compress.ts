import { gzipSync, gunzipSync } from 'node:zlib';
import { writeFileSync, readFileSync } from 'node:fs';
import { getStrJSON, logErr, utf8 } from './utils';

const
    /** Read Compressed JSON files */
    redJCompressed = <T>({
        fileName,
        disableLog,
    }: {
        fileName: string;
        disableLog?: boolean;
    }): T | undefined => {
        try {
            const compressed: Buffer = readFileSync(fileName);
            if (compressed) {
                const
                    decompressed: Buffer = gunzipSync(compressed),
                    jsonStr = decompressed.toString(utf8),
                    data: T = JSON.parse(jsonStr);
                return data
            } else logErr({
                fileName,
                disableLog,
                read: true,
                json: true,
                compressed: true,
            });
        } catch (e) {
            logErr({
                fileName,
                disableLog,
                error: true,
                read: true,
                json: true,
                compressed: true,
            });
        };
    },
    /** Write Compressed JSON files */
    wrtJCompressed = <T>({
        fileName,
        inputData,
    }: {
        fileName: string;
        inputData: T;
    }): boolean => {
        try {
            const data = getStrJSON(inputData);
            if (data) {
                const compressed: Buffer = gzipSync(data);
                writeFileSync(fileName, compressed);
                return true
            } else logErr({
                fileName,
                json: true,
                compressed: true,
            });
        } catch (e) {
            logErr({
                fileName,
                error: true,
                json: true,
                compressed: true,
            });
        };
        return false
    };

export {
    redJCompressed,
    wrtJCompressed,
};