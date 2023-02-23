import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
          "team-name": "Team LBR",
          "title": "Email Generator",
          "translate-button": "中文",
          "paragraph": "This tool is used for generating emails. Enter some text on what you want the email to be about. Specify who it is going to as well.",
          "input": "Input", 
          "input-placeholder": "Write main points of what you want the email to be about.", 
          "gButton": "Generate Email",
          "output": "Output",
          "output-placeholder": "Output text displays here.",
          "footer": "Team LBR. All Rights Reserved"
        }
      },
      ch: {
        translation: {
            "team-name": "LBR团队",
            "title": "电子邮件生成器",
            "translate-button": "English",
            "paragraph": "该工具用于生成电子邮件。 输入有关您想要电子邮件的内容的文本。 指定它也将是谁。",
            "input": "输入", 
            "input-placeholder": "编写您想要电子邮件的主要点。", 
            "gButton": "生成电子邮件",
            "output": "输出",
            "output-placeholder": "输出文本在此处显示。",
            "footer": "LBR团队。 版权所有"
        }
      }
}; 

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'ch',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

  export default i18n;