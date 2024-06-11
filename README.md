# Airbean-API

Dokumentationen finns här!

## Gruppuppgift
### För Godkänt
* Inlämnad länk till gruppens GitHub repo med kod till en fungerande webbapplikation som uppfyller de funktionella kraven. 
* Gruppen använder sig av Express och NeDB som databas (en annan databas exempelvis MongoDB är okej ifall alla i gruppen är överens om detta).
* All input som skickas i url eller i body ska valideras i en middleware och ifall det är fel data ska ett felmeddelande skickas tillbaka.
* Det ska enbart gå att lägga till produkter som finns i menyn, ifall någon annan produkt skickas med så ska ett felmeddelande skickas tillbaka. Även pris ska kontrolleras, allt detta ska göras i en middleware.
* När ett konto skapas ska detta kopplas till ett slumpat användarID (här används förslagsvis ett bibliotek) där användarID:et sedan kan användas för att hämta orderhistorik. Användarnamn ska alltså ej skickas med i url för att hämta orderhistorik.

## Extra utmaning (valfritt)
* Användare ska kunna få kampanjerbjudanden på olika kombinationer för att få ett billigare pris. 
* Projektet använder sig av en MVC-arkitektur.


# Airbean-API-individuella
## Funktionella krav
1. Admin ska kunna lägga till en ny produkt i menyn. Man ska enbart kunna skicka med de egenskaper som finns på en produkt (id, title, desc, price) i bodyn. Alla egenskaper ska också finnas med. Det ska även läggas på en createdAt med datum och tid när den skapades.
2. Det ska gå att modifiera en produkt i menyn. Om en produkt modifieras så ska egenskapen modifiedAt läggas till med datum och tid.
3. Det ska gå att ta bort en produkt i menyn. Det ska enbart gå att ta bort en produkt som finns.
4. Uppnås inte kraven ovan ska ett passande felmeddelande skickas tillbaka.
5. Alla tre endpoints ska vara skyddade genom att användaren som loggar in ska ha en admin-roll (som finns sparad i databasen), detta kontrolleras via en middleware. Användaren kan läggas till manuellt i databasen men det ska gå att logga in, dvs. du behöver en endpoint för att logga in (men det är inget krav på att skapa ett konto).
6. Menyn ska sparas i en NeDB-databas.
7. Det ska finnas en endpoint för att kunna lägga till kampanjerbjudanden som ska sparas i databasen enligt följande modell:
8. Produkter som ingår (ex. bryggkaffe och Gustav Adolfsbakelse) och det ska valideras att dessa produkter finns)
9. Kampanjpris för denna kombination (ex. 40 kr totalt)

## Bedömning
### För Godkänt
Inlämnad länk till ditt GitHub repo med kod till en fungerande webbapplikation som uppfyller de funktionella kraven. 

### För Väl Godkänt
Grundläggande dokumentation för hela projektet, inkl. gruppexaminationen. Dokumentation skall innehålla ALLA endpoints som omfattas av REST-API:et, med tillhörande förklaringar.

## Inlämning
Inlämning sker via Azomo. Gå in på Azomo och klistra in länken till ditt dokument för individuell analys  i modulen som heter Del 2: individuellt projekt.
Deadline för inlämning: 14/6 klockan 23.59
