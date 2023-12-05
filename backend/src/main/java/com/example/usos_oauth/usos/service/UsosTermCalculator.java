package com.example.usos_oauth.usos.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class UsosTermCalculator {
    public static String getCurrentAcademicTerm() {
        Date currentDate = new Date();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        int year = calendar.get(Calendar.YEAR);

        Date startDateL = parseDate("01.02." + year);
        Date endDateL = parseDate("31.07." + year);
        Date startDateZ = parseDate("01.08." + year);
        Date endDateZ = parseDate("31.12." + year);
        Date startDateWinter = parseDate("01.01." + year);
        Date endDateWinter = parseDate("31.01." + year);

        if (currentDate.after(startDateL) && currentDate.before(endDateL)) {
            return year + "L";
        } else if (currentDate.after(startDateZ) && currentDate.before(endDateZ)) {
            return year + "Z";
        } else if (currentDate.after(startDateWinter) && currentDate.before(endDateWinter)) {
            return (year - 1) + "Z";
        } else {
            return "Invalid date";
        }
    }

    private static Date parseDate(String dateStr) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
            return dateFormat.parse(dateStr);
        } catch (Exception e) {
            return null;
        }
    }
}