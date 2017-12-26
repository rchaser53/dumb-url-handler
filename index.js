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
    var queryStringArray = Object.keys(queryObj).map(function (key) {
        return key + "=" + queryObj[key];
    });
    return "" + baseUrl + queryStringArray.join('&');
};