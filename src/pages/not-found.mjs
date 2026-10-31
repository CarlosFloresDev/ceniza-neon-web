import { button } from "../lib/html.mjs";
import { intro } from "../layout.mjs";

const route = (url, title, body, options) => ({ url, title, body, options });

export default function routes() {
  const routes = [];
routes.push(
  route(
  "/404.html",
  "Señal no encontrada",
  `${intro("ERROR 404", "Esta vía no tiene señal.", "La página pudo cambiar de ruta. Puedes volver a la estación o consultar el manual de campo.")}<div class="container error-actions">${button("Volver al inicio", "/")}${button("Consultar la wiki", "/wiki/", true)}</div>`,
));
  return routes;
}
