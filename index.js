'use strict'
exports.__esModule = true

exports.urlHandler = function(targetPath) {
  targetPath = targetPath || ''
  targetPath = targetPath.toString()
	return targetPath.replace(/^\/?/, '/').replace(/\/?$/, '')
}

exports.hostHandler = function(targetHost) {
	return targetHost.replace(/\/?$/, '')
}

exports.createUrl = function(host, paths) {
	var formatedHost = exports.hostHandler(host)
	return paths.reduce(function(accumulatedPath, targetPath) {
		return '' + accumulatedPath + exports.urlHandler(targetPath)
	}, formatedHost)
}

exports.addQueryAttacher = function(url) {
	return url.replace(/\??$/, '?')
}

exports.addQuery = function(url, queryObj) {
	var baseUrl = exports.addQueryAttacher(url)
	var queryStringArray = Object.keys(queryObj).reduce(function(stack, key) {
		var queryValue = queryObj[key] != null ? queryObj[key] : ''
		return stack.concat(key + '=' + queryValue)
	}, [])
	return '' + baseUrl + queryStringArray.join('&')
}

exports.parseQuery = function(url) {
	const queryString = url.replace(/^(\s|\S)*\?/, '')
	const queries = queryString.split('&')

	return queries.reduce(function(stack, next) {
		const queryTupple = next.split('=')
		if (queryTupple.length !== 2) return stack

		stack[queryTupple[0]] = queryTupple[1]
		return stack
	}, {})
}
