import axios from "axios";
import qs from "qs"; // Asegúrate de instalarlo: npm install qs
import { API_ROOT } from "../const/api.js";
export const loginUsuario = async ({ correo, password }) => {
  const response = await axios.post(
    `${API_ROOT}/usuarios/login`,
    qs.stringify({ correo, password }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};
