const pendingPromises = {}

export const profileCacheKey = 'profile-cache-key'
export const profileCacheDuraction = 100000

export function get(key) {
  const storedItem = window.localStorage.getItem(key)
  if (storedItem) {
    var arrayOfSplitByPipe = storedItem.split('|')
    var expirationDate = Date.parse(arrayOfSplitByPipe[arrayOfSplitByPipe.length - 1])
    var currentDate = new Date()
    arrayOfSplitByPipe.pop()
    var objectToResolve
    objectToResolve = arrayOfSplitByPipe.join('|')
    objectToResolve = JSON.parse(objectToResolve)
    if (expirationDate < Date.parse(currentDate.toString())) {
      window.localStorage.removeItem(key)
    } else {
      console.log('Local storage cache hit: ' + key)
    }
  }
  return objectToResolve
}

export function getIfAbsentSet(key, expirationMinutes, getValue) {
  const storedItem = window.localStorage.getItem(key)
  if (storedItem) {
    var arrayOfSplitByPipe = storedItem.split('|')
    var expirationDate = Date.parse(arrayOfSplitByPipe[arrayOfSplitByPipe.length - 1])
    var currentDate = new Date()
    arrayOfSplitByPipe.pop()
    var objectToResolve
    objectToResolve = arrayOfSplitByPipe.join('|')
    objectToResolve = JSON.parse(objectToResolve)
    Promise.resolve(objectToResolve)
    if (expirationDate < Date.parse(currentDate.toString())) {
      window.localStorage.removeItem(key)
      delete pendingPromises[objectToResolve]
    } else {
      console.log('Local storage cache hit: ' + key)
      return objectToResolve
    }
  }

  let promise = pendingPromises[key]
  if (promise) {
    console.log('Pending promise cache hit: ' + key)
    return promise
  }

  promise = getValue()
  pendingPromises[key] = promise

  promise.then((valueObj) => {
    delete pendingPromises[promise]
    var expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes)
    try {
      if (valueObj) {
        window.localStorage.setItem(key, JSON.stringify(valueObj) + '|' + expirationDate)
      }
    } catch {
      window.localStorage.clear()
      return promise
      //just clear out storage here and return promise
    }
  })
  return promise
}

export function ifAbsentSet(key, expirationMinutes, setValue) {
  const storedItem = window.localStorage.getItem(key)
  if (storedItem) return
  var expirationDate = new Date()
  expirationDate.setMinutes(expirationDate.getMinutes() + expirationMinutes)
  try {
    if (setValue) {
      window.localStorage.setItem(key, JSON.stringify(setValue) + '|' + expirationDate)
    }
  } catch {
    window.localStorage.clear()
  }
}

export function remove(aCacheKey) {
  window.localStorage.removeItem(aCacheKey)
}

export function cleanUpExpiredItems() {
  Object.keys(window.localStorage).forEach((eachKey) => {
    const storedItem = window.localStorage.getItem(eachKey)
    if (storedItem == null) return
    var arrayOfSplitByPipe = storedItem?.split('|')
    var expirationDate = Date.parse(arrayOfSplitByPipe[arrayOfSplitByPipe.length - 1])
    var currentDate = new Date()
    if (expirationDate < Date.parse(currentDate.toString())) {
      window.localStorage.removeItem(eachKey)
    }
  })
}
