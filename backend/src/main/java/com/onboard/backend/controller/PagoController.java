package com.onboard.backend.controller;

import com.onboard.backend.entity.Pago;
import com.onboard.backend.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @PostMapping
    public ResponseEntity<Pago> createPago(@RequestBody Pago pago) {
        Pago saved = pagoService.savePago(pago);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> getPagoById(@PathVariable String id) {
        Optional<Pago> pago = pagoService.getPagoById(id);
        return pago.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/factura/{idFactura}")
    public ResponseEntity<List<Pago>> getPagosByFacturaId(@PathVariable String idFactura) {
        List<Pago> pagos = pagoService.getPagosByFacturaId(idFactura);
        return ResponseEntity.ok(pagos);
    }

    @GetMapping
    public ResponseEntity<List<Pago>> getAllPagos() {
        List<Pago> pagos = pagoService.getAllPagos();
        return ResponseEntity.ok(pagos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePagoById(@PathVariable String id) {
        pagoService.deletePagoById(id);
        return ResponseEntity.noContent().build();
    }
}
