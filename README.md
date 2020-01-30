# metabolic-mtg-prices
Metabolic - Google script for scraping mtg card price ranges (Warning: there are regexes involved. It's disgusting. But it works on a spreadsheet)

Sample spreadsheet:

| Card  | URLPatch | Lang | Price (Scraped) |
| ------------- | ------------- | ------------- | ------------- |
| Señor myr	| señor-myr	| es | *0,08 €* |
| Myr de cobre	| myr-de-cobre	| pt	| *R$ 0,26* |
| Harvest Gwyllion | harvest-gwyllion	| en | *$ 0.07* |
| Myr de hierro	| myr-de-hierro	| es | *0,17 €* |

Highly recommended to use google sheets' formatting for URLPatches (`=LOWER(REGEXREPLACE(A1,"\s","-"))`) detection for languages (`=DETECTLANGUAGE(A2)`).
