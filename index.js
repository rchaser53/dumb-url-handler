"use strict";
exports.__esModule = true;

exports.urlHandler = function (targetPath) {
    return targetPath.replace(/^\/?/, '/').replace(/\/?$/, '');
};

exports.hostHandler = function (targetHost) {
    return targetHost.replace(/\/?$/, '');
};

exports.createUrl = function (host, paths) {
    var formatedHost = exports.hostHandler(host);
    return paths.reduce(function (accumulatedPath, targetPath) {
        return "" + accumulatedPath + exports.urlHandler(targetPath);
    }, formatedHost);
};

exports.addQueryAttacher = function (url) {
    return url.replace(/\??$/, '?');
};

exports.addQuery = function (url, queryObj) {
    var baseUrl = exports.addQueryAttacher(url);
    var queryStringArray = Object.keys(queryObj).reduce(function (stack, key) {
        if (queryObj[key] == null) return stack
        return stack.concat(key + "=" + queryObj[key]);
    }, []);
    return "" + baseUrl + queryStringArray.join('&');
};