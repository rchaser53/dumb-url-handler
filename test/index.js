const assert = require('power-assert')
const dumbUrlHandler = require('..')

const urlHandler = dumbUrlHandler.urlHandler
const hostHandler = dumbUrlHandler.hostHandler
const createUrl = dumbUrlHandler.createUrl
const addQueryAttacher = dumbUrlHandler.addQueryAttacher
const addQuery = dumbUrlHandler.addQuery
const parseQuery = dumbUrlHandler.parseQuery

describe('url-handler', function() {
	describe('urlHandler', function() {
		it('should return "/xxx" format ', function() {
			assert.equal(urlHandler('hoge'), '/hoge')
			assert.equal(urlHandler('/hoge'), '/hoge')
			assert.equal(urlHandler('hoge/'), '/hoge')
			assert.equal(urlHandler('/hoge/'), '/hoge')
		})

		it('should return "/xxx/yyy.js" format ', function() {
			assert.equal(urlHandler('hoge/abc.js'), '/hoge/abc.js')
			assert.equal(urlHandler('/hoge/abc.js'), '/hoge/abc.js')
		})
	})

	describe('hostHandler', function() {
		it('should return "http://sample" format ', function() {
			assert.equal(hostHandler('http://localhost'), 'http://localhost')
			assert.equal(hostHandler('http://localhost/'), 'http://localhost')
			assert.equal(hostHandler('http://localhost:3000'), 'http://localhost:3000')
			assert.equal(hostHandler('http://localhost:3000/'), 'http://localhost:3000')
		})
	})

	describe('createUrl', function() {
		it('should return "http://xxx/yyy.js" format ', function() {
			assert.equal(createUrl('http://localhost', ['yyy.js']), 'http://localhost/yyy.js')
			assert.equal(createUrl('http://localhost/', ['yyy.js']), 'http://localhost/yyy.js')
			assert.equal(createUrl('http://localhost:3000', ['yyy', 'zzz.js']), 'http://localhost:3000/yyy/zzz.js')
		})
	})

	describe('addQueryAttacher', function() {
		it('should return "http://xxx/yyy.js?" format ', function() {
			assert.equal(addQueryAttacher('http://localhost/yyy.js'), 'http://localhost/yyy.js?')
			assert.equal(addQueryAttacher('http://localhost/yyy.js?'), 'http://localhost/yyy.js?')
		})
	})

	describe('addQuery', function() {
		it('should return "http://xxx/yyy.js?abc=def&hij=klm" format ', function() {
			assert.equal(
				addQuery('http://localhost/yyy.js', {
					abc: 'def'
				}),
				'http://localhost/yyy.js?abc=def'
			)

			assert.equal(
				addQuery('http://localhost/yyy.js', {
					abc: 'def',
					hij: 'klm'
				}),
				'http://localhost/yyy.js?abc=def&hij=klm'
			)

			assert.equal(addQuery('http://localhost/yyy.js', {}), 'http://localhost/yyy.js?')
		})

		it('should remove undefined or null value query', function() {
			assert.equal(
				addQuery('http://localhost/yyy.js', {
					abc: null
				}),
				'http://localhost/yyy.js?'
			)

			assert.equal(
				addQuery('http://localhost/yyy.js', {
					abc: undefined
				}),
				'http://localhost/yyy.js?'
			)

			assert.equal(
				addQuery('http://localhost/yyy.js', {
					abc: 123,
					def: undefined,
					ghi: 'nyan'
				}),
				'http://localhost/yyy.js?abc=123&ghi=nyan'
			)
		})
	})

	describe('parseQuery', function() {
		it('should return query as javascript object like "{key: value}"', function() {
			assert.deepEqual(parseQuery('http://localhost/yyy.js'), {})

			assert.deepEqual(parseQuery('http://localhost/yyy.js?'), {})

			assert.deepEqual(parseQuery('http://localhost/yyy.js?abc=123'), { abc: '123' })

			assert.deepEqual(parseQuery('http://localhost/yyy.js?abc=123&def=456'), { abc: '123', def: '456' })
		})
	})

	describe('parseQuery', function() {
		it('should emit warning and return {} when query is invalid', function() {
			assert.deepEqual(parseQuery('http://localhost/yyy.js?a'), {})

			assert.deepEqual(parseQuery('http://localhost/yyy.js?a='), { a: '' })

			assert.deepEqual(parseQuery('http://localhost/yyy.js?a=b&'), { a: 'b' })

			assert.deepEqual(parseQuery('http://localhost/yyy.js?a=b&c'), { a: 'b' })

			assert.deepEqual(parseQuery('http://localhost/yyy.js?a=b&c='), { a: 'b', c: '' })

			assert.deepEqual(parseQuery('http://localhost/yyy.js?a=b&c&d=e'), { a: 'b', d: 'e' })
		})
	})
})
