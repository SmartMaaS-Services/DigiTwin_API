# DigiTwin API


damit die APP auch ohne Anmeldung funktioniert wurde eine REST API erstellt die den freien Zugriff auf die Daten der MobilitätsRegion ermöglicht.


Die Folgenden Endpunkte sind dort abgebildet:

Endpunkt |
---------|
/mobility/regions |
/mobility/stations | 
/mobility/services |
/parking/onstreet |
/parking/offstreet |
/parking/spots |
/transportation/bikehiredockingstations |
/transportation/transportstations |
/info/weather |
/info/airquality |

Die DigiTwin APP ist hier: https://github.com/SmartMaaS-Services/DigiTwin_APP


## Die DigiTwin API Environment Variablen

Variable | Beschreibung
---------|-------------
DIGITWIN_FIWARE_USERNAME | UserName mit dem die API an die Fiware angemeldet wird.
DIGITWIN_FIWARE_PASSWORD | Das Passwort für den User
TOKEN_SERVICE_CLIENT_ID | Die OAuth2 Client ID
TOKEN_SERVICE_CLIENT_SECRET | Das OAuth2 Client Passwort
DIGITWIN_FIWARE_CONTEXT_URL | URL zum ContextBroker
DIGITWIN_FIWARE_ACCOUNTS_URL | URL zum Account Server (KeyRock)
DIGITWIN_FIWARE_AUTHENTICATION | OAuth2 als Methode
DIGITWIN_FIWARE_SERVICE | FIWARE Service
DIGITWIN_FIWARE_SERVICEPATH | /
DIGITWIN_API_PORT | API Port default ist 3000
DIGITWIN_LOG_LEVEL | Log Level default Error



## Die DigiTwin API

damit die DigiTwin APP auch ohne Anmeldung funktioniert wurde eine REST API erstellt die den Zugriff auf die Daten der MobilitätsRegion ermöglicht.

Die Folgenden Endpunkte sind in dieser API abgebildet:

Endpunkt | Beschreibung
---------|-------------
/mobility/regions | Die MobilityRegion
/mobility/stations | Die MobilityStations
/mobility/services | Die MobilityServices
/parking/onstreet | Alle Objekte für den Parkservice vom Type OnStreetParking
/parking/offstreet | Alle Objekte für den Parkservice vom Type OffStreetParking
/parking/spots | Alle Objekte für den Parkservice vom Type  ParkingSpot
/transportation/bikehiredockingstations | Alle Objekte für den Transportation Service BikeHire
/transportation/transportstations | Alle Objekte für den Transportation Service Station (Bushaltestellen oder Bahnhöfe)
/info/weather | Alle Objekte für den Info Service Weather
/info/airquality | Alle Objekte für den Info Service Airquality


## Demo

Die API Demo ist hier: https://api.digitwin.kielregion.addix.io/

Endpunkt | Beschreibung
---------|-------------
https://api.digitwin.kielregion.addix.io/mobility/regions | Die MobilityRegion
https://api.digitwin.kielregion.addix.io/mobility/stations | Die MobilityStations
https://api.digitwin.kielregion.addix.io/mobility/services | Die MobilityServices
https://api.digitwin.kielregion.addix.io/parking/onstreet | Alle Objekte für den Parkservice vom Type OnStreetParking
https://api.digitwin.kielregion.addix.io/parking/offstreet | Alle Objekte für den Parkservice vom Type OffStreetParking
https://api.digitwin.kielregion.addix.io/parking/spots | Alle Objekte für den Parkservice vom Type  ParkingSpot
https://api.digitwin.kielregion.addix.io/transportation/bikehiredockingstations | Alle Objekte für den Transportation Service BikeHire
https://api.digitwin.kielregion.addix.io/transportation/transportstations | Alle Objekte für den Transportation Service Station (Bushaltestellen oder Bahnhöfe)
https://api.digitwin.kielregion.addix.io/info/weather | Alle Objekte für den Info Service Weather
https://api.digitwin.kielregion.addix.io/info/airquality | Alle Objekte für den Info Service Airquality


## neue Datenmodelle

Die neuen Datemodelle liegen hier im REPO https://github.com/SmartMaaS-Services/DiGiTwin_DataModel
und sind nach https://smartdatamodels.org/ übertragen worden.