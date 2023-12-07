package com.example.usos_oauth.usos.service.usos.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class UsosDateTimeParser {

    static Map<String, String> weekdayMapping = Map.of(
            "MONDAY", "Poniedziałek",
            "TUESDAY", "Wtorek",
            "WEDNESDAY", "Środa",
            "THURSDAY", "Czwartek",
            "FRIDAY", "Piątek",
            "SATURDAY", "Sobota",
            "SUNDAY", "Niedziela"
    );
    static DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    static DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("HH:mm");

    public static String parseHour(String time) {
        LocalDateTime formatedTime = LocalDateTime.parse(time, inputFormatter);
        return formatedTime.format(outputFormatter);
    }

    public static String parseWeekday(String time) {
        LocalDateTime formatedTime = LocalDateTime.parse(time, inputFormatter);
        return weekdayMapping.get(formatedTime.getDayOfWeek().toString());

    }
}
