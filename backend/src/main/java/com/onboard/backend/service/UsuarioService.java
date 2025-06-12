package com.onboard.backend.service;

import com.onboard.backend.entity.Usuario;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.repository.UsuarioRepository;
import com.onboard.backend.util.EncriptadorAESGCM;
import com.onboard.backend.util.ValidationUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

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
        if (!ValidationUtils.isValidCedula(usuario.getIdUsuario())) {
            throw new InvalidInputException(
                    "La cedula ingresada es incorrecta, debe ser un numero entero entre 6 y 10 digitos: "
                            + usuario.getIdUsuario(),
                    "");
        }

        if (!ValidationUtils.isValidEmail(usuario.getCorreo())) {
            throw new InvalidInputException("El correo ingresado no tienee el fotmato correcto" + usuario.getCorreo(),
                    "");
        }

        if (!ValidationUtils.isValidCuentaBancaria(usuario.getCuentaBancaria())) {
            throw new InvalidInputException("Invalid bank account format. Only digits allowed (10–20 characters).", "");
        }

        if (!ValidationUtils.isValidNombre(usuario.getNombre())) {
            throw new InvalidInputException("Nombre inválido", "");
        }

        if (!ValidationUtils.isValidTelefono(usuario.getTelefono())) {
            throw new InvalidInputException("Teléfono inválido", "");
        }
        if (!ValidationUtils.isValidDireccion(usuario.getDireccion())) {
            throw new InvalidInputException("Dirección inválida", "");
        }

        if (usuarioRepository.existsById(usuario.getIdUsuario())) {
            throw new InvalidInputException("Ya existe un usuario registrado con la cedula: " + usuario.getIdUsuario(),
                    "");
        }

        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new InvalidInputException("Ya existe un usuario registrado con el correo: " + usuario.getCorreo(),
                    "");
        }

        String hashedPass = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(hashedPass);
        usuario.setFechaRegistro(LocalDateTime.now());
        try {
            String cuentaEncriptada = EncriptadorAESGCM.encriptar(usuario.getCuentaBancaria());
            usuario.setCuentaBancaria(cuentaEncriptada);
        } catch (Exception e) {
            throw new RuntimeException("Error al encriptar la cuenta bancaria", e);
        }
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> getUsuarioById(String id) {
        return usuarioRepository.findById(id);
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public void deleteUsuarioById(String id) {
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
            throw new IllegalArgumentException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        usuario.setFotoPerfilUrl(fileUrl);

        usuarioRepository.save(usuario);

        return fileUrl;
    }

    public Usuario updateUsuario(String id, Usuario usuarioActualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        usuarioRepository.delete(usuarioExistente);
        return usuarioRepository.save(usuarioActualizado);
    }

}
