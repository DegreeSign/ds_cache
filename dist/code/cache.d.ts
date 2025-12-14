declare const getCacheDir: () => string, setCacheDir: (newDir: string) => void, 
/** Save Cache */
saveCache: (key: string, data: any) => boolean, 
/** Read Cache */
readCache: <T>(key: string) => T | undefined;
export { saveCache, readCache, getCacheDir, setCacheDir, };
