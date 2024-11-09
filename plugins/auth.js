export default function({ app, $auth }) {
  $auth.onRedirect(() => {
    (async () => {
      if (!$auth.loggedIn) {
        app.store.commit("SET_DATA", { module: "favourites", data: {} })
      }
    })()
  })
}
