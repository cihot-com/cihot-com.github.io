
const lang = function () {
	return langData[lang.language || navigator.language]
}

const langData = {
	'zh-CN': {
		SIGN_IN: '登录',
		SIGN_OUT: '注销',
		USERNAME: '用户名',
		PASSWORD: '密码',
		OPTIONS: '选项',
		APPLY: '应用',
	},
	'ko': {
		SIGN_IN: '로그인',
		SIGN_OUT: '로그아웃',
	},
	en: {
		SIGN_IN: 'Sign in',
		SIGN_OUT: 'Sign out',
	},
}
