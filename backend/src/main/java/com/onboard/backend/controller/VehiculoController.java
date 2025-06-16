package com.onboard.backend.controller;

import com.onboard.backend.dto.VehiculoFiltroDTO;
import com.onboard.backend.entity.Vehiculo;

import com.onboard.backend.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Vehiculo> createVehiculo(
            @RequestPart("vehiculo") Vehiculo vehiculo,
            @RequestPart("tecnomecanica") MultipartFile tecnomecanica,
            @RequestPart("antecedentes") MultipartFile antecedentes,
            @RequestPart("soat") MultipartFile soat,
            @RequestPart("fotos") MultipartFile[] fotos) throws IOException {

        Vehiculo saved = vehiculoService.saveVehiculo(vehiculo, tecnomecanica, antecedentes, soat, fotos);
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

    @PostMapping("/{id}/fotos")
    public ResponseEntity<List<String>> subirFotosVehiculo(@PathVariable String id,
            @RequestParam("files") MultipartFile[] files) {
        try {
            List<String> urls = vehiculoService.subirFotosVehiculo(id, files);
            return ResponseEntity.ok(urls);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of());
        }
    }

    @PutMapping("/{placa}")
    public ResponseEntity<Vehiculo> updateVehiculo(@PathVariable String placa,
            @RequestBody Vehiculo vehiculoActualizado) {
        Optional<Vehiculo> vehiculoExistente = vehiculoService.getVehiculoById(placa);

        if (vehiculoExistente.isPresent()) {
            Vehiculo actualizado = vehiculoService.updateVehiculo(placa, vehiculoActualizado);
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/top6Alquiler")
    public List<Vehiculo> getTop6Vehiculos() {
        return vehiculoService.getTop6VehiculosMasAlquilados();
    }

    @GetMapping("/recientes")
    public List<Vehiculo> getTop6VehiculosRecientes() {
        return vehiculoService.getTop6VehiculosRecientes();
    }

    @PostMapping("/filtrar")
    public List<Vehiculo> buscarPorFiltros(@RequestBody VehiculoFiltroDTO filtros) {
        return vehiculoService.buscarPorFiltros(filtros);
    }
}
