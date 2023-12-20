# TradEITI - Aplikacja do Wymiany Godzinami Zajęć dla Studentów

## Opis projektu

TradEITI to aplikacja webowa, która ma na celu ułatwienie studentom wymiany godzinami zajęć. Problemem, z którym zetknęliśmy się podczas pierwszego roku studiów, jest brak dostępnej platformy do wymiany godzinami zajęć pomiędzy studentami. Obecnie studenci często muszą korzystać z prymitywnych rozwiązań, takich jak dokumenty typu Google Docs. Naszym celem jest stworzenie giełdy wymiany, która umożliwi studentom bardziej efektywne rozwiązywanie tego problemu.

## Wersja online
<a href="https://www.tradeiti.com/">https://www.tradeiti.com/</a>
Zalogowanie się pełne jest tylko możliwe dla osób posiadających konto w domenie USOS PW ze względu na to, że jest to aplikacja dla studentów.

## Technologie

- Backend oparty na frameworku Spring
- Frontend w technologii React
- Baza danych PostgreSQL
- Kontenery Docker

## Integracja z API USOS

Chcemy umożliwić studentom korzystanie z własnych danych z systemu USOS. Dzięki integracji z API USOS, każdy użytkownik będzie mógł zalogować się używając swoich istniejących danych.

## Funkcje aplikacji

Aplikacja TradEITI będzie oferować następujące funkcje:

- Dodawanie nowych ofert wymiany godzinami zajęć.
- Wyszukiwanie ofert na stronie głównej za pomocą różnych filtrów.
- Zarządzanie własnymi ofertami wymiany.
- Akceptacja ofert wymiany z innymi studentami.

## Autorzy
- Oliwier Szypczyn
- Artur Kempiński
- Kacper Multan
- Jakub Kryczka

## Moja rola w projekcie

Moja rola polegała głównie na tworzeniu aplikacji po stronie użytkownika i scalanie warstwy użytkownika z warstwą serwera, m.in. :
- utworzeniem struktury projektu po stronie frontendowej
- utworzenie połączenia z backendem
- wszystkie operacje logiczne po stronie frontendowej (np. cachowanie danych w formularzu po odświeżeniu strony, filtrowanie ofert itp.)
- częściowo budowa szkieletu strony i jej stylowanie
- dodanie aplikacji frontendowej do kontenera Docker
- pomoc w konfiguracji połączenia z USOS przez USOS OAUTH 1.0

## Licencja
Ten projekt jest dostępny na zamkniętej licencji. Wszelkie prawa autorskie zastrzeżone.
