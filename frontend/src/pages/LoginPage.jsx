import { Link, useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import { useState } from "react";

export const LoginPage = () => {
  const { formState, handleChange } = useForm({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Credenciales incorrectas");
        return;
      }

      alert(data.message);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
