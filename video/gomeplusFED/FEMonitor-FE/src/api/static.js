import Vue from 'vue';

let baseUrl = `${Vue.http.options.root}/static`;

export function getScreenshotUrl(taskid, name) {
	return `${baseUrl}/screenshots/${taskid}/${name}`;
}
