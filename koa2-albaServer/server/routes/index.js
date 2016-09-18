import city from './city'
import athlete from './athlete'
import activity from './activity'

const routes = [city, athlete, activity]

export default function (app) {
  routes.forEach((route) => {
    app
      .use(route.routes())
      .use(route.allowedMethods({
        throw: true,
      }))
  })
}
