package com.onboard.backend.controller;

import com.onboard.backend.entity.Vehiculo;
import com.onboard.backend.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    @PostMapping
    public ResponseEntity<Vehiculo> createVehiculo(@RequestBody Vehiculo vehiculo) {
        Vehiculo saved = vehiculoService.saveVehiculo(vehiculo);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> getVehiculoById(@PathVariable String id) {
        Optional<Vehiculo> vehiculo = vehiculoService.getVehiculoById(id);
        return vehiculo.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Vehiculo>> getAllVehiculos() {
        List<Vehiculo> vehiculos = vehiculoService.getAllVehiculos();
        return ResponseEntity.ok(vehiculos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehiculoById(@PathVariable String id) {
        vehiculoService.deleteVehiculoById(id);
        return ResponseEntity.noContent().build();
    }
}
