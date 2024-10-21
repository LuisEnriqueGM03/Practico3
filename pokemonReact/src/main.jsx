import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Admin/Dashboard.jsx';
import Tipos from "./pages/Admin/Tipos/Tipos.jsx";
import FormularioTipo from "./pages/Admin/Tipos/FormularioTipo.jsx";
import FormularioFotoTipo from "./pages/Admin/Tipos/FormularioFotoTipo.jsx";
import Habilidades from "./pages/Admin/Habilidades/Habilidades.jsx";
import FormularioHabilidades from "./pages/Admin/Habilidades/FormularioHabilidades.jsx";
import Pokemones from "./pages/Admin/Pokemones/Pokemones.jsx";
import FormularioPokemones from "./pages/Admin/Pokemones/FormularioPokemon.jsx";
import PokemonAdmin from "./pages/Admin/Pokemones/PokemonAdmin.jsx";
import FormularioImagen from "./pages/Admin/Pokemones/FormularioImagen.jsx";
import FormularioTipos from "./pages/Admin/Pokemones/FormularioTipos.jsx";
import FormularioHabilidad from "./pages/Admin/Pokemones/FormularioHabilidad.jsx";
import FormularioEvolucion from "./pages/Admin/Pokemones/FormularioEvolucion.jsx";
import FormularioEstadistica from "./pages/Admin/Pokemones/FormularioEstadistica.jsx";
import Pokemon from "./pages/User/Pokemon.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/vista/:id/pokemon",
    element: <Pokemon/>,
  },
  ///
{
  path: "/pokemones",
  element: <Pokemones />,
}
,{
    path: "/pokemones/crear",
    element: <FormularioPokemones  />,
  },
  {
    path: "/pokemones/:id/editar",
    element: <FormularioPokemones/>,
  },
  {
    path: "/pokemones/:id/detalle",
    element: <PokemonAdmin/>,
  },
  {
    path: "/pokemones/:id/foto",
    element: <FormularioImagen/>
  },
  {
    path: "/pokemones/:id/tipos",
    element: <FormularioTipos/>
  },
  {
    path: "/pokemones/:id/Habilidades",
    element: <FormularioHabilidad/>
  },
  {
    path: "/pokemones/:id/Evoluciones",
    element: <FormularioEvolucion />
  },
  {
    path: "/pokemones/:id/Estadisticas",
    element: <FormularioEstadistica />
  },
  ///
  {
  path: "/tipos",
    element: <Tipos />,
  },
  {
    path: "/tipos/crear",
    element: <FormularioTipo  />,
  },
  {
    path: "/tipos/:id/editar",
    element: <FormularioTipo />,
  },
  {
    path: "/tipos/:id/foto",
    element: <FormularioFotoTipo/>
  },
  ///
  {
    path: "/habilidades",
    element: <Habilidades/>,
  },
    {
      path: "/habilidades/crear",
        element: <FormularioHabilidades/>,
    },
    {
      path: "/habilidades/:id/editar",
        element: <FormularioHabilidades/>,
    }
]);


createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
);
