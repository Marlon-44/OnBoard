import requests

# ID del usuario que quieres actualizar
id_usuario = "800197268-5"  # <-- reemplaza esto con el id real del usuario

# URL del endpoint
url = f"http://localhost:8080/api/usuarios/{id_usuario}"

# Datos a enviar (solo el campo 'usuario' con la nueva contraseña)
payload = {
    "usuario": {
        "password": "800197268-5"
    }
}

# Encabezados (JSON)
headers = {
    "Content-Type": "application/json"
}

# Enviar la solicitud PUT
response = requests.put(url, json=payload, headers=headers)

# Mostrar el resultado
if response.status_code == 200:
    print("Contraseña actualizada correctamente:")
    print(response.json())
else:
    print("Error al actualizar contraseña:")
    print(response.status_code, response.text)
