/**
 * Copyright carclub.lipengbo.com
 * Author: hbbpbb@gmail.com
 */
define([
    '../logger'
], function (logger) {
    'use strict';

    var regSafe = /[\*\+\?\^\$\.\[\]\{\}\(\)\|\/\\]/;

    function sendJsonAndCache(res, err, docs) {
        if (err) {
            error(res, err);
        } else {
            res.json(200, docs);
            logger.info('common.sendJsonAndCache---->' + res.req.method + ' ' + res.req.url);
        }
    }

    function error(res, err) {
        logger.error('common.error---->' + res.req.method + ' ' + res.req.url);
        logger.error('common.error---->' + JSON.stringify(err));
        res.json(500, {error: err});
    }

    function message(res, msgKey) {
        res.json(200, {msgKey: msgKey});
    }

    function getSafeText(text) {
        var textArray = [];
        for (var i = 0; i < text.length; i++) {
            var char = text[i];
            if (char.search(regSafe) >= 0) {
                textArray.push('\\' + char);
            } else {
                textArray.push(char);
            }
        }
        var safeText = textArray.join('');
        return safeText;
    }

    function getTextOrEmpty(text) {
        if (text == null) {
            return '无';
        }
        return text;
    }

    function getCarNumber(text) {
        if (text && text.length >= 7) {
            return text.slice(0, 2) + '**' + text.slice(4, 7);
        }
        return text;
    }

    function getUserGradeText(grade) {
        var text = '☆';
        if (grade === 1) {
            text = '☆☆';
        } else if (grade === 2) {
            text = '☆☆☆';
        } else if (grade === 3) {
            text = '☆☆☆☆';
        } else if (grade > 3) {
            text = '☆☆☆☆☆';
        }
        return text;
    }

    return {
        sendJsonAndCache: sendJsonAndCache,
        error: error,
        message: message,
        getSafeText: getSafeText,
        getTextOrEmpty: getTextOrEmpty,
        getCarNumber: getCarNumber,
        getUserGradeText: getUserGradeText
    };
});