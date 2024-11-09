import https from "https"
import { Notification } from "element-ui"

export default function ({ $axios, app }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });

  $axios.onError((error) => {
    let errorMessage = app.i18n.t("errors.unknown_error")

    if (error.response) {
      errorMessage = error.response.data.meta.message
    }

    Notification({
      title: app.i18n.t("errors.error").toString(),
      message: errorMessage,
      customClass: "error",
    })
  })
}
