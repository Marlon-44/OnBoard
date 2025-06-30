package com.onboard.backend.controller;

import com.onboard.backend.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @PostMapping("/crear")
    public ResponseEntity<String> crearPago(@RequestParam String idFactura) {
        try {
            String approvalUrl = pagoService.crearPago(idFactura);
            return ResponseEntity.ok(approvalUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear pago: " + e.getMessage());
        }
    }

    @PostMapping("/capturar")
    public ResponseEntity<String> capturarPago(@RequestParam String orderId) {
        try {
            String resultado = pagoService.capturarPago(orderId);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al capturar pago: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> obtenerTodosLosPagos() {
        try {
            return ResponseEntity.ok(pagoService.obtenerTodosLosPagos());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al obtener los pagos: " + e.getMessage());
        }
    }
}
