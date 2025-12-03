declare const getCacheDir: () => string, setCacheDir: (newDir: string) => void, 
/** Save Cache */
saveCache: (key: string, data: any) => void, 
/** Read Cache */
readCache: (key: string) => any;
export { saveCache, readCache, getCacheDir, setCacheDir, };
