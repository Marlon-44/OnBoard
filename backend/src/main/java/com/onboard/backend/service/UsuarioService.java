package com.onboard.backend.service;

import com.onboard.backend.entity.Usuario;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.repository.UsuarioRepository;
import com.onboard.backend.security.EncriptadorAESGCM;
import com.onboard.backend.util.ValidationUtils;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;

@Service
public class UsuarioService {
    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    public enum ResultadoLogin {
        EXITO,
        USUARIO_NO_ENCONTRADO,
        CONTRASENA_INCORRECTA
    }

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Usuario saveUsuario(Usuario usuario) {
        if (!ValidationUtils.isValidDoc(usuario.getIdUsuario(), usuario.getTipoIdentificacion())) {
            throw new InvalidInputException(
                    "Invalid cedula format",
                    "INVALID_ID_FORMAT",
                    "ID must be an integer between 6 and 10 digits: {id}");
        }

        if (!ValidationUtils.isValidEmail(usuario.getCorreo())) {
            throw new InvalidInputException(
                    "Invalid email format",
                    "INVALID_EMAIL_FORMAT",
                    "Email does not match standard format: " + usuario.getCorreo()
                            + ". Example of a valid email: user@example.com");
        }

        /*
         * if (!ValidationUtils.isValidCuentaBancaria(usuario.getCuentaBancaria())) {
         * throw new
         * InvalidInputException("Invalid bank account format. Only digits allowed (10–20 characters)."
         * , "");
         * }
         */

        if (!ValidationUtils.isValidNombre(usuario.getNombre())) {
            throw new InvalidInputException(
                    "Invalid name",
                    "INVALID_NAME_FORMAT",
                    "Name field contains invalid characters or is empty. Example of a valid name: María González");
        }

        if (!ValidationUtils.isValidTelefono(usuario.getTelefono())) {
            throw new InvalidInputException(
                    "Invalid phone number",
                    "INVALID_PHONE_NUMBER_FORMAT",
                    "Phone number format is incorrect or unsupported. Example of a valid phone number: 3001234567");

        }

        if (!ValidationUtils.isValidDireccion(usuario.getDireccion())) {
            throw new InvalidInputException(
                    "Invalid address",
                    "INVALID_ADDRESS_FORMAT",
                    "Address must be between 5 and 150 characters. Example of a valid address: Calle 45 #12-34, Bogotá");
        }

        if (usuarioRepository.existsById(usuario.getIdUsuario())) {
            throw new InvalidInputException(
                    "ID already registered",
                    "DUPLICATE_ID",
                    "A user is already registered with the ID: " + usuario.getIdUsuario());
        }

        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new InvalidInputException(
                    "Email already registered",
                    "DUPLICATE_EMAIL",
                    "A user is already registered with the email: " + usuario.getCorreo());
        }

        String hashedPass = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(hashedPass);
        usuario.setFechaRegistro(LocalDateTime.now());
        try {
            String cuentaEncriptada = EncriptadorAESGCM.encriptar(usuario.getCuentaBancaria());
            usuario.setCuentaBancaria(cuentaEncriptada);
        } catch (Exception e) {
            logger.error("Error encrypting bank account for user with ID: " + usuario.getIdUsuario() + "\n", e);
            throw new InvalidInputException(
                    "Unable to encrypt bank account",
                    "BANK_ACCOUNT_ENCRYPTION_ERROR",
                    "An internal error occurred while encrypting the bank account information. Please contact the administrator.");
        }
        usuario.setFechaRegistro(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> getUsuarioById(String id) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isEmpty()) {
            throw new InvalidInputException(
                    "User not found",
                    "USER_NOT_FOUND",
                    "The user with ID '" + id
                            + "' was not found in the database while uploading the profile photo");
        }
        return usuarioRepository.findById(id);
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public void deleteUsuarioById(String id) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
        if (usuarioOpt.isEmpty()) {
            throw new InvalidInputException(
                    "User not found",
                    "USER_NOT_FOUND",
                    "The user with ID '" + id
                            + "' was not found in the database while uploading the profile photo");
        }
        usuarioRepository.deleteById(id);
    }

    public ResultadoLogin validarLogin(String correo, String password) {
        Usuario usuario = usuarioRepository.findByCorreo(correo);

        if (usuario == null) {
            return ResultadoLogin.USUARIO_NO_ENCONTRADO;
        }

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            return ResultadoLogin.CONTRASENA_INCORRECTA;
        }

        return ResultadoLogin.EXITO;
    }

    public Usuario obtenerUsuarioPorCorreo(String correo) {

        return usuarioRepository.findByCorreo(correo);
    }

    public String subirFotoPerfil(String usuarioId, MultipartFile file) throws IOException {
        String fileUrl = fileUploadService.uploadProfilePhoto(file, usuarioId);

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            throw new InvalidInputException(
                    "User not found",
                    "USER_NOT_FOUND",
                    "The user with ID '" + usuarioId
                            + "' was not found in the database while uploading the profile photo");
        }

        Usuario usuario = usuarioOpt.get();
        if (usuario.getFotoPerfilUrl() != null) {
            fileUploadService.deletePhotoByUrl(usuario.getFotoPerfilUrl());
        }
        usuario.setFotoPerfilUrl(fileUrl);

        usuarioRepository.save(usuario);

        return fileUrl;
    }

    public Usuario updateUsuario(String id, Usuario usuarioActualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new InvalidInputException(
                        "User not found",
                        "USER_NOT_FOUND",
                        "Cannot update user. No user exists in the database with ID: " + id));

        usuarioRepository.delete(usuarioExistente);
        return usuarioRepository.save(usuarioActualizado);
    }

}
