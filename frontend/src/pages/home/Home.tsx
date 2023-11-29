// import { getRequestToken } from "../../apiFunctions/login";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import "./Home.scss";

const Home = () => {
  return (
    <div className="helpCont">
      <img src="TradeEITI.png" width="200px" />
      <h2>Czym jest TradeEiti?</h2>
      <p>
        TradeEiti to portal dla studentów Politechniki Warszawskiej, służący do
        wymian godzinami zajęć na uczelni.
      </p>
      <img src="helpIcon.png" width="100px" />
      <h2>Jak to wszystko działa?</h2>
      <p>
        Nasza aplikacja posługuje się API USOS, dzięki czemu łączy się z
        uczelnianym serwisem. Wysyłając zapytania, zwraca użytkownikowi jego
        aktualne przedmioty, a także daje możliwość przeglądania innych
        dostępnych godzin przedmiotów. Dzięki temu użytkownik może wystawiać
        oferty wymian swoich godzin zajęć na inne dostępne w programie danego
        przedmiotu.
      </p>
      <img src="securityIcon.png" width="100px" />
      <h2>Czy to bezpieczne?</h2>
      <p>
        Tak, nasz portal nie zachowuje danych logowania do konta USOS,
        zapisywane są tylko dane logowania utworzonego konta, z zaszyfrowanym
        hasłem. Nasza aplikacja nie posiada też możliwości bezpośredniej
        ingerencji w dane USOS, jest ona zaledwie odbiorcą danych udostępnionych
        przez wyżej wspomniane API.
      </p>
      <img src="exchange.png" width="200px" />
      <h2>Jak działają wymiany?</h2>
      <span>
        Wymiany odbywają się na określonych zasadach:
        <ul>
          <li>
            Każdy użytkownik może wystawić swoją ofertę lub przeglądać aktualnie
            dostępne oferty.
          </li>
          <li>
            Wymiana godzin możliwa jest tylko między użytkownikami w ramach
            jednego przedmiotu.
          </li>
          <li>
            Wymiana dotyczy wyłącznie godzin oznaczonych jako laboratoria lub
            ćwiczenia <br /> (wymiany dotyczące wykładów nie są możliwe).
          </li>
          <li>
            Wymiany realizowane są na zasadzie 1 do 1 (jedna godzina zajęć
            przedmiotu za inną).
          </li>
          <li>
            Użytkownik, który wystawił ofertę, po jej zaakceptowaniu przez
            innego użytkownika, musi ponownie zatwierdzić ofertę lub zdecydować
            o jej odrzuceniu.
          </li>
          <li>
            Wystawioną ofertę, która nie została zaakceptowana przez nikogo,
            można wycofać.
          </li>
          <li>Zatwierdzonej oferty nie można cofnąć.</li>
        </ul>
      </span>
      <div className="authors">
        <img src="authorsIcon.png" width="200px" />
        <h2>Autorzy</h2>
        <h5>Oliwier Szypczyn</h5>
        <h5>Kacper Multan</h5>
        <h5>Artur Kempiński</h5>
        <h5>Jakub Kryczka</h5>
        
      </div>
    </div>
  );
};

export const PrivateHome = withPrivateRoute(Home);
