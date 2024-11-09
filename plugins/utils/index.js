import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import { Notification } from "element-ui";

export default ({ app }, inject) => {
  inject("localePath", (url = "", params = {}, query = {}) => {
    return app.localePath({ name: url.replace("/", ""), params, query }, app.i18n.locale)
  })

  inject("mapObjectToQuery", (object) => {
    const result = {}

    forEach(object, function(value, key) {
      if (Boolean(value)) {
        result[key] = value
      }
    })

    return result
  })

  inject("breadcrumbsGenerator", (object) => {
    const result = []

    ;(function iterator(object) {
      if (!isEmpty(object)) {
        result.push({ id: object.id, title: object.title })

        if (object.hasOwnProperty("parent")) {
          iterator(object.parent)
        }
      }
    })(object)

    return result.reverse()
  })

  inject("isValidFileSize", (file, sizeLimit = 1000000) => {
    if (file.size <= sizeLimit) return true

    Notification({
      customClass: "error",
      title: app.i18n.t("errors.error").toString(),
      message: app.i18n.t("errors.file_max_1mb").toString()
    })
    return false
  })
}
