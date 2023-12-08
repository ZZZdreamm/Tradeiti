package com.example.usos_oauth.offers.model.dao;

import com.example.usos_oauth.offers.service.utils.OfferStateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize(using = OfferStateSerializer.class)
public enum OfferState {
    PENDING,
    REQUEST_SENT,
    COMPLETED,
}
