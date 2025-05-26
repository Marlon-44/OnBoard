package com.onboard.backend.controller;

import com.onboard.backend.entity.MetodoPago;
import com.onboard.backend.service.MetodoPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/metodos-pago")
public class MetodoPagoController {

    @Autowired
    private MetodoPagoService metodoPagoService;

    @PostMapping
    public ResponseEntity<MetodoPago> createMetodoPago(@RequestBody MetodoPago metodoPago) {
        MetodoPago saved = metodoPagoService.saveMetodoPago(metodoPago);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetodoPago> getMetodoPagoById(@PathVariable String id) {
        Optional<MetodoPago> metodoPago = metodoPagoService.getMetodoPagoById(id);
        return metodoPago.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<MetodoPago>> getAllMetodosPago() {
        List<MetodoPago> lista = metodoPagoService.getAllMetodosPago();
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMetodoPago(@PathVariable String id) {
        metodoPagoService.deleteMetodoPagoById(id);
        return ResponseEntity.noContent().build();
    }
}
