// git://github.com/karma-runner/karma-chrome-launcher.git
// The MIT License
// Copyright (C) 2011-2013 Google, Inc.
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
var fsAccess = require('fs-access')
var path = require('path')
var which = require('which')
var cmds = {
    linux: getBin(['google-chrome', 'google-chrome-stable']),
    darwin: getChromeDarwin('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
    win32: getChromeExe('Chrome')
};

// Return location of chrome.exe file for a given Chrome directory (available: "Chrome", "Chrome SxS").
function getChromeExe(chromeDirName) {
	// Only run these checks on win32
	if (process.platform !== 'win32') {
		return null
	}
	var windowsChromeDirectory, i, prefix
	var suffix = '\\Google\\' + chromeDirName + '\\Application\\chrome.exe'
	var prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)']]
	for (i = 0; i < prefixes.length; i++) {
		prefix = prefixes[i]
		try {
			windowsChromeDirectory = path.join(prefix, suffix)
			fsAccess.sync(windowsChromeDirectory)
			return windowsChromeDirectory
		} catch (e) {}
	}
	return windowsChromeDirectory
}

function getBin(commands) {
	// Don't run these checks on win32
	if (process.platform !== 'linux') {
		return null
	}
	var bin, i
	for (i = 0; i < commands.length; i++) {
		try {
			if (which.sync(commands[i])) {
				bin = commands[i]
				break
			}
		} catch (e) {}
	}
	return bin
}

function getChromeDarwin(defaultPath) {
	if (process.platform !== 'darwin') {
		return null
	}
	try {
		var homePath = path.join(process.env.HOME, defaultPath)
		fsAccess.sync(homePath)
		return homePath
	} catch (e) {
		return defaultPath
	}
}
module.exports = cmds;