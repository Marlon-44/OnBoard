import requests

BASE_URL = "http://localhost:8080/api/vehiculos"

try:
    response = requests.get(BASE_URL)
    response.raise_for_status()
    vehiculos = response.json()

    for vehiculo in vehiculos:
        if vehiculo.get("estadoOferta") == "INACTIVA":
            vehiculo_actualizado = vehiculo.copy()
            vehiculo_actualizado["estadoOferta"] = "PENDIENTE"

            placa = vehiculo["placa"]
            put_url = f"{BASE_URL}/{placa}"

            put_response = requests.put(
                put_url,
                json=vehiculo_actualizado,
                headers={"Content-Type": "application/json"}
            )

            if put_response.status_code == 200:
                print(f"✅ Vehículo {placa} actualizado a PENDIENTE.")
            else:
                print(f"❌ Error al actualizar {placa}: {put_response.status_code}")
except Exception as e:
    print("⚠️ Error general:", e)
