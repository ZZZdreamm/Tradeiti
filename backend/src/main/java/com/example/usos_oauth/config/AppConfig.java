package com.example.usos_oauth.config;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;

import java.io.InputStream;
import java.util.Map;

@Component
public class AppConfig {
    private static final String CONFIG_FILE_DEV = "config-dev.yml";
    private static final String CONFIG_FILE_PROD = "config-prod.yml";

    private Map<String, Object> config;

    public AppConfig() {
        loadConfig();
    }

    private void loadConfig() {
        String environment = System.getenv("ENVIRONMENT");

        if (environment == null || environment.isEmpty()) {
            environment = "development";
        }

        String configFile = getConfigFileName(environment);

        try (InputStream input = getClass().getClassLoader().getResourceAsStream(configFile)) {
            if (input == null) {
                System.out.println("Sorry, unable to find " + configFile);
                return;
            }

            Yaml yaml = new Yaml();
            config = yaml.load(input);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getConfigFileName(String environment) {
        return "production".equals(environment) ? CONFIG_FILE_PROD : CONFIG_FILE_DEV;
    }

    public String getEnvironment() {
        return (String) config.get("environment");
    }

    public String getVariable(String variableName) {
        return (String) config.get(variableName);
    }
}