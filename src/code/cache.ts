import { safeFolder, wrtJ, redJ } from "./disk";

let cacheDir = `/root/server_cache/cache/`;

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
    ) => {
        liveCache[key] = data;
        if (key?.includes(`/`)) {
            const targetFolder = key.substring(0, key.lastIndexOf('/'));
            safeFolder(`${cacheDir}${targetFolder}`);
        };
        wrtJ(`${cacheDir}${key}.json`, data);
    },
    /** Read Cache */
    readCache = (
        key: string
    ) => {
        if (!liveCache[key])
            liveCache[key] = redJ(`${cacheDir}${key}.json`, true);
        return liveCache[key]
    };

export {
    saveCache,
    readCache,
    getCacheDir,
    setCacheDir,
}