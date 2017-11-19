module.exports = {
	get isIOS() {
		const iosReg = /iphone|ipad|ipod/i;
		return iosReg.test(this.get('user-agent'));
	},
	get isAndroid() {
		const androidReg = /android/i;
		return androidReg.test(this.get('user-agent'));
	}
};