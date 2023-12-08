package com.example.usos_oauth.offers.service.utils;

import com.example.usos_oauth.offers.model.dao.OfferState;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class OfferStateSerializer extends JsonSerializer<OfferState> {
    @Override
    public void serialize(OfferState value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        String stringEnum = value.toString().toLowerCase();
        String capitalizedStringEnum = Character.toUpperCase(stringEnum.charAt(0)) + stringEnum.substring(1);
        gen.writeString(capitalizedStringEnum);
    }
}