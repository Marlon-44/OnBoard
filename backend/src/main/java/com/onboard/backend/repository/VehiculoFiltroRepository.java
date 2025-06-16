package com.onboard.backend.repository;

import com.onboard.backend.dto.VehiculoFiltroDTO;
import com.onboard.backend.entity.EstadoOferta;
import com.onboard.backend.entity.Vehiculo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class VehiculoFiltroRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Vehiculo> filtrarVehiculos(VehiculoFiltroDTO filtro) {
        List<Criteria> criterios = new ArrayList<>();

        Criteria criterioOfertaActiva = Criteria.where("estadoOferta").is(EstadoOferta.ACTIVA.name());

        if (filtro.getPrecioMin() != null || filtro.getPrecioMax() != null) {
            if (filtro.getPrecioMin() != null && filtro.getPrecioMax() != null) {
                criterios.add(Criteria.where("precioPorDia").gte(filtro.getPrecioMin()).lte(filtro.getPrecioMax()));
            } else if (filtro.getPrecioMin() != null) {
                criterios.add(Criteria.where("precioPorDia").gte(filtro.getPrecioMin()));
            } else if (filtro.getPrecioMax() != null) {
                criterios.add(Criteria.where("precioPorDia").lte(filtro.getPrecioMax()));
            }
        }

        criterios.add(criterioOfertaActiva);

        if (filtro.getTipoVehiculo() != null)
            criterios.add(Criteria.where("tipoVehiculo").is(filtro.getTipoVehiculo()));

        if (filtro.getTipoTerreno() != null)
            criterios.add(Criteria.where("tipoTerreno").is(filtro.getTipoTerreno()));

        if (filtro.getTipoTransmision() != null)
            criterios.add(Criteria.where("tipoTransmision").is(filtro.getTipoTransmision()));

        if (filtro.getCombustible() != null)
            criterios.add(Criteria.where("combustible").is(filtro.getCombustible()));

        if (filtro.getAnioMin() != null)
            criterios.add(Criteria.where("anio").gte(filtro.getAnioMin()));
        if (filtro.getAnioMax() != null)
            criterios.add(Criteria.where("anio").lte(filtro.getAnioMax()));

        if (filtro.getPasajerosExacto() != null) {
            criterios.add(Criteria.where("capacidadPasajeros").is(filtro.getPasajerosExacto()));
        } else {
            if (filtro.getPasajerosMin() != null)
                criterios.add(Criteria.where("capacidadPasajeros").gte(filtro.getPasajerosMin()));
            if (filtro.getPasajerosMax() != null)
                criterios.add(Criteria.where("capacidadPasajeros").lte(filtro.getPasajerosMax()));
        }

        Query query = new Query();
        if (!criterios.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criterios.toArray(new Criteria[0])));
        }

        if (Boolean.TRUE.equals(filtro.getOrdenarPorFechaDesc())) {
            query.with(Sort.by(Sort.Direction.DESC, "fechaRegistro"));
        } else if (Boolean.FALSE.equals(filtro.getOrdenarPorFechaDesc())) {
            query.with(Sort.by(Sort.Direction.ASC, "fechaRegistro"));
        }

        if (Boolean.TRUE.equals(filtro.getOrdenarPorAlquilerDesc())) {
            query.with(Sort.by(Sort.Direction.DESC, "cantidadAlquiler"));
        } else if (Boolean.FALSE.equals(filtro.getOrdenarPorAlquilerDesc())) {
            query.with(Sort.by(Sort.Direction.ASC, "cantidadAlquiler"));
        }

        return mongoTemplate.find(query, Vehiculo.class);
    }
}
