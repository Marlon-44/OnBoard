import requests

BASE_URL = "http://localhost:8080/api"

# Mapeo del endpoint con su campo ID real
ENDPOINTS = {
    "alquileres": "idAlquiler",
    "facturas": "idFactura",
    "reservas": "idReserva"
}

def delete_all(endpoint, id_field):
    url = f"{BASE_URL}/{endpoint}"
    print(f"\n🔎 Obteniendo todos los elementos de /{endpoint}...")
    response = requests.get(url)

    if response.status_code != 200:
        print(f"❌ Error al obtener {endpoint}: {response.text}")
        return

    items = response.json()
    print(f"🔢 {len(items)} elementos encontrados en /{endpoint}")

    for item in items:
        item_id = item.get(id_field)
        if not item_id:
            print(f"⚠️  No se encontró {id_field} en el objeto: {item}")
            continue

        delete_url = f"{url}/{item_id}"
        del_response = requests.delete(delete_url)

        if del_response.status_code in [200, 204]:
            print(f"✅ Eliminado {endpoint} con id {item_id}")
        else:
            print(f"❌ Error al eliminar {item_id} de {endpoint}: {del_response.text}")

# Orden correcto: primero alquileres, luego facturas, luego reservas
for endpoint in ["alquileres", "facturas", "reservas"]:
    delete_all(endpoint, ENDPOINTS[endpoint])
