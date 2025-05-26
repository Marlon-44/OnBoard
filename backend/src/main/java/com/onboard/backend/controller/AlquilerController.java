package com.onboard.backend.controller;

import com.onboard.backend.entity.Alquiler;
import com.onboard.backend.service.AlquilerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alquileres")
public class AlquilerController {

    @Autowired
    private AlquilerService alquilerService;

    @PostMapping
    public ResponseEntity<Alquiler> createAlquiler(@RequestBody Alquiler alquiler) {
        Alquiler saved = alquilerService.saveAlquiler(alquiler);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alquiler> getAlquilerById(@PathVariable String id) {
        Optional<Alquiler> alquiler = alquilerService.getAlquilerById(id);
        return alquiler.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Alquiler>> getAllAlquileres() {
        List<Alquiler> lista = alquilerService.getAllAlquileres();
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlquiler(@PathVariable String id) {
        alquilerService.deleteAlquilerById(id);
        return ResponseEntity.noContent().build();
    }
}
