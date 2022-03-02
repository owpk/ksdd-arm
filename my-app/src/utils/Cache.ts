export class Cache<K, V> {

    private cacheMap: Map<K, CacheEntry<V>> = new Map()

    // seconds
    constructor(readonly expiresInSeconds: number) { }

    public put(key: K, data: V): void {
        console.log('Putting data to cache with key: ' + key)
        this.cacheMap.set(key, new CacheEntry<V>(data, this.expiresInSeconds))
    }

    public get(key: K): V | null {
        console.log('Getting data from cache with key: ' + key)
        let cacheEntry = this.cacheMap.get(key);
        if (cacheEntry) {
            if (new Date() > cacheEntry.expiresAt) {
                console.log(`${key} - expired. Deleting...`)
                this.cacheMap.delete(key)
                return null;
            }
            return cacheEntry.data
        }
        return null;
    }
}

class CacheEntry<T> {

    expiresAt: Date

    constructor(readonly data: T, expiresIn: number) {
        this.expiresAt = new Date()
        this.expiresAt.setSeconds(this.expiresAt.getSeconds() + expiresIn)
    }
}

// TODO concurrent hash map
export class CacheContext {

    private data: Map<string, Cache<any, any>>;

    constructor() {
        this.data = new Map()
    }

    public getCache(cacheName: string): Cache<any, any> {
        if (!this.data.has(cacheName))
            this.data.set(cacheName, new Cache<any, any>(100))
        // @ts-ignore
        return this.data.get(cacheName)
    }

    public putCache(cacheName: string, cache: Cache<any, any>): void {
        this.data.set(cacheName, cache)
    }
}
