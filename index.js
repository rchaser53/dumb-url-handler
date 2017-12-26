"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.urlHandler = (targetPath) => {
  return targetPath.replace(/^\/?/, '/').replace(/\/?$/, '');
};

exports.hostHandler = (targetHost) => {
  return targetHost.replace(/\/?$/, '');
};

exports.createUrl = (host, paths) => {
  const formatedHost = exports.hostHandler(host);
  return paths.reduce((accumulatedPath, targetPath) => {
      return `${accumulatedPath}${exports.urlHandler(targetPath)}`;
  }, formatedHost);
};

exports.addQueryAttacher = (url) => {
  return url.replace(/\??$/, '?');
};

exports.addQuery = (url, queryObj) => {
  const baseUrl = exports.addQueryAttacher(url);
  const queryStringArray = Object.keys(queryObj).map((key) => {
      return `${key}=${queryObj[key]}`;
  });
  return `${baseUrl}${queryStringArray.join('&')}`;
};