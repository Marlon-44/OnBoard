import requests

# URL base de tu API
API_URL = "http://localhost:8080/api/vehiculos"

# Tasa de cambio COP -> USD (puedes actualizarla o consumir una API real)
TASA_CAMBIO = 4000  # 1 USD = 4000 COP

# Obtener todos los vehículos
response = requests.get(API_URL)
vehiculos = response.json()

for vehiculo in vehiculos:
    placa = vehiculo['placa']
    precio_cop = vehiculo.get('precioPorDia', 0)
    precio_usd = round(precio_cop / TASA_CAMBIO, 2)

    vehiculo['precioPorDia'] = precio_usd

    # Hacer PUT para actualizar el vehículo con el nuevo precio
    put_response = requests.put(f"{API_URL}/{placa}", json=vehiculo)

    if put_response.status_code == 200:
        print(f"Vehículo {placa} actualizado: ${precio_usd} USD")
    else:
        print(f"Error actualizando {placa}: {put_response.status_code}")
