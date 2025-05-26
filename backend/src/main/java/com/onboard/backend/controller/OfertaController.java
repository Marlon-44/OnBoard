package com.onboard.backend.controller;

import com.onboard.backend.entity.Oferta;
import com.onboard.backend.service.OfertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ofertas")
public class OfertaController {

    @Autowired
    private OfertaService ofertaService;

    @PostMapping
    public ResponseEntity<Oferta> createOferta(@RequestBody Oferta oferta) {
        Oferta saved = ofertaService.saveOferta(oferta);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Oferta> getOfertaById(@PathVariable String id) {
        Optional<Oferta> oferta = ofertaService.getOfertaById(id);
        return oferta.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Oferta>> getAllOfertas() {
        List<Oferta> lista = ofertaService.getAllOfertas();
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOferta(@PathVariable String id) {
        ofertaService.deleteOfertaById(id);
        return ResponseEntity.noContent().build();
    }
}
