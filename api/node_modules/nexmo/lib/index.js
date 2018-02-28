'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var querystring = require('querystring');

var initialized = false;
var msgpath = { host: 'rest.nexmo.com', path: '/sms/json' };
var shortcodePath = { host: 'rest.nexmo.com', path: '/sc/us/${type}/json' };
var ttsEndpoint = { host: 'api.nexmo.com', path: '/tts/json' };
var ttsPromptEndpoint = { host: 'api.nexmo.com', path: '/tts-prompt/json' };
var callEndpoint = { host: 'rest.nexmo.com', path: '/call/json' };
var verifyEndpoint = { host: 'api.nexmo.com', path: '/verify/json' };
var checkVerifyEndpoint = { host: 'api.nexmo.com', path: '/verify/check/json' };
var controlVerifyEndpoint = { host: 'api.nexmo.com', path: '/verify/control/json' };
var searchVerifyEndpoint = { host: 'api.nexmo.com', path: '/verify/search/json' };
var niEndpoint = { host: 'api.nexmo.com', path: '/ni/advanced/async/json' };
var niBasicEndpoint = { host: 'api.nexmo.com', path: '/ni/basic/json' };
var niStandardEndpoint = { host: 'api.nexmo.com', path: '/ni/standard/json' };
var niAdvancedEndpoint = { host: 'api.nexmo.com', path: '/ni/advanced/json' };
var applicationsEndpoint = { host: 'api.nexmo.com', path: '/v1/applications' };
var up = {};
var numberPattern = new RegExp("^[0-9 +()-]*$");

var _options = null;

//Error message resources are maintained globally in one place for easy management
var ERROR_MESSAGES = {
    sender: 'Invalid from address',
    to: 'Invalid to address',
    msg: 'Invalid Text Message',
    msgParams: 'Invalid shortcode message parameters',
    countrycode: 'Invalid Country Code',
    msisdn: 'Invalid MSISDN passed',
    body: 'Invalid Body value in Binary Message',
    udh: 'Invalid udh value in Binary Message',
    title: 'Invalid title in WAP Push message',
    url: 'Invalid url in WAP Push message',
    maxDigits: 'Invalid max digits for TTS prompt',
    byeText: 'Invalid bye text for TTS prompt',
    pinCode: 'Invalid pin code for TTS confirm',
    failedText: 'Invalid failed text for TTS confirm',
    answerUrl: 'Invalid answer URL for call',
    verifyValidation: 'Missing Mandatory fields (number and/or brand)',
    checkVerifyValidation: 'Missing Mandatory fields (request_id and/or code)',
    controlVerifyValidation: 'Missing Mandatory fields (request_id and/or cmd-command)',
    searchVerifyValidation: 'Missing Mandatory fields (request_id or request_ids)',
    numberInsightAdvancedValidation: 'Missing Mandatory fields (number and/or callback url)',
    numberInsightValidation: 'Missing Mandatory field - number',
    numberInsightPatternFailure: 'Number can contain digits and may include any or all of the following: white space, -,+, (, ).',
    optionsNotAnObject: 'Options parameter should be a dictionary. Check the docs for valid properties for options',
    applicationName: 'Invalid argument: name',
    applicationType: 'Invalid argument: type',
    applicationAnswerUrl: 'Invalid argument: answerUrl',
    applicationEventUrl: 'Invalid argument: eventUrl',
    applicationId: 'Invalid argument: appId',
    product: 'Invalid product. Should be one of [voice, sms]'
};

exports.initialize = function (pkey, psecret, options) {
    if (!pkey || !psecret) {
        throw 'key and secret cannot be empty, set valid values';
    }
    up = {
        api_key: pkey,
        api_secret: psecret
    };
    _options = options;
    initialized = true;
};

exports.sendBinaryMessage = function (sender, recipient, body, udh, callback) {
    if (!body) {
        sendError(callback, new Error(ERROR_MESSAGES.body));
    } else if (!udh) {
        sendError(callback, new Error(ERROR_MESSAGES.udh));
    } else {
        sendMessage({
            from: sender,
            to: recipient,
            type: 'binary',
            body: body,
            udh: udh
        }, callback);
    }
};

exports.sendWapPushMessage = function (sender, recipient, title, url, validity, callback) {
    if (!title) {
        sendError(callback, new Error(ERROR_MESSAGES.title));
    } else if (!url) {
        sendError(callback, new Error(ERROR_MESSAGES.url));
    } else {
        if (typeof validity == 'function') {
            callback = validity;
            validity = 86400000;
        }
        sendMessage({
            from: sender,
            to: recipient,
            type: 'wappush',
            title: title,
            validity: validity,
            url: url
        }, callback);
    }
};

exports.sendTextMessage = function (sender, recipient, message, opts, callback) {
    if (!message) {
        sendError(callback, new Error(ERROR_MESSAGES.msg));
    } else {
        if (!callback) {
            callback = opts;
            opts = {};
        }
        opts['from'] = sender;
        opts['to'] = recipient;
        opts['text'] = message;
        sendMessage(opts, callback);
    }
};

exports.sendMessage = function (opts, callback) {
    sendMessage(opts, callback);
};
function sendMessage(data, callback) {
    if (!data.from) {
        sendError(callback, new Error(ERROR_MESSAGES.sender));
    } else if (!data.to) {
        sendError(callback, new Error(ERROR_MESSAGES.to));
    } else {
        var path = clone(msgpath);
        path.path += '?' + querystring.stringify(data);
        _options.logger.info('sending message from ' + data.from + ' to ' + data.to + ' with message ' + data.text);
        sendRequest(path, 'POST', function (err, apiResponse) {
            if (!err && apiResponse.status && apiResponse.messages[0].status > 0) {
                sendError(callback, new Error(apiResponse.messages[0]['error-text']), apiResponse);
            } else {
                if (callback) callback(err, apiResponse);
            }
        });
    }
}

function sendViaShortcode(type, recipient, messageParams, opts, callback) {
    if (!recipient) {
        sendError(callback, new Error(ERROR_MESSAGES.to));
    }
    if (!messageParams || !Object.keys(messageParams)) {
        sendError(callback, new Error(ERROR_MESSAGES.msgParams));
    }
    opts = opts || {};
    var path = clone(shortcodePath);
    path.path = path.path.replace('${type}', type);
    Object.keys(messageParams).forEach(function (key) {
        opts[key] = messageParams[key];
    });
    opts.to = recipient;
    path.path += '?' + querystring.stringify(opts);
    _options.logger.info('sending message from shortcode ' + type + ' to ' + recipient + ' with parameters ' + JSON.stringify(messageParams));
    sendRequest(path, 'POST', function (err, apiResponse) {
        if (!err && apiResponse.status && apiResponse.messages[0].status > 0) {
            sendError(callback, new Error(apiResponse.messages[0]['error-text']), apiResponse);
        } else {
            if (callback) callback(err, apiResponse);
        }
    });
}
exports.shortcodeAlert = function (recipient, messageParams, opts, callback) {
    sendViaShortcode('alert', recipient, messageParams, opts, callback);
};
exports.shortcode2FA = function (recipient, messageParams, opts, callback) {
    sendViaShortcode('2fa', recipient, messageParams, opts, callback);
};
exports.shortcodeMarketing = function (recipient, messageParams, opts, callback) {
    sendViaShortcode('marketing', recipient, messageParams, opts, callback);
};

function clone(a) {
    return JSON.parse(JSON.stringify(a));
}

function getEndpoint(action) {
    return { path: action };
}

function sendRequest(endpoint, method, callback) {
    endpoint.path = endpoint.path + (endpoint.path.indexOf('?') > 0 ? '&' : '?') + querystring.stringify(up);
    _options.httpClient.request(endpoint, method, callback);
}

exports.checkBalance = function (callback) {
    var balanceEndpoint = getEndpoint('/account/get-balance');
    sendRequest(balanceEndpoint, callback);
};

exports.getPricing = function (countryCode, callback) {
    if (!countryCode || countryCode.length != 2) {
        sendError(callback, new Error(ERROR_MESSAGES.countrycode));
    } else {
        var pricingEndpoint = getEndpoint('/account/get-pricing/outbound');
        pricingEndpoint.path += '?country=' + countryCode;
        sendRequest(pricingEndpoint, callback);
    }
};

exports.getPhonePricing = function (product, msisdn, callback) {
    if (!product || product != 'sms' && product != 'voice') {
        sendError(callback, new Error(ERROR_MESSAGES.product));
    } else if (!msisdn) {
        sendError(callback, new Error(ERROR_MESSAGES.msisdn));
    } else {
        var pricingEndpoint = getEndpoint('/account/get-phone-pricing/outbound');
        pricingEndpoint.path += "/" + product + "/" + up.api_key + "/" + up.api_secret + "/" + msisdn;
        sendRequest(pricingEndpoint, callback);
    }
};

exports.getNumbers = function (options, callback) {
    var numbersEndpoint = getEndpoint('/account/numbers');
    if (typeof options == 'function') {
        callback = options;
    } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) == 'object') {
        numbersEndpoint.path = numbersEndpoint.path + '?';
        for (var key in options) {
            numbersEndpoint.path = numbersEndpoint.path + key + '=' + options[key] + '&';
        }
    } else {
        sendError(callback, new Error(ERROR_MESSAGES.optionsNotAnObject));
        return;
    }
    sendRequest(numbersEndpoint, callback);
};

exports.searchNumbers = function (countryCode, pattern, callback) {
    if (!countryCode || countryCode.length != 2) {
        sendError(callback, new Error(ERROR_MESSAGES.countrycode));
    } else {
        var searchEndpoint = getEndpoint('/number/search');
        searchEndpoint.path += '?country=' + countryCode;
        if (typeof pattern == 'function') {
            callback = pattern;
        } else if ((typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) == 'object') {
            searchEndpoint.path = searchEndpoint.path + '&';
            for (var arg in pattern) {
                searchEndpoint.path = searchEndpoint.path + arg + '=' + pattern[arg] + '&';
            }
        } else {
            searchEndpoint.path = searchEndpoint.path + '&pattern=' + pattern;
        }
        sendRequest(searchEndpoint, callback);
    }
};

exports.buyNumber = function (countryCode, msisdn, callback) {
    if (!countryCode || countryCode.length != 2) {
        sendError(callback, new Error(ERROR_MESSAGES.countrycode));
    } else if (!msisdn) {
        sendError(callback, new Error(ERROR_MESSAGES.msisdn));
    } else {
        var buyEndpoint = getEndpoint('/number/buy');
        buyEndpoint.path += '?country=' + countryCode + '&msisdn=' + msisdn;
        sendRequest(buyEndpoint, 'POST', callback);
    }
};

exports.cancelNumber = function (countryCode, msisdn, callback) {
    if (!countryCode || countryCode.length != 2) {
        sendError(callback, new Error(ERROR_MESSAGES.countrycode));
    } else if (!msisdn) {
        sendError(callback, new Error(ERROR_MESSAGES.msisdn));
    } else {
        var cancelEndpoint = getEndpoint('/number/cancel');
        cancelEndpoint.path += '?country=' + countryCode + '&msisdn=' + msisdn;
        sendRequest(cancelEndpoint, 'POST', callback);
    }
};

exports.cancelNumber = function (countryCode, msisdn, callback) {
    if (!countryCode || countryCode.length != 2) {
        sendError(callback, new Error(ERROR_MESSAGES.countrycode));
    } else if (!msisdn) {
        sendError(callback, new Error(ERROR_MESSAGES.msisdn));
    } else {
        var cancelEndpoint = getEndpoint('/number/cancel');
        cancelEndpoint.path += '?country=' + countryCode + '&msisdn=' + msisdn;
        sendRequest(cancelEndpoint, 'POST', callback);
    }
};

exports.updateNumber = function (countryCode, msisdn, params, callback) {
    if (!countryCode || countryCode.length != 2) {
        sendError(callback, new Error(ERROR_MESSAGES.countrycode));
    } else if (!msisdn) {
        sendError(callback, new Error(ERROR_MESSAGES.msisdn));
    } else {
        var updateEndpoint = getEndpoint('/number/update');
        updateEndpoint.path += '?country=' + countryCode + '&msisdn=' + msisdn;
        updateEndpoint.path = updateEndpoint.path + '&';
        for (var arg in params) {
            updateEndpoint.path = updateEndpoint.path + arg + '=' + encodeURIComponent(params[arg]) + '&';
        }
        sendRequest(updateEndpoint, 'POST', callback);
    }
};

exports.getApplications = function (options, callback) {
    var endpoint = getEndpoint(applicationsEndpoint.path);
    endpoint.host = applicationsEndpoint.host;
    if (typeof options == 'function') {
        callback = options;
    } else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) == 'object') {
        endpoint.path += '?';
        for (var key in options) {
            endpoint.path += key + '=' + options[key] + '&';
        }
    } else {
        sendError(callback, new Error(ERROR_MESSAGES.optionsNotAnObject));
        return;
    }
    sendRequest(endpoint, callback);
};

exports.createApplication = function (name, type, answerUrl, eventUrl, options, callback) {
    if (!name || name.length < 1) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationName));
    } else if (!type) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationType));
    } else if (!answerUrl) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationAnswerUrl));
    } else if (!eventUrl) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationEventUrl));
    } else {
        var createEndpoint = getEndpoint(applicationsEndpoint.path);
        createEndpoint.host = applicationsEndpoint.host;
        createEndpoint.path += '?name=' + encodeURIComponent(name) + '&type=' + type + '&answer_url=' + answerUrl + '&event_url=' + eventUrl;
        for (var key in options) {
            createEndpoint.path += '&' + key + '=' + options[key];
        }
        sendRequest(createEndpoint, 'POST', callback);
    }
};

exports.getApplication = function (appId, callback) {
    if (!appId || appId.length < 36) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationId));
    } else {
        var showEndpoint = getEndpoint(applicationsEndpoint.path + "/" + appId);
        showEndpoint.host = applicationsEndpoint.host;
        sendRequest(showEndpoint, callback);
    }
};

exports.updateApplication = function (appId, name, type, answerUrl, eventUrl, options, callback) {
    if (!appId || appId.length < 36) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationId));
    } else if (!name || name.length < 1) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationName));
    } else if (!type) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationType));
    } else if (!answerUrl) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationAnswerUrl));
    } else if (!eventUrl) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationEventUrl));
    } else {
        var updateEndpoint = getEndpoint(applicationsEndpoint.path + "/" + appId);
        updateEndpoint.path += '?name=' + encodeURIComponent(name) + '&type=' + type + '&answer_url=' + answerUrl + '&event_url=' + eventUrl;
        updateEndpoint.host = applicationsEndpoint.host;
        for (var key in options) {
            updateEndpoint.path = updateEndpoint.path + '&' + key + '=' + options[key];
        }
        sendRequest(updateEndpoint, 'PUT', callback);
    }
};

exports.deleteApplication = function (appId, callback) {
    if (!appId || appId.length < 36) {
        sendError(callback, new Error(ERROR_MESSAGES.applicationId));
    } else {
        var deleteEndpoint = getEndpoint(applicationsEndpoint.path + "/" + appId);
        deleteEndpoint.host = applicationsEndpoint.host;
        sendRequest(deleteEndpoint, 'DELETE', callback);
    }
};

exports.changePassword = function (newSecret, callback) {
    var settingsEndpoint = getEndpoint('/account/settings');
    settingsEndpoint.path += '?newSecret=' + encodeURIComponent(newSecret);
    sendRequest(settingsEndpoint, 'POST', callback);
};

exports.changeMoCallbackUrl = function (newUrl, callback) {
    var settingsEndpoint = getEndpoint('/account/settings');
    settingsEndpoint.path += '?moCallBackUrl=' + encodeURIComponent(newUrl);
    sendRequest(settingsEndpoint, 'POST', callback);
};

exports.changeDrCallbackUrl = function (newUrl, callback) {
    var settingsEndpoint = getEndpoint('/account/settings');
    settingsEndpoint.path += '?drCallBackUrl=' + encodeURIComponent(newUrl);
    sendRequest(settingsEndpoint, 'POST', callback);
};

exports.verifyNumber = function (inputParams, callback) {
    if (!inputParams.number || !inputParams.brand) {
        sendError(callback, new Error(ERROR_MESSAGES.verifyValidation));
    } else {
        var vEndpoint = clone(verifyEndpoint);
        vEndpoint.path += '?' + querystring.stringify(inputParams);
        sendRequest(vEndpoint, callback);
    }
};

exports.checkVerifyRequest = function (inputParams, callback) {
    if (!inputParams.request_id || !inputParams.code) {
        sendError(callback, new Error(ERROR_MESSAGES.checkVerifyValidation));
    } else {
        var vEndpoint = clone(checkVerifyEndpoint);
        vEndpoint.path += '?' + querystring.stringify(inputParams);
        sendRequest(vEndpoint, callback);
    }
};

exports.controlVerifyRequest = function (inputParams, callback) {
    if (!inputParams.request_id || !inputParams.cmd) {
        sendError(callback, new Error(ERROR_MESSAGES.controlVerifyValidation));
    } else {
        var vEndpoint = clone(controlVerifyEndpoint);
        vEndpoint.path += '?' + querystring.stringify(inputParams);
        sendRequest(vEndpoint, callback);
    }
};

exports.searchVerifyRequest = function (requestIds, callback) {
    var requestIdParam = {};
    if (!requestIds) {
        sendError(callback, new Error(ERROR_MESSAGES.searchVerifyValidation));
    } else {
        if (Array.isArray(requestIds)) {
            if (requestIds.length == 1) {
                requestIdParam.request_id = requestIds;
            } else {
                requestIdParam.request_ids = requestIds;
            }
        } else {
            requestIdParam.request_id = requestIds;
        }
        var vEndpoint = clone(searchVerifyEndpoint);
        vEndpoint.path += '?' + querystring.stringify(requestIdParam);
        sendRequest(vEndpoint, callback);
    }
};

exports.numberInsight = function (inputParams, callback) {
    numberInsightAsync(inputParams, callback);
};

exports.numberInsightBasic = function (inputParams, callback) {
    numberInsightCommon(niBasicEndpoint, inputParams, callback);
};

exports.numberInsightStandard = function (inputParams, callback) {
    numberInsightCommon(niStandardEndpoint, inputParams, callback);
};

exports.numberInsightAdvanced = function (inputParams, callback) {
    numberInsightCommon(niAdvancedEndpoint, inputParams, callback);
};

exports.numberInsightAdvancedAsync = function (inputParams, callback) {
    numberInsightAsync(inputParams, callback);
};

function numberInsightAsync(inputParams, callback) {
    if (!inputParams.number || !inputParams.callback) {
        sendError(callback, new Error(ERROR_MESSAGES.numberInsightAdvancedValidation));
    } else {
        var nEndpoint = clone(niEndpoint);
        nEndpoint.path += '?' + querystring.stringify(inputParams);
        sendRequest(nEndpoint, callback);
    }
}

function numberInsightCommon(endpoint, inputParams, callback) {
    if (validateNumber(inputParams, callback)) {
        var inputObj;
        if ((typeof inputParams === 'undefined' ? 'undefined' : _typeof(inputParams)) != 'object') {
            inputObj = { number: inputParams };
        } else {
            inputObj = inputParams;
        }
        var nEndpoint = clone(endpoint);
        nEndpoint.path += '?' + querystring.stringify(inputObj);
        sendRequest(nEndpoint, callback);
    }
}
function validateNumber(inputParams, callback) {
    if ((typeof inputParams === 'undefined' ? 'undefined' : _typeof(inputParams)) == 'object' && !inputParams.number) {
        sendError(callback, new Error(ERROR_MESSAGES.numberInsightValidation));
        return false;
    } else if ((typeof inputParams === 'undefined' ? 'undefined' : _typeof(inputParams)) == 'object' && !numberPattern.test(inputParams.number)) {
        sendError(callback, new Error(ERROR_MESSAGES.numberInsightPatternFailure));
        return false;
    } else if ((typeof inputParams === 'undefined' ? 'undefined' : _typeof(inputParams)) != 'object' && (!inputParams || !numberPattern.test(inputParams))) {
        sendError(callback, new Error(ERROR_MESSAGES.numberInsightPatternFailure));
        return false;
    }
    return true;
}

function sendVoiceMessage(voiceEndpoint, data, callback) {
    if (!data.to) {
        sendError(callback, new Error(ERROR_MESSAGES.to));
    } else {
        var endpoint = clone(voiceEndpoint);
        endpoint.path += '?' + querystring.stringify(data);
        _options.logger.info('sending TTS message to ' + data.to + ' with message ' + data.text);
        sendRequest(endpoint, 'POST', function (err, apiResponse) {
            if (!err && apiResponse.status && apiResponse.status > 0) {
                sendError(callback, new Error(apiResponse['error-text']), apiResponse);
            } else {
                if (callback) callback(err, apiResponse);
            }
        });
    }
}

exports.sendTTSMessage = function (recipient, message, opts, callback) {
    if (!message) {
        sendError(callback, new Error(ERROR_MESSAGES.msg));
    } else {
        if (!opts) {
            opts = {};
        }
        opts['to'] = recipient;
        opts['text'] = message;
        sendVoiceMessage(ttsEndpoint, opts, callback);
    }
};

exports.sendTTSPromptWithCapture = function (recipient, message, maxDigits, byeText, opts, callback) {
    if (!message) {
        sendError(callback, new Error(ERROR_MESSAGES.msg));
    } else if (!maxDigits || isNaN(maxDigits) || maxDigits.length > 16) {
        sendError(callback, new Error(ERROR_MESSAGES.maxDigits));
    } else if (!byeText) {
        sendError(callback, new Error(ERROR_MESSAGES.byeText));
    } else {
        if (!opts) {
            opts = {};
        }
        opts['to'] = recipient;
        opts['text'] = message;
        opts['max_digits'] = maxDigits;
        opts['bye_text'] = byeText;
        sendVoiceMessage(ttsPromptEndpoint, opts, callback);
    }
};

exports.sendTTSPromptWithConfirm = function (recipient, message, maxDigits, pinCode, byeText, failedText, opts, callback) {
    if (!message) {
        sendError(callback, new Error(ERROR_MESSAGES.msg));
    } else if (!maxDigits || isNaN(maxDigits) || maxDigits.length > 16) {
        sendError(callback, new Error(ERROR_MESSAGES.maxDigits));
    } else if (!pinCode || pinCode.length !== maxDigits) {
        sendError(callback, new Error(ERROR_MESSAGES.pinCode));
    } else if (!byeText) {
        sendError(callback, new Error(ERROR_MESSAGES.byeText));
    } else if (!failedText) {
        sendError(callback, new Error(ERROR_MESSAGES.failedText));
    } else {
        if (!opts) {
            opts = {};
        }
        opts['to'] = recipient;
        opts['text'] = message;
        opts['max_digits'] = maxDigits;
        opts['pin_code'] = pinCode;
        opts['bye_text'] = byeText;
        opts['failed_text'] = failedText;
        sendVoiceMessage(ttsPromptEndpoint, opts, callback);
    }
};

exports.call = function (recipient, answerUrl, opts, callback) {
    if (!answerUrl) {
        sendError(callback, new Error(ERROR_MESSAGES.answerUrl));
    } else {
        if (!opts) {
            opts = {};
        }
        opts['to'] = recipient;
        opts['answer_url'] = answerUrl;
        sendVoiceMessage(callEndpoint, opts, callback);
    }
};

function sendError(callback, err, returnData) {
    // Throw the error in case if there is no callback passed
    if (callback) {
        callback(err, returnData);
    } else {
        throw err;
    }
}

exports.setHost = function (aHost) {
    msgpath.host = aHost;
    shortcodePath.host = aHost;
    ttsEndpoint.host = aHost;
    ttsPromptEndpoint.host = aHost;
    callEndpoint.host = aHost;
    verifyEndpoint.host = aHost;
    checkVerifyEndpoint.host = aHost;
    controlVerifyEndpoint.host = aHost;
    searchVerifyEndpoint.host = aHost;
    niEndpoint.host = aHost;
    niBasicEndpoint.host = aHost;
    niStandardEndpoint.host = aHost;
    applicationsEndpoint.host = aHost;
};

exports.setPort = function (aPort) {
    port = aPort;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJxdWVyeXN0cmluZyIsInJlcXVpcmUiLCJpbml0aWFsaXplZCIsIm1zZ3BhdGgiLCJob3N0IiwicGF0aCIsInNob3J0Y29kZVBhdGgiLCJ0dHNFbmRwb2ludCIsInR0c1Byb21wdEVuZHBvaW50IiwiY2FsbEVuZHBvaW50IiwidmVyaWZ5RW5kcG9pbnQiLCJjaGVja1ZlcmlmeUVuZHBvaW50IiwiY29udHJvbFZlcmlmeUVuZHBvaW50Iiwic2VhcmNoVmVyaWZ5RW5kcG9pbnQiLCJuaUVuZHBvaW50IiwibmlCYXNpY0VuZHBvaW50IiwibmlTdGFuZGFyZEVuZHBvaW50IiwibmlBZHZhbmNlZEVuZHBvaW50IiwiYXBwbGljYXRpb25zRW5kcG9pbnQiLCJ1cCIsIm51bWJlclBhdHRlcm4iLCJSZWdFeHAiLCJfb3B0aW9ucyIsIkVSUk9SX01FU1NBR0VTIiwic2VuZGVyIiwidG8iLCJtc2ciLCJtc2dQYXJhbXMiLCJjb3VudHJ5Y29kZSIsIm1zaXNkbiIsImJvZHkiLCJ1ZGgiLCJ0aXRsZSIsInVybCIsIm1heERpZ2l0cyIsImJ5ZVRleHQiLCJwaW5Db2RlIiwiZmFpbGVkVGV4dCIsImFuc3dlclVybCIsInZlcmlmeVZhbGlkYXRpb24iLCJjaGVja1ZlcmlmeVZhbGlkYXRpb24iLCJjb250cm9sVmVyaWZ5VmFsaWRhdGlvbiIsInNlYXJjaFZlcmlmeVZhbGlkYXRpb24iLCJudW1iZXJJbnNpZ2h0QWR2YW5jZWRWYWxpZGF0aW9uIiwibnVtYmVySW5zaWdodFZhbGlkYXRpb24iLCJudW1iZXJJbnNpZ2h0UGF0dGVybkZhaWx1cmUiLCJvcHRpb25zTm90QW5PYmplY3QiLCJhcHBsaWNhdGlvbk5hbWUiLCJhcHBsaWNhdGlvblR5cGUiLCJhcHBsaWNhdGlvbkFuc3dlclVybCIsImFwcGxpY2F0aW9uRXZlbnRVcmwiLCJhcHBsaWNhdGlvbklkIiwicHJvZHVjdCIsImV4cG9ydHMiLCJpbml0aWFsaXplIiwicGtleSIsInBzZWNyZXQiLCJvcHRpb25zIiwiYXBpX2tleSIsImFwaV9zZWNyZXQiLCJzZW5kQmluYXJ5TWVzc2FnZSIsInJlY2lwaWVudCIsImNhbGxiYWNrIiwic2VuZEVycm9yIiwiRXJyb3IiLCJzZW5kTWVzc2FnZSIsImZyb20iLCJ0eXBlIiwic2VuZFdhcFB1c2hNZXNzYWdlIiwidmFsaWRpdHkiLCJzZW5kVGV4dE1lc3NhZ2UiLCJtZXNzYWdlIiwib3B0cyIsImRhdGEiLCJjbG9uZSIsInN0cmluZ2lmeSIsImxvZ2dlciIsImluZm8iLCJ0ZXh0Iiwic2VuZFJlcXVlc3QiLCJlcnIiLCJhcGlSZXNwb25zZSIsInN0YXR1cyIsIm1lc3NhZ2VzIiwic2VuZFZpYVNob3J0Y29kZSIsIm1lc3NhZ2VQYXJhbXMiLCJPYmplY3QiLCJrZXlzIiwicmVwbGFjZSIsImZvckVhY2giLCJrZXkiLCJKU09OIiwic2hvcnRjb2RlQWxlcnQiLCJzaG9ydGNvZGUyRkEiLCJzaG9ydGNvZGVNYXJrZXRpbmciLCJhIiwicGFyc2UiLCJnZXRFbmRwb2ludCIsImFjdGlvbiIsImVuZHBvaW50IiwibWV0aG9kIiwiaW5kZXhPZiIsImh0dHBDbGllbnQiLCJyZXF1ZXN0IiwiY2hlY2tCYWxhbmNlIiwiYmFsYW5jZUVuZHBvaW50IiwiZ2V0UHJpY2luZyIsImNvdW50cnlDb2RlIiwibGVuZ3RoIiwicHJpY2luZ0VuZHBvaW50IiwiZ2V0UGhvbmVQcmljaW5nIiwiZ2V0TnVtYmVycyIsIm51bWJlcnNFbmRwb2ludCIsInNlYXJjaE51bWJlcnMiLCJwYXR0ZXJuIiwic2VhcmNoRW5kcG9pbnQiLCJhcmciLCJidXlOdW1iZXIiLCJidXlFbmRwb2ludCIsImNhbmNlbE51bWJlciIsImNhbmNlbEVuZHBvaW50IiwidXBkYXRlTnVtYmVyIiwicGFyYW1zIiwidXBkYXRlRW5kcG9pbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJnZXRBcHBsaWNhdGlvbnMiLCJjcmVhdGVBcHBsaWNhdGlvbiIsIm5hbWUiLCJldmVudFVybCIsImNyZWF0ZUVuZHBvaW50IiwiZ2V0QXBwbGljYXRpb24iLCJhcHBJZCIsInNob3dFbmRwb2ludCIsInVwZGF0ZUFwcGxpY2F0aW9uIiwiZGVsZXRlQXBwbGljYXRpb24iLCJkZWxldGVFbmRwb2ludCIsImNoYW5nZVBhc3N3b3JkIiwibmV3U2VjcmV0Iiwic2V0dGluZ3NFbmRwb2ludCIsImNoYW5nZU1vQ2FsbGJhY2tVcmwiLCJuZXdVcmwiLCJjaGFuZ2VEckNhbGxiYWNrVXJsIiwidmVyaWZ5TnVtYmVyIiwiaW5wdXRQYXJhbXMiLCJudW1iZXIiLCJicmFuZCIsInZFbmRwb2ludCIsImNoZWNrVmVyaWZ5UmVxdWVzdCIsInJlcXVlc3RfaWQiLCJjb2RlIiwiY29udHJvbFZlcmlmeVJlcXVlc3QiLCJjbWQiLCJzZWFyY2hWZXJpZnlSZXF1ZXN0IiwicmVxdWVzdElkcyIsInJlcXVlc3RJZFBhcmFtIiwiQXJyYXkiLCJpc0FycmF5IiwicmVxdWVzdF9pZHMiLCJudW1iZXJJbnNpZ2h0IiwibnVtYmVySW5zaWdodEFzeW5jIiwibnVtYmVySW5zaWdodEJhc2ljIiwibnVtYmVySW5zaWdodENvbW1vbiIsIm51bWJlckluc2lnaHRTdGFuZGFyZCIsIm51bWJlckluc2lnaHRBZHZhbmNlZCIsIm51bWJlckluc2lnaHRBZHZhbmNlZEFzeW5jIiwibkVuZHBvaW50IiwidmFsaWRhdGVOdW1iZXIiLCJpbnB1dE9iaiIsInRlc3QiLCJzZW5kVm9pY2VNZXNzYWdlIiwidm9pY2VFbmRwb2ludCIsInNlbmRUVFNNZXNzYWdlIiwic2VuZFRUU1Byb21wdFdpdGhDYXB0dXJlIiwiaXNOYU4iLCJzZW5kVFRTUHJvbXB0V2l0aENvbmZpcm0iLCJjYWxsIiwicmV0dXJuRGF0YSIsInNldEhvc3QiLCJhSG9zdCIsInNldFBvcnQiLCJhUG9ydCIsInBvcnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUEsSUFBSUEsY0FBY0MsUUFBUSxhQUFSLENBQWxCOztBQUVBLElBQUlDLGNBQWMsS0FBbEI7QUFDQSxJQUFJQyxVQUFVLEVBQUNDLE1B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QjtBQUNBdEssMEJBQXNCUixJQUF0QixHQUE2QjhLLEtBQTdCO0FBQ0FySyx5QkFBcUJULElBQXJCLEdBQTRCOEssS0FBNUI7QUFDQXBLLGVBQVdWLElBQVgsR0FBa0I4SyxLQUFsQjtBQUNGbkssb0JBQWdCWCxJQUFoQixHQUF1QjhLLEtBQXZCO0FBQ0FsSyx1QkFBbUJaLElBQW5CLEdBQTBCOEssS0FBMUI7QUFDQWhLLHlCQUFxQmQsSUFBckIsR0FBNEI4SyxLQUE1QjtBQUNELENBZEQ7O0FBZ0JBN0gsUUFBUThILE9BQVIsR0FBa0IsVUFBU0MsS0FBVCxFQUFnQjtBQUNoQ0MsV0FBT0QsS0FBUDtBQUNELENBRkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5cbnZhciBpbml0aWFsaXplZCA9IGZhbHNlO1xudmFyIG1zZ3BhdGggPSB7aG9zdDoncmVzdC5uZXhtby5jb20nLHBhdGg6Jy9zbXMvanNvbid9O1xudmFyIHNob3J0Y29kZVBhdGggPSB7aG9zdDoncmVzdC5uZXhtby5jb20nLHBhdGg6Jy9zYy91cy8ke3R5cGV9L2pzb24nfTtcbnZhciB0dHNFbmRwb2ludCA9IHtob3N0OidhcGkubmV4bW8uY29tJyxwYXRoOicvdHRzL2pzb24nfTtcbnZhciB0dHNQcm9tcHRFbmRwb2ludCA9IHtob3N0OidhcGkubmV4bW8uY29tJyxwYXRoOicvdHRzLXByb21wdC9qc29uJ307XG52YXIgY2FsbEVuZHBvaW50ID0ge2hvc3Q6J3Jlc3QubmV4bW8uY29tJyxwYXRoOicvY2FsbC9qc29uJ307XG52YXIgdmVyaWZ5RW5kcG9pbnQgPSB7aG9zdDonYXBpLm5leG1vLmNvbScscGF0aDonL3ZlcmlmeS9qc29uJ307XG52YXIgY2hlY2tWZXJpZnlFbmRwb2ludCA9IHtob3N0OidhcGkubmV4bW8uY29tJyxwYXRoOicvdmVyaWZ5L2NoZWNrL2pzb24nfTtcbnZhciBjb250cm9sVmVyaWZ5RW5kcG9pbnQgPSB7aG9zdDonYXBpLm5leG1vLmNvbScscGF0aDonL3ZlcmlmeS9jb250cm9sL2pzb24nfTtcbnZhciBzZWFyY2hWZXJpZnlFbmRwb2ludCA9IHtob3N0OidhcGkubmV4bW8uY29tJyxwYXRoOicvdmVyaWZ5L3NlYXJjaC9qc29uJ307XG52YXIgbmlFbmRwb2ludCA9IHtob3N0OidhcGkubmV4bW8uY29tJyxwYXRoOicvbmkvYWR2YW5jZWQvYXN5bmMvanNvbid9O1xudmFyIG5pQmFzaWNFbmRwb2ludCA9IHtob3N0OidhcGkubmV4bW8uY29tJyxwYXRoOicvbmkvYmFzaWMvanNvbid9O1xudmFyIG5pU3RhbmRhcmRFbmRwb2ludCA9IHtob3N0OidhcGkubmV4bW8uY29tJyxwYXRoOicvbmkvc3RhbmRhcmQvanNvbid9O1xudmFyIG5pQWR2YW5jZWRFbmRwb2ludCA9IHtob3N0OidhcGkubmV4bW8uY29tJyxwYXRoOicvbmkvYWR2YW5jZWQvanNvbid9O1xudmFyIGFwcGxpY2F0aW9uc0VuZHBvaW50ID0ge2hvc3Q6J2FwaS5uZXhtby5jb20nLHBhdGg6Jy92MS9hcHBsaWNhdGlvbnMnfTtcbnZhciB1cCA9IHt9O1xudmFyIG51bWJlclBhdHRlcm4gPSBuZXcgUmVnRXhwKFwiXlswLTkgKygpLV0qJFwiKTtcblxudmFyIF9vcHRpb25zID0gbnVsbDtcblxuLy9FcnJvciBtZXNzYWdlIHJlc291cmNlcyBhcmUgbWFpbnRhaW5lZCBnbG9iYWxseSBpbiBvbmUgcGxhY2UgZm9yIGVhc3kgbWFuYWdlbWVudFxudmFyIEVSUk9SX01FU1NBR0VTID0ge1xuICAgIHNlbmRlcjogJ0ludmFsaWQgZnJvbSBhZGRyZXNzJyxcbiAgICB0bzogJ0ludmFsaWQgdG8gYWRkcmVzcycsXG4gICAgbXNnOiAnSW52YWxpZCBUZXh0IE1lc3NhZ2UnLFxuICAgIG1zZ1BhcmFtczogJ0ludmFsaWQgc2hvcnRjb2RlIG1lc3NhZ2UgcGFyYW1ldGVycycsXG4gICAgY291bnRyeWNvZGU6ICdJbnZhbGlkIENvdW50cnkgQ29kZScsXG4gICAgbXNpc2RuOiAnSW52YWxpZCBNU0lTRE4gcGFzc2VkJyxcbiAgICBib2R5OiAnSW52YWxpZCBCb2R5IHZhbHVlIGluIEJpbmFyeSBNZXNzYWdlJyxcbiAgICB1ZGg6ICdJbnZhbGlkIHVkaCB2YWx1ZSBpbiBCaW5hcnkgTWVzc2FnZScsXG4gICAgdGl0bGU6ICdJbnZhbGlkIHRpdGxlIGluIFdBUCBQdXNoIG1lc3NhZ2UnLFxuICAgIHVybDogJ0ludmFsaWQgdXJsIGluIFdBUCBQdXNoIG1lc3NhZ2UnLFxuICAgIG1heERpZ2l0czogJ0ludmFsaWQgbWF4IGRpZ2l0cyBmb3IgVFRTIHByb21wdCcsXG4gICAgYnllVGV4dDogJ0ludmFsaWQgYnllIHRleHQgZm9yIFRUUyBwcm9tcHQnLFxuICAgIHBpbkNvZGU6ICdJbnZhbGlkIHBpbiBjb2RlIGZvciBUVFMgY29uZmlybScsXG4gICAgZmFpbGVkVGV4dDogJ0ludmFsaWQgZmFpbGVkIHRleHQgZm9yIFRUUyBjb25maXJtJyxcbiAgICBhbnN3ZXJVcmw6ICdJbnZhbGlkIGFuc3dlciBVUkwgZm9yIGNhbGwnLFxuICB2ZXJpZnlWYWxpZGF0aW9uOidNaXNzaW5nIE1hbmRhdG9yeSBmaWVsZHMgKG51bWJlciBhbmQvb3IgYnJhbmQpJyxcbiAgY2hlY2tWZXJpZnlWYWxpZGF0aW9uOidNaXNzaW5nIE1hbmRhdG9yeSBmaWVsZHMgKHJlcXVlc3RfaWQgYW5kL29yIGNvZGUpJyxcbiAgY29udHJvbFZlcmlmeVZhbGlkYXRpb246J01pc3NpbmcgTWFuZGF0b3J5IGZpZWxkcyAocmVxdWVzdF9pZCBhbmQvb3IgY21kLWNvbW1hbmQpJyxcbiAgc2VhcmNoVmVyaWZ5VmFsaWRhdGlvbjonTWlzc2luZyBNYW5kYXRvcnkgZmllbGRzIChyZXF1ZXN0X2lkIG9yIHJlcXVlc3RfaWRzKScsXG4gIG51bWJlckluc2lnaHRBZHZhbmNlZFZhbGlkYXRpb246J01pc3NpbmcgTWFuZGF0b3J5IGZpZWxkcyAobnVtYmVyIGFuZC9vciBjYWxsYmFjayB1cmwpJyxcbiAgbnVtYmVySW5zaWdodFZhbGlkYXRpb246J01pc3NpbmcgTWFuZGF0b3J5IGZpZWxkIC0gbnVtYmVyJyxcbiAgbnVtYmVySW5zaWdodFBhdHRlcm5GYWlsdXJlOidOdW1iZXIgY2FuIGNvbnRhaW4gZGlnaXRzIGFuZCBtYXkgaW5jbHVkZSBhbnkgb3IgYWxsIG9mIHRoZSBmb2xsb3dpbmc6IHdoaXRlIHNwYWNlLCAtLCssICgsICkuJyxcbiAgb3B0aW9uc05vdEFuT2JqZWN0OidPcHRpb25zIHBhcmFtZXRlciBzaG91bGQgYmUgYSBkaWN0aW9uYXJ5LiBDaGVjayB0aGUgZG9jcyBmb3IgdmFsaWQgcHJvcGVydGllcyBmb3Igb3B0aW9ucycsXG4gICAgYXBwbGljYXRpb25OYW1lOiAnSW52YWxpZCBhcmd1bWVudDogbmFtZScsXG4gICAgYXBwbGljYXRpb25UeXBlOiAnSW52YWxpZCBhcmd1bWVudDogdHlwZScsXG4gICAgYXBwbGljYXRpb25BbnN3ZXJVcmw6ICdJbnZhbGlkIGFyZ3VtZW50OiBhbnN3ZXJVcmwnLFxuICAgIGFwcGxpY2F0aW9uRXZlbnRVcmw6ICdJbnZhbGlkIGFyZ3VtZW50OiBldmVudFVybCcsXG4gICAgYXBwbGljYXRpb25JZDogJ0ludmFsaWQgYXJndW1lbnQ6IGFwcElkJyxcbiAgICBwcm9kdWN0OiAnSW52YWxpZCBwcm9kdWN0LiBTaG91bGQgYmUgb25lIG9mIFt2b2ljZSwgc21zXSdcbn07XG5cbmV4cG9ydHMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKHBrZXksIHBzZWNyZXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXBrZXkgfHwgIXBzZWNyZXQpIHtcbiAgICAgICAgdGhyb3cgJ2tleSBhbmQgc2VjcmV0IGNhbm5vdCBiZSBlbXB0eSwgc2V0IHZhbGlkIHZhbHVlcyc7XG4gICAgfVxuICAgIHVwID0ge1xuICAgICAgICBhcGlfa2V5OiBwa2V5LFxuICAgICAgICBhcGlfc2VjcmV0OiBwc2VjcmV0XG4gICAgfVxuICAgIF9vcHRpb25zID0gb3B0aW9ucztcbiAgICBpbml0aWFsaXplZCA9IHRydWU7XG59XG5cbmV4cG9ydHMuc2VuZEJpbmFyeU1lc3NhZ2UgPSBmdW5jdGlvbihzZW5kZXIsIHJlY2lwaWVudCwgYm9keSwgdWRoLCBjYWxsYmFjaykge1xuICAgIGlmICghYm9keSkge1xuICAgICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5ib2R5KSk7XG4gICAgfSBlbHNlIGlmICghdWRoKSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLnVkaCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgIGZyb206IHNlbmRlcixcbiAgICAgICAgICAgIHRvOiByZWNpcGllbnQsXG4gICAgICAgICAgICB0eXBlOiAnYmluYXJ5JyxcbiAgICAgICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgICAgICB1ZGg6IHVkaFxuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxufVxuXG5leHBvcnRzLnNlbmRXYXBQdXNoTWVzc2FnZSA9IGZ1bmN0aW9uKHNlbmRlciwgcmVjaXBpZW50LCB0aXRsZSwgdXJsLCB2YWxpZGl0eSwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRpdGxlKSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLnRpdGxlKSk7XG4gICAgfSBlbHNlIGlmICghdXJsKSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLnVybCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRpdHkgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSB2YWxpZGl0eTtcbiAgICAgICAgICAgIHZhbGlkaXR5ID0gODY0MDAwMDA7XG4gICAgICAgIH1cbiAgICAgICAgc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgZnJvbTogc2VuZGVyLFxuICAgICAgICAgICAgdG86IHJlY2lwaWVudCxcbiAgICAgICAgICAgIHR5cGU6ICd3YXBwdXNoJyxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIHZhbGlkaXR5OiB2YWxpZGl0eSxcbiAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH0sIGNhbGxiYWNrKTtcbiAgICB9XG59XG5cbmV4cG9ydHMuc2VuZFRleHRNZXNzYWdlID0gZnVuY3Rpb24oc2VuZGVyLCByZWNpcGllbnQsIG1lc3NhZ2UsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm1zZykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIG9wdHNbJ2Zyb20nXSA9IHNlbmRlcjtcbiAgICAgICAgb3B0c1sndG8nXSA9IHJlY2lwaWVudDtcbiAgICAgICAgb3B0c1sndGV4dCddID0gbWVzc2FnZTtcbiAgICAgICAgc2VuZE1lc3NhZ2Uob3B0cywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHNlbmRNZXNzYWdlKG9wdHMsIGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFkYXRhLmZyb20pIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuc2VuZGVyKSk7XG4gICAgfSBlbHNlIGlmICghZGF0YS50bykge1xuICAgICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy50bykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwYXRoID0gY2xvbmUobXNncGF0aCk7XG4gICAgcGF0aC5wYXRoKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICBfb3B0aW9ucy5sb2dnZXIuaW5mbygnc2VuZGluZyBtZXNzYWdlIGZyb20gJyArIGRhdGEuZnJvbSArICcgdG8gJyArIGRhdGEudG8gKyAnIHdpdGggbWVzc2FnZSAnICsgZGF0YS50ZXh0KTtcbiAgICAgICAgc2VuZFJlcXVlc3QocGF0aCwgJ1BPU1QnLCBmdW5jdGlvbihlcnIsIGFwaVJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhcGlSZXNwb25zZS5zdGF0dXMgJiYgYXBpUmVzcG9uc2UubWVzc2FnZXNbMF0uc3RhdHVzID4gMCkge1xuICAgICAgICAgICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKGFwaVJlc3BvbnNlLm1lc3NhZ2VzWzBdWydlcnJvci10ZXh0J10pLCBhcGlSZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyLCBhcGlSZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2VuZFZpYVNob3J0Y29kZSh0eXBlLCByZWNpcGllbnQsIG1lc3NhZ2VQYXJhbXMsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFyZWNpcGllbnQpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMudG8pKTtcbiAgICB9XG4gICAgaWYgKCFtZXNzYWdlUGFyYW1zIHx8ICFPYmplY3Qua2V5cyhtZXNzYWdlUGFyYW1zKSkge1xuICAgICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5tc2dQYXJhbXMpKTtcbiAgICB9XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgdmFyIHBhdGggPSBjbG9uZShzaG9ydGNvZGVQYXRoKTtcbiAgICBwYXRoLnBhdGggPSBwYXRoLnBhdGgucmVwbGFjZSgnJHt0eXBlfScsIHR5cGUpO1xuICAgIE9iamVjdC5rZXlzKG1lc3NhZ2VQYXJhbXMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIG9wdHNba2V5XSA9IG1lc3NhZ2VQYXJhbXNba2V5XTtcbiAgICB9KTtcbiAgICBvcHRzLnRvID0gcmVjaXBpZW50O1xuICAgIHBhdGgucGF0aCs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShvcHRzKTtcbiAgICBfb3B0aW9ucy5sb2dnZXIuaW5mbygnc2VuZGluZyBtZXNzYWdlIGZyb20gc2hvcnRjb2RlICcgKyB0eXBlICsgJyB0byAnICsgcmVjaXBpZW50ICsgJyB3aXRoIHBhcmFtZXRlcnMgJyArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VQYXJhbXMpKTtcbiAgICBzZW5kUmVxdWVzdChwYXRoLCAnUE9TVCcsIGZ1bmN0aW9uKGVyciwgYXBpUmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFlcnIgJiYgYXBpUmVzcG9uc2Uuc3RhdHVzICYmIGFwaVJlc3BvbnNlLm1lc3NhZ2VzWzBdLnN0YXR1cyA+IDApIHtcbiAgICAgICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKGFwaVJlc3BvbnNlLm1lc3NhZ2VzWzBdWydlcnJvci10ZXh0J10pLCBhcGlSZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVyciwgYXBpUmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnNob3J0Y29kZUFsZXJ0ID0gZnVuY3Rpb24ocmVjaXBpZW50LCBtZXNzYWdlUGFyYW1zLCBvcHRzLCBjYWxsYmFjaykge1xuICAgIHNlbmRWaWFTaG9ydGNvZGUoJ2FsZXJ0JywgcmVjaXBpZW50LCBtZXNzYWdlUGFyYW1zLCBvcHRzLCBjYWxsYmFjayk7XG59XG5leHBvcnRzLnNob3J0Y29kZTJGQSA9IGZ1bmN0aW9uKHJlY2lwaWVudCwgbWVzc2FnZVBhcmFtcywgb3B0cywgY2FsbGJhY2spIHtcbiAgICBzZW5kVmlhU2hvcnRjb2RlKCcyZmEnLCByZWNpcGllbnQsIG1lc3NhZ2VQYXJhbXMsIG9wdHMsIGNhbGxiYWNrKTtcbn1cbmV4cG9ydHMuc2hvcnRjb2RlTWFya2V0aW5nID0gZnVuY3Rpb24ocmVjaXBpZW50LCBtZXNzYWdlUGFyYW1zLCBvcHRzLCBjYWxsYmFjaykge1xuICAgIHNlbmRWaWFTaG9ydGNvZGUoJ21hcmtldGluZycsIHJlY2lwaWVudCwgbWVzc2FnZVBhcmFtcywgb3B0cywgY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBjbG9uZShhKSB7XG4gICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhKSk7XG59XG5cbmZ1bmN0aW9uIGdldEVuZHBvaW50KGFjdGlvbikge1xuICAgIHJldHVybiB7cGF0aDphY3Rpb259O1xufVxuXG5mdW5jdGlvbiBzZW5kUmVxdWVzdChlbmRwb2ludCwgbWV0aG9kLCBjYWxsYmFjaykge1xuICBlbmRwb2ludC5wYXRoID0gZW5kcG9pbnQucGF0aCArXG4gICAgICAgICAgICAgICAgICAoZW5kcG9pbnQucGF0aC5pbmRleE9mKCc/Jyk+MD8nJic6Jz8nKSArXG4gICAgICAgICAgICAgICAgICBxdWVyeXN0cmluZy5zdHJpbmdpZnkodXApO1xuICBfb3B0aW9ucy5odHRwQ2xpZW50LnJlcXVlc3QoZW5kcG9pbnQsIG1ldGhvZCwgY2FsbGJhY2spO1xufVxuXG5leHBvcnRzLmNoZWNrQmFsYW5jZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIGJhbGFuY2VFbmRwb2ludCA9IGdldEVuZHBvaW50KCcvYWNjb3VudC9nZXQtYmFsYW5jZScpO1xuICAgIHNlbmRSZXF1ZXN0KGJhbGFuY2VFbmRwb2ludCwgY2FsbGJhY2spO1xufVxuXG5leHBvcnRzLmdldFByaWNpbmcgPSBmdW5jdGlvbihjb3VudHJ5Q29kZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNvdW50cnlDb2RlIHx8IGNvdW50cnlDb2RlLmxlbmd0aCAhPSAyKSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmNvdW50cnljb2RlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHByaWNpbmdFbmRwb2ludCA9IGdldEVuZHBvaW50KCcvYWNjb3VudC9nZXQtcHJpY2luZy9vdXRib3VuZCcpO1xuICAgIHByaWNpbmdFbmRwb2ludC5wYXRoICs9ICc/Y291bnRyeT0nICsgY291bnRyeUNvZGU7XG4gICAgICAgIHNlbmRSZXF1ZXN0KHByaWNpbmdFbmRwb2ludCwgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy5nZXRQaG9uZVByaWNpbmcgPSBmdW5jdGlvbihwcm9kdWN0LCBtc2lzZG4sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFwcm9kdWN0IHx8IChwcm9kdWN0ICE9ICdzbXMnICYmIHByb2R1Y3QgIT0gJ3ZvaWNlJykpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMucHJvZHVjdCkpO1xuICAgIH0gZWxzZSBpZiAoIW1zaXNkbikgeyBcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNpc2RuKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHByaWNpbmdFbmRwb2ludCA9IGdldEVuZHBvaW50KCcvYWNjb3VudC9nZXQtcGhvbmUtcHJpY2luZy9vdXRib3VuZCcpO1xuICAgICAgICBwcmljaW5nRW5kcG9pbnQucGF0aCArPSBcIi9cIiArIHByb2R1Y3QgKyBcIi9cIiArIHVwLmFwaV9rZXkgKyBcIi9cIiArIHVwLmFwaV9zZWNyZXQgKyBcIi9cIiArIG1zaXNkbjtcbiAgICAgICAgc2VuZFJlcXVlc3QocHJpY2luZ0VuZHBvaW50LCBjYWxsYmFjayk7XG4gICAgfVxufVxuXG5leHBvcnRzLmdldE51bWJlcnMgPSBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBudW1iZXJzRW5kcG9pbnQgPSBnZXRFbmRwb2ludCgnL2FjY291bnQvbnVtYmVycycpO1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09ICdvYmplY3QnKXtcbiAgICAgICAgbnVtYmVyc0VuZHBvaW50LnBhdGggPSBudW1iZXJzRW5kcG9pbnQucGF0aCArICc/JztcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpe1xuICAgICAgICAgICAgbnVtYmVyc0VuZHBvaW50LnBhdGggPSBudW1iZXJzRW5kcG9pbnQucGF0aCArIGtleSArICc9JyArIG9wdGlvbnNba2V5XSArICcmJ1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMub3B0aW9uc05vdEFuT2JqZWN0KSk7XG4gICAgcmV0dXJuO1xuICAgIH1cbiAgc2VuZFJlcXVlc3QobnVtYmVyc0VuZHBvaW50LCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydHMuc2VhcmNoTnVtYmVycyA9IGZ1bmN0aW9uKGNvdW50cnlDb2RlLCBwYXR0ZXJuLCBjYWxsYmFjaykge1xuICAgIGlmICghY291bnRyeUNvZGUgfHwgY291bnRyeUNvZGUubGVuZ3RoICE9IDIpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuY291bnRyeWNvZGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2VhcmNoRW5kcG9pbnQgPSBnZXRFbmRwb2ludCgnL251bWJlci9zZWFyY2gnKSA7XG4gICAgc2VhcmNoRW5kcG9pbnQucGF0aCArPSAnP2NvdW50cnk9JyArIGNvdW50cnlDb2RlXG4gICAgICAgIGlmICh0eXBlb2YgcGF0dGVybiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHBhdHRlcm47XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdHRlcm4gPT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgc2VhcmNoRW5kcG9pbnQucGF0aCA9IHNlYXJjaEVuZHBvaW50LnBhdGggKyAnJic7XG4gICAgICAgICAgICBmb3IgKHZhciBhcmcgaW4gcGF0dGVybil7XG4gICAgICAgICAgICAgICAgc2VhcmNoRW5kcG9pbnQucGF0aCA9IHNlYXJjaEVuZHBvaW50LnBhdGggKyBhcmcgKyAnPScgKyBwYXR0ZXJuW2FyZ10gKyAnJidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlYXJjaEVuZHBvaW50LnBhdGggPSBzZWFyY2hFbmRwb2ludC5wYXRoICsgJyZwYXR0ZXJuPScgKyBwYXR0ZXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbmRSZXF1ZXN0KHNlYXJjaEVuZHBvaW50LCBjYWxsYmFjayk7XG4gICAgfVxufVxuXG5leHBvcnRzLmJ1eU51bWJlciA9IGZ1bmN0aW9uKGNvdW50cnlDb2RlLCBtc2lzZG4sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjb3VudHJ5Q29kZSB8fCBjb3VudHJ5Q29kZS5sZW5ndGggIT0gMikge1xuICAgICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5jb3VudHJ5Y29kZSkpO1xuICAgIH0gZWxzZSBpZiAoIW1zaXNkbikgeyBcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNpc2RuKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGJ1eUVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoJy9udW1iZXIvYnV5Jyk7XG4gICAgYnV5RW5kcG9pbnQucGF0aCArPSAnP2NvdW50cnk9JyArIGNvdW50cnlDb2RlICsgJyZtc2lzZG49JyArIG1zaXNkbjtcbiAgICAgICAgc2VuZFJlcXVlc3QoYnV5RW5kcG9pbnQsICdQT1NUJywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy5jYW5jZWxOdW1iZXIgPSBmdW5jdGlvbihjb3VudHJ5Q29kZSwgbXNpc2RuLCBjYWxsYmFjaykge1xuICAgIGlmICghY291bnRyeUNvZGUgfHwgY291bnRyeUNvZGUubGVuZ3RoICE9IDIpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuY291bnRyeWNvZGUpKTtcbiAgICB9IGVsc2UgaWYgKCFtc2lzZG4pIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNpc2RuKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNhbmNlbEVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoJy9udW1iZXIvY2FuY2VsJyk7XG4gICAgY2FuY2VsRW5kcG9pbnQucGF0aCArPSAnP2NvdW50cnk9JyArIGNvdW50cnlDb2RlICsgJyZtc2lzZG49JyArIG1zaXNkbjtcbiAgICAgICAgc2VuZFJlcXVlc3QoY2FuY2VsRW5kcG9pbnQsICdQT1NUJywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy5jYW5jZWxOdW1iZXIgPSBmdW5jdGlvbihjb3VudHJ5Q29kZSwgbXNpc2RuLCBjYWxsYmFjaykge1xuICAgIGlmICghY291bnRyeUNvZGUgfHwgY291bnRyeUNvZGUubGVuZ3RoICE9IDIpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuY291bnRyeWNvZGUpKTtcbiAgICB9IGVsc2UgaWYgKCFtc2lzZG4pIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNpc2RuKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNhbmNlbEVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoJy9udW1iZXIvY2FuY2VsJyk7XG4gICAgY2FuY2VsRW5kcG9pbnQucGF0aCArPSAnP2NvdW50cnk9JyArIGNvdW50cnlDb2RlICsgJyZtc2lzZG49JyArIG1zaXNkbjtcbiAgICAgICAgc2VuZFJlcXVlc3QoY2FuY2VsRW5kcG9pbnQsICdQT1NUJywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy51cGRhdGVOdW1iZXIgPSBmdW5jdGlvbihjb3VudHJ5Q29kZSwgbXNpc2RuLCBwYXJhbXMsIGNhbGxiYWNrKXtcbiAgICBpZiAoIWNvdW50cnlDb2RlIHx8IGNvdW50cnlDb2RlLmxlbmd0aCAhPSAyKSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmNvdW50cnljb2RlKSk7XG4gICAgfSBlbHNlIGlmICghbXNpc2RuKSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm1zaXNkbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB1cGRhdGVFbmRwb2ludCA9IGdldEVuZHBvaW50KCcvbnVtYmVyL3VwZGF0ZScpO1xuICB1cGRhdGVFbmRwb2ludC5wYXRoICs9ICc/Y291bnRyeT0nICsgY291bnRyeUNvZGUgKyAnJm1zaXNkbj0nICsgbXNpc2RuO1xuICAgICAgICB1cGRhdGVFbmRwb2ludC5wYXRoID0gdXBkYXRlRW5kcG9pbnQucGF0aCArICcmJztcbiAgICAgICAgZm9yICh2YXIgYXJnIGluIHBhcmFtcyl7XG4gICAgICAgICAgICB1cGRhdGVFbmRwb2ludC5wYXRoID0gdXBkYXRlRW5kcG9pbnQucGF0aCArIGFyZyArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNbYXJnXSkgKyAnJidcbiAgICAgICAgfVxuICAgICAgICBzZW5kUmVxdWVzdCh1cGRhdGVFbmRwb2ludCwgJ1BPU1QnLCBjYWxsYmFjayk7XG4gICAgfVxufVxuXG5leHBvcnRzLmdldEFwcGxpY2F0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGVuZHBvaW50ID0gZ2V0RW5kcG9pbnQoYXBwbGljYXRpb25zRW5kcG9pbnQucGF0aCk7XG4gICAgZW5kcG9pbnQuaG9zdCA9IGFwcGxpY2F0aW9uc0VuZHBvaW50Lmhvc3Q7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcpe1xuICAgICAgICBlbmRwb2ludC5wYXRoICs9ICc/JztcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpe1xuICAgICAgICAgICAgZW5kcG9pbnQucGF0aCArPSAoa2V5ICsgJz0nICsgb3B0aW9uc1trZXldICsgJyYnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm9wdGlvbnNOb3RBbk9iamVjdCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICBzZW5kUmVxdWVzdChlbmRwb2ludCwgY2FsbGJhY2spO1xufVxuXG5leHBvcnRzLmNyZWF0ZUFwcGxpY2F0aW9uID0gZnVuY3Rpb24obmFtZSwgdHlwZSwgYW5zd2VyVXJsLCBldmVudFVybCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKCFuYW1lIHx8IG5hbWUubGVuZ3RoIDwgMSkge1xuICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYXBwbGljYXRpb25OYW1lKSk7XG4gIH0gZWxzZSBpZiAoIXR5cGUpIHtcbiAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uVHlwZSkpO1xuICB9IGVsc2UgaWYgKCFhbnN3ZXJVcmwpIHtcbiAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uQW5zd2VyVXJsKSk7XG4gIH0gZWxzZSBpZiAoIWV2ZW50VXJsKSB7XG4gICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hcHBsaWNhdGlvbkV2ZW50VXJsKSk7XG4gIH0gZWxzZSB7XG4gICAgICB2YXIgY3JlYXRlRW5kcG9pbnQgPSBnZXRFbmRwb2ludChhcHBsaWNhdGlvbnNFbmRwb2ludC5wYXRoKTtcbiAgICAgIGNyZWF0ZUVuZHBvaW50Lmhvc3QgPSBhcHBsaWNhdGlvbnNFbmRwb2ludC5ob3N0O1xuICAgICAgY3JlYXRlRW5kcG9pbnQucGF0aCArPSAoJz9uYW1lPScgKyBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnJnR5cGU9JyArIHR5cGUgICsgJyZhbnN3ZXJfdXJsPScgKyBhbnN3ZXJVcmwgICsgJyZldmVudF91cmw9JyArIGV2ZW50VXJsKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKXtcbiAgICAgICAgICBjcmVhdGVFbmRwb2ludC5wYXRoICs9ICgnJicgKyBrZXkgKyAnPScgKyBvcHRpb25zW2tleV0pO1xuICAgICAgfVxuICAgICAgc2VuZFJlcXVlc3QoY3JlYXRlRW5kcG9pbnQsICdQT1NUJywgY2FsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydHMuZ2V0QXBwbGljYXRpb24gPSBmdW5jdGlvbihhcHBJZCwgY2FsbGJhY2spIHtcbiAgaWYgKCFhcHBJZCB8fCBhcHBJZC5sZW5ndGggPCAzNikge1xuICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYXBwbGljYXRpb25JZCkpO1xuICB9IGVsc2Uge1xuICAgICAgdmFyIHNob3dFbmRwb2ludCA9IGdldEVuZHBvaW50KGFwcGxpY2F0aW9uc0VuZHBvaW50LnBhdGggKyBcIi9cIiArIGFwcElkKTtcbiAgICAgIHNob3dFbmRwb2ludC5ob3N0ID0gYXBwbGljYXRpb25zRW5kcG9pbnQuaG9zdDtcbiAgICAgIHNlbmRSZXF1ZXN0KHNob3dFbmRwb2ludCwgY2FsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydHMudXBkYXRlQXBwbGljYXRpb24gPSBmdW5jdGlvbihhcHBJZCwgbmFtZSwgdHlwZSwgYW5zd2VyVXJsLCBldmVudFVybCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKCFhcHBJZCB8fCBhcHBJZC5sZW5ndGggPCAzNikge1xuICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYXBwbGljYXRpb25JZCkpO1xuICB9IGVsc2UgaWYgKCFuYW1lIHx8IG5hbWUubGVuZ3RoIDwgMSkge1xuICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYXBwbGljYXRpb25OYW1lKSk7XG4gIH0gZWxzZSBpZiAoIXR5cGUpIHtcbiAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uVHlwZSkpO1xuICB9IGVsc2UgaWYgKCFhbnN3ZXJVcmwpIHtcbiAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uQW5zd2VyVXJsKSk7XG4gIH0gZWxzZSBpZiAoIWV2ZW50VXJsKSB7XG4gICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hcHBsaWNhdGlvbkV2ZW50VXJsKSk7XG4gIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlRW5kcG9pbnQgPSBnZXRFbmRwb2ludChhcHBsaWNhdGlvbnNFbmRwb2ludC5wYXRoICsgXCIvXCIgKyBhcHBJZCk7XG4gICAgICB1cGRhdGVFbmRwb2ludC5wYXRoICs9ICgnP25hbWU9JyArIGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICcmdHlwZT0nICsgdHlwZSAgKyAnJmFuc3dlcl91cmw9JyArIGFuc3dlclVybCAgKyAnJmV2ZW50X3VybD0nICsgZXZlbnRVcmwpO1xuICAgICAgdXBkYXRlRW5kcG9pbnQuaG9zdCA9IGFwcGxpY2F0aW9uc0VuZHBvaW50Lmhvc3Q7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucyl7XG4gICAgICAgICAgdXBkYXRlRW5kcG9pbnQucGF0aCA9IHVwZGF0ZUVuZHBvaW50LnBhdGggKyAnJicgKyBrZXkgKyAnPScgKyBvcHRpb25zW2tleV07XG4gICAgICB9XG4gICAgICBzZW5kUmVxdWVzdCh1cGRhdGVFbmRwb2ludCwgJ1BVVCcsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnRzLmRlbGV0ZUFwcGxpY2F0aW9uID0gZnVuY3Rpb24oYXBwSWQsIGNhbGxiYWNrKSB7XG4gIGlmICghYXBwSWQgfHwgYXBwSWQubGVuZ3RoIDwgMzYpIHtcbiAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmFwcGxpY2F0aW9uSWQpKTtcbiAgfSBlbHNlIHtcbiAgICAgIHZhciBkZWxldGVFbmRwb2ludCA9IGdldEVuZHBvaW50KGFwcGxpY2F0aW9uc0VuZHBvaW50LnBhdGggKyBcIi9cIiArIGFwcElkKTtcbiAgICAgIGRlbGV0ZUVuZHBvaW50Lmhvc3QgPSBhcHBsaWNhdGlvbnNFbmRwb2ludC5ob3N0O1xuICAgICAgc2VuZFJlcXVlc3QoZGVsZXRlRW5kcG9pbnQsICdERUxFVEUnLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuXG5leHBvcnRzLmNoYW5nZVBhc3N3b3JkID0gZnVuY3Rpb24obmV3U2VjcmV0LCBjYWxsYmFjaykge1xuICAgIHZhciBzZXR0aW5nc0VuZHBvaW50ID0gZ2V0RW5kcG9pbnQoJy9hY2NvdW50L3NldHRpbmdzJyk7XG4gIHNldHRpbmdzRW5kcG9pbnQucGF0aCArPSAnP25ld1NlY3JldD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5ld1NlY3JldCk7XG4gICAgc2VuZFJlcXVlc3Qoc2V0dGluZ3NFbmRwb2ludCwgJ1BPU1QnLCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydHMuY2hhbmdlTW9DYWxsYmFja1VybCA9IGZ1bmN0aW9uKG5ld1VybCwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2V0dGluZ3NFbmRwb2ludCA9IGdldEVuZHBvaW50KCcvYWNjb3VudC9zZXR0aW5ncycpO1xuICBzZXR0aW5nc0VuZHBvaW50LnBhdGggICs9ICc/bW9DYWxsQmFja1VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5ld1VybCk7XG4gICAgc2VuZFJlcXVlc3Qoc2V0dGluZ3NFbmRwb2ludCwgJ1BPU1QnLCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydHMuY2hhbmdlRHJDYWxsYmFja1VybCA9IGZ1bmN0aW9uKG5ld1VybCwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2V0dGluZ3NFbmRwb2ludCA9IGdldEVuZHBvaW50KCcvYWNjb3VudC9zZXR0aW5ncycpO1xuICBzZXR0aW5nc0VuZHBvaW50LnBhdGggICs9ICc/ZHJDYWxsQmFja1VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG5ld1VybCk7XG4gICAgc2VuZFJlcXVlc3Qoc2V0dGluZ3NFbmRwb2ludCwgJ1BPU1QnLCBjYWxsYmFjayk7XG59XG5cbmV4cG9ydHMudmVyaWZ5TnVtYmVyID0gZnVuY3Rpb24oaW5wdXRQYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGlmICghaW5wdXRQYXJhbXMubnVtYmVyIHx8ICFpbnB1dFBhcmFtcy5icmFuZCApIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy52ZXJpZnlWYWxpZGF0aW9uKSk7XG4gICAgfSBlbHNlIHtcbiAgICB2YXIgdkVuZHBvaW50ID0gY2xvbmUodmVyaWZ5RW5kcG9pbnQpO1xuICAgIHZFbmRwb2ludC5wYXRoICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShpbnB1dFBhcmFtcyk7XG4gICAgICAgIHNlbmRSZXF1ZXN0KHZFbmRwb2ludCwgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy5jaGVja1ZlcmlmeVJlcXVlc3QgPSBmdW5jdGlvbihpbnB1dFBhcmFtcywgY2FsbGJhY2spIHtcbiAgaWYgKCFpbnB1dFBhcmFtcy5yZXF1ZXN0X2lkIHx8ICFpbnB1dFBhcmFtcy5jb2RlICkge1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmNoZWNrVmVyaWZ5VmFsaWRhdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgdmFyIHZFbmRwb2ludCA9IGNsb25lKGNoZWNrVmVyaWZ5RW5kcG9pbnQpO1xuICAgIHZFbmRwb2ludC5wYXRoICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShpbnB1dFBhcmFtcyk7XG4gICAgICAgIHNlbmRSZXF1ZXN0KHZFbmRwb2ludCwgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy5jb250cm9sVmVyaWZ5UmVxdWVzdCA9IGZ1bmN0aW9uKGlucHV0UGFyYW1zLCBjYWxsYmFjaykge1xuICBpZiAoIWlucHV0UGFyYW1zLnJlcXVlc3RfaWQgfHwgIWlucHV0UGFyYW1zLmNtZCApIHtcbiAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5jb250cm9sVmVyaWZ5VmFsaWRhdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgdmFyIHZFbmRwb2ludCA9IGNsb25lKGNvbnRyb2xWZXJpZnlFbmRwb2ludCk7XG4gICAgdkVuZHBvaW50LnBhdGggKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGlucHV0UGFyYW1zKTtcbiAgICAgICAgc2VuZFJlcXVlc3QodkVuZHBvaW50LCBjYWxsYmFjayk7XG4gICAgfVxufVxuXG5leHBvcnRzLnNlYXJjaFZlcmlmeVJlcXVlc3QgPSBmdW5jdGlvbihyZXF1ZXN0SWRzLCBjYWxsYmFjaykge1xuICB2YXIgcmVxdWVzdElkUGFyYW0gPSB7fTtcbiAgaWYgKCFyZXF1ZXN0SWRzKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuc2VhcmNoVmVyaWZ5VmFsaWRhdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVxdWVzdElkcykgKSB7XG4gICAgICBpZiAocmVxdWVzdElkcy5sZW5ndGggPT0xKSB7XG4gICAgICAgIHJlcXVlc3RJZFBhcmFtLnJlcXVlc3RfaWQ9cmVxdWVzdElkcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcXVlc3RJZFBhcmFtLnJlcXVlc3RfaWRzPXJlcXVlc3RJZHM7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3RJZFBhcmFtLnJlcXVlc3RfaWQ9cmVxdWVzdElkcztcbiAgICB9XG4gICAgdmFyIHZFbmRwb2ludCA9IGNsb25lKHNlYXJjaFZlcmlmeUVuZHBvaW50KTtcbiAgICB2RW5kcG9pbnQucGF0aCArPSAnPycgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkocmVxdWVzdElkUGFyYW0pO1xuICAgICAgICBzZW5kUmVxdWVzdCh2RW5kcG9pbnQsIGNhbGxiYWNrKTtcbiAgICB9XG59XG5cbmV4cG9ydHMubnVtYmVySW5zaWdodCA9IGZ1bmN0aW9uKGlucHV0UGFyYW1zLCBjYWxsYmFjaykge1xuICBudW1iZXJJbnNpZ2h0QXN5bmMoaW5wdXRQYXJhbXMsIGNhbGxiYWNrKTtcbn1cblxuZXhwb3J0cy5udW1iZXJJbnNpZ2h0QmFzaWMgPSBmdW5jdGlvbihpbnB1dFBhcmFtcywgY2FsbGJhY2spIHtcbiAgbnVtYmVySW5zaWdodENvbW1vbihuaUJhc2ljRW5kcG9pbnQsaW5wdXRQYXJhbXMsY2FsbGJhY2spXG59XG5cbmV4cG9ydHMubnVtYmVySW5zaWdodFN0YW5kYXJkID0gZnVuY3Rpb24oaW5wdXRQYXJhbXMsIGNhbGxiYWNrKSB7XG4gIG51bWJlckluc2lnaHRDb21tb24obmlTdGFuZGFyZEVuZHBvaW50LGlucHV0UGFyYW1zLGNhbGxiYWNrKVxufVxuXG5leHBvcnRzLm51bWJlckluc2lnaHRBZHZhbmNlZCA9IGZ1bmN0aW9uKGlucHV0UGFyYW1zLCBjYWxsYmFjaykge1xuICBudW1iZXJJbnNpZ2h0Q29tbW9uKG5pQWR2YW5jZWRFbmRwb2ludCxpbnB1dFBhcmFtcyxjYWxsYmFjaylcbn1cblxuZXhwb3J0cy5udW1iZXJJbnNpZ2h0QWR2YW5jZWRBc3luYyA9IGZ1bmN0aW9uKGlucHV0UGFyYW1zLCBjYWxsYmFjaykge1xuICBudW1iZXJJbnNpZ2h0QXN5bmMoaW5wdXRQYXJhbXMsIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gbnVtYmVySW5zaWdodEFzeW5jKGlucHV0UGFyYW1zLCBjYWxsYmFjaykge1xuICBpZiAoIWlucHV0UGFyYW1zLm51bWJlciB8fCAhIGlucHV0UGFyYW1zLmNhbGxiYWNrKSB7XG4gICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubnVtYmVySW5zaWdodEFkdmFuY2VkVmFsaWRhdGlvbikpO1xuICB9IGVsc2Uge1xuICAgIHZhciBuRW5kcG9pbnQgPSBjbG9uZShuaUVuZHBvaW50KTtcbiAgICBuRW5kcG9pbnQucGF0aCArPSAnPycgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkoaW5wdXRQYXJhbXMpO1xuICAgIHNlbmRSZXF1ZXN0KG5FbmRwb2ludCwgY2FsbGJhY2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIG51bWJlckluc2lnaHRDb21tb24oZW5kcG9pbnQsaW5wdXRQYXJhbXMsY2FsbGJhY2spIHtcbiAgaWYgKHZhbGlkYXRlTnVtYmVyKGlucHV0UGFyYW1zLGNhbGxiYWNrKSl7XG4gICAgdmFyIGlucHV0T2JqO1xuICAgIGlmICh0eXBlb2YgaW5wdXRQYXJhbXMgIT0gJ29iamVjdCcpIHtcbiAgICAgIGlucHV0T2JqID0ge251bWJlcjppbnB1dFBhcmFtc307XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0T2JqID0gaW5wdXRQYXJhbXM7XG4gICAgfVxuICAgIHZhciBuRW5kcG9pbnQgPSBjbG9uZShlbmRwb2ludCk7XG4gICAgbkVuZHBvaW50LnBhdGggKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGlucHV0T2JqKTtcbiAgICAgIHNlbmRSZXF1ZXN0KG5FbmRwb2ludCwgY2FsbGJhY2spO1xuICB9XG59XG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlcihpbnB1dFBhcmFtcyxjYWxsYmFjaykge1xuICBpZiAoKHR5cGVvZiBpbnB1dFBhcmFtcyA9PSAnb2JqZWN0JykgJiYgIWlucHV0UGFyYW1zLm51bWJlcikge1xuICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubnVtYmVySW5zaWdodFZhbGlkYXRpb24pKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmICgodHlwZW9mIGlucHV0UGFyYW1zID09ICdvYmplY3QnKSAmJiAhbnVtYmVyUGF0dGVybi50ZXN0KGlucHV0UGFyYW1zLm51bWJlcikpIHtcbiAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm51bWJlckluc2lnaHRQYXR0ZXJuRmFpbHVyZSkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBpbnB1dFBhcmFtcyAhPSAnb2JqZWN0JykgJiYgKCFpbnB1dFBhcmFtcyB8fCAhbnVtYmVyUGF0dGVybi50ZXN0KGlucHV0UGFyYW1zKSkpe1xuICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm51bWJlckluc2lnaHRQYXR0ZXJuRmFpbHVyZSkpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2VuZFZvaWNlTWVzc2FnZSh2b2ljZUVuZHBvaW50LCBkYXRhLCBjYWxsYmFjaykge1xuICAgIGlmICghZGF0YS50bykge1xuICAgICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy50bykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBlbmRwb2ludCA9IGNsb25lKHZvaWNlRW5kcG9pbnQpO1xuICAgIGVuZHBvaW50LnBhdGggKz0gJz8nICsgcXVlcnlzdHJpbmcuc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICBfb3B0aW9ucy5sb2dnZXIuaW5mbygnc2VuZGluZyBUVFMgbWVzc2FnZSB0byAnICsgZGF0YS50byArICcgd2l0aCBtZXNzYWdlICcgKyBkYXRhLnRleHQpO1xuICAgICAgICBzZW5kUmVxdWVzdChlbmRwb2ludCwgJ1BPU1QnLCBmdW5jdGlvbihlcnIsIGFwaVJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIWVyciAmJiBhcGlSZXNwb25zZS5zdGF0dXMgJiYgYXBpUmVzcG9uc2Uuc3RhdHVzID4gMCkge1xuICAgICAgICAgICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKGFwaVJlc3BvbnNlWydlcnJvci10ZXh0J10pLCBhcGlSZXNwb25zZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyLCBhcGlSZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0cy5zZW5kVFRTTWVzc2FnZSA9IGZ1bmN0aW9uKHJlY2lwaWVudCwgbWVzc2FnZSwgb3B0cywgY2FsbGJhY2spIHtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFvcHRzKSB7XG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIH1cbiAgICAgICAgb3B0c1sndG8nXSA9IHJlY2lwaWVudDtcbiAgICAgICAgb3B0c1sndGV4dCddID0gbWVzc2FnZTtcbiAgICAgICAgc2VuZFZvaWNlTWVzc2FnZSh0dHNFbmRwb2ludCwgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy5zZW5kVFRTUHJvbXB0V2l0aENhcHR1cmUgPSBmdW5jdGlvbihyZWNpcGllbnQsIG1lc3NhZ2UsIG1heERpZ2l0cywgYnllVGV4dCwgb3B0cywgY2FsbGJhY2spIHtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubXNnKSk7XG4gICAgfSBlbHNlIGlmICghbWF4RGlnaXRzIHx8IGlzTmFOKG1heERpZ2l0cykgfHwgbWF4RGlnaXRzLmxlbmd0aCA+IDE2KSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm1heERpZ2l0cykpO1xuICAgIH0gZWxzZSBpZiAoIWJ5ZVRleHQpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYnllVGV4dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghb3B0cykge1xuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIG9wdHNbJ3RvJ10gPSByZWNpcGllbnQ7XG4gICAgICAgIG9wdHNbJ3RleHQnXSA9IG1lc3NhZ2U7XG4gICAgICAgIG9wdHNbJ21heF9kaWdpdHMnXSA9IG1heERpZ2l0cztcbiAgICAgICAgb3B0c1snYnllX3RleHQnXSA9IGJ5ZVRleHQ7XG4gICAgICAgIHNlbmRWb2ljZU1lc3NhZ2UodHRzUHJvbXB0RW5kcG9pbnQsIG9wdHMsIGNhbGxiYWNrKTtcbiAgICB9XG59XG5cbmV4cG9ydHMuc2VuZFRUU1Byb21wdFdpdGhDb25maXJtID0gZnVuY3Rpb24ocmVjaXBpZW50LCBtZXNzYWdlLCBtYXhEaWdpdHMsIHBpbkNvZGUsIGJ5ZVRleHQsIGZhaWxlZFRleHQsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIHNlbmRFcnJvcihjYWxsYmFjaywgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm1zZykpO1xuICAgIH0gZWxzZSBpZiAoIW1heERpZ2l0cyB8fCBpc05hTihtYXhEaWdpdHMpIHx8IG1heERpZ2l0cy5sZW5ndGggPiAxNikge1xuICAgICAgICBzZW5kRXJyb3IoY2FsbGJhY2ssIG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5tYXhEaWdpdHMpKTtcbiAgICB9IGVsc2UgaWYgKCFwaW5Db2RlIHx8IHBpbkNvZGUubGVuZ3RoICE9PSBtYXhEaWdpdHMpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMucGluQ29kZSkpO1xuICAgIH0gZWxzZSBpZiAoIWJ5ZVRleHQpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYnllVGV4dCkpO1xuICAgIH0gZWxzZSBpZiAoIWZhaWxlZFRleHQpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuZmFpbGVkVGV4dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghb3B0cykge1xuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIG9wdHNbJ3RvJ10gPSByZWNpcGllbnQ7XG4gICAgICAgIG9wdHNbJ3RleHQnXSA9IG1lc3NhZ2U7XG4gICAgICAgIG9wdHNbJ21heF9kaWdpdHMnXSA9IG1heERpZ2l0cztcbiAgICAgICAgb3B0c1sncGluX2NvZGUnXSA9IHBpbkNvZGU7XG4gICAgICAgIG9wdHNbJ2J5ZV90ZXh0J10gPSBieWVUZXh0O1xuICAgICAgICBvcHRzWydmYWlsZWRfdGV4dCddID0gZmFpbGVkVGV4dDtcbiAgICAgICAgc2VuZFZvaWNlTWVzc2FnZSh0dHNQcm9tcHRFbmRwb2ludCwgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZXhwb3J0cy5jYWxsID0gZnVuY3Rpb24ocmVjaXBpZW50LCBhbnN3ZXJVcmwsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFhbnN3ZXJVcmwpIHtcbiAgICAgICAgc2VuZEVycm9yKGNhbGxiYWNrLCBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuYW5zd2VyVXJsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFvcHRzKSB7XG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIH1cbiAgICAgICAgb3B0c1sndG8nXSA9IHJlY2lwaWVudDtcbiAgICAgICAgb3B0c1snYW5zd2VyX3VybCddID0gYW5zd2VyVXJsO1xuICAgICAgICBzZW5kVm9pY2VNZXNzYWdlKGNhbGxFbmRwb2ludCwgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2VuZEVycm9yKGNhbGxiYWNrLCBlcnIsIHJldHVybkRhdGEpIHtcbiAgICAvLyBUaHJvdyB0aGUgZXJyb3IgaW4gY2FzZSBpZiB0aGVyZSBpcyBubyBjYWxsYmFjayBwYXNzZWRcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soZXJyLCByZXR1cm5EYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufVxuXG5leHBvcnRzLnNldEhvc3QgPSBmdW5jdGlvbihhSG9zdCkge1xuICAgIG1zZ3BhdGguaG9zdCA9IGFIb3N0O1xuICAgIHNob3J0Y29kZVBhdGguaG9zdCA9IGFIb3N0O1xuICAgIHR0c0VuZHBvaW50Lmhvc3QgPSBhSG9zdDtcbiAgICB0dHNQcm9tcHRFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gICAgY2FsbEVuZHBvaW50Lmhvc3QgPSBhSG9zdDtcbiAgICB2ZXJpZnlFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gICAgY2hlY2tWZXJpZnlFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gICAgY29udHJvbFZlcmlmeUVuZHBvaW50Lmhvc3QgPSBhSG9zdDtcbiAgICBzZWFyY2hWZXJpZnlFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gICAgbmlFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIG5pQmFzaWNFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIG5pU3RhbmRhcmRFbmRwb2ludC5ob3N0ID0gYUhvc3Q7XG4gIGFwcGxpY2F0aW9uc0VuZHBvaW50Lmhvc3QgPSBhSG9zdDtcbn1cblxuZXhwb3J0cy5zZXRQb3J0ID0gZnVuY3Rpb24oYVBvcnQpIHtcbiAgcG9ydCA9IGFQb3J0O1xufVxuIl19