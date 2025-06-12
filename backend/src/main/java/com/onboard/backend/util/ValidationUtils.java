package com.onboard.backend.util;

import java.util.regex.Pattern;

public class ValidationUtils {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    private static final Pattern CEDULA_PATTERN = Pattern.compile("^\\d{6,10}$");

    private static final Pattern CUENTA_BANCARIA_PATTERN = Pattern.compile("^\\d{10,20}$");

    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    public static boolean isValidCedula(String cedula) {
        return cedula != null && CEDULA_PATTERN.matcher(cedula).matches();
    }

    public static boolean isValidCuentaBancaria(String cuentaBancaria) {
        return cuentaBancaria != null && CUENTA_BANCARIA_PATTERN.matcher(cuentaBancaria).matches();
    }

    public static boolean isValidNombre(String nombre) {
        return nombre != null &&
                nombre.matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,50}$");
    }

    public static boolean isValidTelefono(String telefono) {
        return telefono != null &&
                telefono.matches("^\\+?\\d{7,15}$");
    }

    public static boolean isValidDireccion(String direccion) {
        return direccion != null &&
                direccion.length() >= 5 &&
                direccion.length() <= 150;
    }

}
