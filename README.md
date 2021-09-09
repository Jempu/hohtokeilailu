# mikkelin-keilahalli
Suunnittelemani ja toteuttamani Mikkelin Keilahallin uudet kotisivut. Tein sivut alusta alkaen suunnitellen Figmalla.

Sivut on tehty käyttäen html, php, sass & js. En halunnut käyttää React.js, koska halusin oppia tekemään kokonaiset sivut ilman sitä.

[Tekniset tiedot:]

/opening.json
Sisältää keilahallin aukioloajat.
Tiedot ovat 14 eri string arvossa, joista joka toinen on normi- ja toinen hohtokeila-kellonaika yhdelle päivälle.

Esimerkiksi:
"",
"",
"",
"",
"14.00,20.00",
"",
"14.00,20.00",
"",
"14.00,20.00",
"16.00,18.00",
"14.00,20.00",
"16.00,18.00",
"",
""

Tarkoittaa:
Ma: SULJETTU normi ja hohto
Ti: sama
Ke: normisti auki 14-20
To: sama
Pe: normisti 14-20 ja hohto 16-18
La: sama
Su: SULJETTU normi ja hohto

