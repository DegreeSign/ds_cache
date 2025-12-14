import { safeFolder } from "./dir";
import { wrtJ, redJ } from "./disk";

let cacheDir = `./cache/`;

const
    getCacheDir = () => cacheDir,
    setCacheDir = (newDir: string) => {
        safeFolder(newDir);
        cacheDir = newDir;
    },
    /** Ready Live Cache */
    liveCache: { [key: string]: any } = {},
    /** Save Cache */
    saveCache = (
        key: string,
        data: any
    ): boolean => {
        try {
            liveCache[key] = data;
            if (key?.includes(`/`))
                safeFolder(`${cacheDir}${key.substring(0, key.lastIndexOf('/'))}`);
            return wrtJ(`${cacheDir}${key}.json`, data);
        } catch (e) {
            console.log(`saveCache failed`, e);
        };
        return false
    },
    /** Read Cache */
    readCache = <T>(
        key: string
    ): T | undefined => {
        try {
            if (!liveCache[key])
                liveCache[key] = redJ(`${cacheDir}${key}.json`, true);
            return liveCache[key]
        } catch (e) {
            console.log(`readCache failed`, e);
        };
    };

export {
    saveCache,
    readCache,
    getCacheDir,
    setCacheDir,
}