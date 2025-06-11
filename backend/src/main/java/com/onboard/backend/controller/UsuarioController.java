package com.onboard.backend.controller;

import com.onboard.backend.entity.Usuario;

import com.onboard.backend.service.UsuarioService;
import com.onboard.backend.service.UsuarioService.ResultadoLogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        Usuario saved = usuarioService.saveUsuario(usuario);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable String id) {
        Optional<Usuario> usuario = usuarioService.getUsuarioById(id);
        return usuario.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuarioById(@PathVariable String id) {
        usuarioService.deleteUsuarioById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String correo, @RequestParam String password) {
        ResultadoLogin resultado = usuarioService.validarLogin(correo, password);
        switch (resultado) {
            case USUARIO_NO_ENCONTRADO:
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            case CONTRASENA_INCORRECTA:
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
            case EXITO:
                Usuario usuario = usuarioService.obtenerUsuarioPorCorreo(correo);
                return ResponseEntity.ok(usuario);
            default:
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado");
        }
    }

    @PostMapping("/{id}/foto-perfil")
    public ResponseEntity<String> subirFotoPerfil(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            String url = usuarioService.subirFotoPerfil(id, file);
            return ResponseEntity.ok(url);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la foto");
        }
    }

}
