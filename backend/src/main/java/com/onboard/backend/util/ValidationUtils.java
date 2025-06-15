package com.onboard.backend.util;

import java.util.regex.Pattern;

import com.onboard.backend.entity.TipoIdentificacion;

import java.time.Year;

public class ValidationUtils {

    public static final String[] VEHICULOS_PERMITIDOS = { "Automóvil", "Moto", "Bus", "Lancha", "Camión" };
    public static final String[] TIPOS_TRANSMISION_PERMITIDOS = { "Automática", "Manual" };
    public static final String[] TIPOS_COMBUSTIBLE_PERMITIDOS = { "Gasolina", "Diesel", "Eléctrico", "Híbrido", "Gas" };
    public static final String[] TIPOS_TERRENO_PERMITIDOS = { "Urbano", "Rural", "Mixto" };

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    private static final Pattern CEDULA_PATTERN = Pattern.compile("^\\d{6,10}$");
    private static final Pattern PASAPORTE_PATTERN = Pattern.compile("^[A-Z]{1,2}\\d{6,8}$");
    private static final Pattern NIT_PATTERN = Pattern.compile("^\\d{6,10}-\\d$");
    private static final Pattern CUENTA_BANCARIA_PATTERN = Pattern.compile("^\\d{10,20}$");
    private static final Pattern NOMBRE_PATTERN = Pattern.compile("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,50}$");
    private static final Pattern TELEFONO_PATTERN = Pattern.compile("^\\+?\\d{7,15}$");
    private static final Pattern LICENCIA_CONDUCCION_PATTERN = Pattern.compile("^\\d{6,12}$");

    private static final Pattern PLACA_PATTERN = Pattern.compile("^[A-Z]{3}\\d{3,4}$");
    private static final Pattern MARCA_PATTERN = Pattern.compile("^.{2,30}$");
    private static final Pattern MODELO_PATTERN = Pattern.compile("^.{1,30}$");
    private static final Pattern URL_PATTERN = Pattern.compile("^(http|https)://.*$");
    private static final Pattern DESCRIPCION_PATTERN = Pattern.compile("^.{10,500}$");

    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    public static boolean isValidDoc(String identificacion, TipoIdentificacion tipo) {
        if (identificacion == null || tipo == null)
            return false;
        switch (tipo) {
            case CC:
            case CE:
                return CEDULA_PATTERN.matcher(identificacion).matches();
            case PASAPORTE:
                return PASAPORTE_PATTERN.matcher(identificacion).matches();
            case NIT:
                return NIT_PATTERN.matcher(identificacion).matches();
            default:
                return false;
        }
    }

    public static boolean isValidRepresentante(String representante) {
        return representante != null && NOMBRE_PATTERN.matcher(representante).matches();
    }

    public static boolean isValidCuentaBancaria(String cuentaBancaria) {
        return cuentaBancaria != null && CUENTA_BANCARIA_PATTERN.matcher(cuentaBancaria).matches();
    }

    public static boolean isValidNombre(String nombre) {
        return nombre != null && NOMBRE_PATTERN.matcher(nombre).matches();
    }

    public static boolean isValidTelefono(String telefono) {
        return telefono != null && TELEFONO_PATTERN.matcher(telefono).matches();
    }

    public static boolean isValidDireccion(String direccion) {
        return direccion != null && direccion.length() >= 5 && direccion.length() <= 150;
    }

    public static boolean isValidPlaca(String placa) {
        return placa != null && PLACA_PATTERN.matcher(placa).matches();
    }

    public static boolean isValidMarca(String marca) {
        return marca != null && MARCA_PATTERN.matcher(marca).matches();
    }

    public static boolean isValidModelo(String modelo) {
        return modelo != null && MODELO_PATTERN.matcher(modelo).matches();
    }

    public static boolean isValidAnio(int anio) {
        int anioActual = Year.now().getValue();
        return anio >= 1960 && anio <= anioActual + 1;
    }

    public static boolean isValidCapacidadPasajeros(int capacidad) {
        return capacidad > 0 && capacidad <= 100;
    }

    public static boolean isValidKilometraje(float km) {
        return km >= 0;
    }

    public static boolean isValidUrl(String url) {
        return url != null && URL_PATTERN.matcher(url).matches();
    }

    public static boolean isValidTipo(String tipo, String[] valoresPermitidos) {
        if (tipo == null)
            return false;
        for (String permitido : valoresPermitidos) {
            if (permitido.equalsIgnoreCase(tipo))
                return true;
        }
        return false;
    }

    public static boolean isValidTransmision(String tipo) {
        return isValidTipo(tipo, TIPOS_TRANSMISION_PERMITIDOS);
    }

    public static boolean isValidCombustible(String tipo) {
        return isValidTipo(tipo, TIPOS_COMBUSTIBLE_PERMITIDOS);
    }

    public static boolean isValidTipoVehiculo(String tipo) {
        return isValidTipo(tipo, VEHICULOS_PERMITIDOS);
    }

    public static boolean isValidTipoTerreno(String tipo) {
        return isValidTipo(tipo, TIPOS_TERRENO_PERMITIDOS);
    }

    public static boolean isValidDescripcion(String descripcion) {
        return descripcion != null && DESCRIPCION_PATTERN.matcher(descripcion).matches();
    }

    public static boolean isValidLicenciaConduccion(String licencia) {
        return licencia != null && LICENCIA_CONDUCCION_PATTERN.matcher(licencia.trim()).matches();
    }
}
