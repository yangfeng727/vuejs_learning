import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
// el 国际化
import zhCN from 'element-ui/lib/locale/lang/zh-CN'
import enUS from 'element-ui/lib/locale/lang/en'
import Locale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const DEFAULT_LANG = 'en-US' // 默认英文
const LOCALE_KEY = 'localeLanguage'

// 当前系统的语言
const locales = {
  'zh-CN': zh,
  'en-US': en
}
// el支持的语言-当el不支持时默认使用英语
const vantLocales = {
  'zh-CN': zhCN,
  'en-US': enUS
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales,
  fallbackLocale: 'en',
  silentTranslationWarn: true
})

/**
 *  el 国际化
 * */
let elFn = function (lang) {
  // el 国际化-没有的用英文显示
  let vLang = 'en-US'
  if (vantLocales[lang]) {
    vLang = lang
  }
  Locale.use(vantLocales[vLang])
}

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }

  // Locale.use('en-US', enUS)
  elFn(lang)

  window.localStorage.setItem(LOCALE_KEY, lang)

  // 样式适配
  // Object.keys(locales).forEach(lang => {
  //   document.body.classList.remove(`lang-${lang}`)
  // })
  // document.body.classList.add(`lang-${lang}`)
  // document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

setup()
window.i18n = i18n
export default i18n
