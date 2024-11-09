import Vue from "vue";
import Element from "element-ui";

import localeEN from "element-ui/lib/locale/lang/en";
import localeRU from "element-ui/lib/locale/lang/ru-RU";
import localeAZ from "element-ui/lib/locale/lang/az";

let currentLocale = localeRU;

if (process.client) {
  const langPrefix = window.location.pathname.split("/")[1];

  switch (langPrefix) {
    case "az":
      currentLocale = localeAZ;
      break;
    case "en":
      currentLocale = localeEN;
      break;
  }
}

Vue.use(Element, { locale: currentLocale });
