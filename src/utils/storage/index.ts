interface StorageData<T = any> {
  data: T	 											// 数据集
  expire: number | null 				// 过期时间
}

/**
 * 本地缓存
 * @param {any} options?:{expire?:number|null}
 * @returns {any}
 */
export function createLocalStorage(options?: { expire?: number | null }) {
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

  const { expire } = Object.assign({ expire: DEFAULT_CACHE_TIME }, options)

  function set<T = any>(key: string, data: T) {
    const storageData: StorageData<T> = {
      data,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    }

    const json = JSON.stringify(storageData)
    window.localStorage.setItem(key, json)
  }

  function get(key: string) {
    const json = window.localStorage.getItem(key)
    if (json) {
      let storageData: StorageData | null = null

      try {
        storageData = JSON.parse(json)
      }
      catch {
        // Prevent failure
      }

      if (storageData) {
        const { data, expire } = storageData
        if (expire === null || expire >= Date.now())
          return data
      }

      remove(key)
      return null
    }
  }

  function remove(key: string) {
    window.localStorage.removeItem(key)
  }

  function clear() {
    window.localStorage.clear()
  }

  return { set, get, remove, clear }
}

/**
 * 没有过期的本地缓存
 * @returns {any}
 */
export const ls = createLocalStorage()

/**
 * 有过期时间的本地缓存
 * @param {any} {expire:null}
 * @returns {any}
 */
export const ss = createLocalStorage({ expire: null })
