var enURL = "https://shop.tcgplayer.com/magic/eventide/";
var enREGEX = ">Market Price<\/th>                            <\/tr>                        <\/thead>                        <tbody>                                <tr>                                    <th class=\"price-point__name\">Normal<\/th>                                    <td class=\"price-point__data\">(.*?)<\/td>";

var genURLpre = "https://www.cardmarket.com/";
var genURLpos = "/Magic/Cards/";
var genREGEX = "Tendencia de precio<\/dt><dd class=\"col-6 col-xl-7\"><span>(.*?)<\/span><\/dd>";

function updateValues() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Scrape');
  var lastRow = sheet.getDataRange().getLastRow();

  var dataRange = sheet.getRange(2,2, lastRow-1);
  var data = dataRange.getValues();

  var languageRange = sheet.getRange(2,3, lastRow-1);
  var lang = languageRange.getValues();

  for (var i = 0; i < data.length; i++) {
    var res = fetchData(data[i], lang[i]);
    var writeRange = sheet.getRange(2+i,4);
    writeRange.setValue(res);
  }
}

function fetchData(cardName, lang){
  Logger.log('Card name: ' + cardName);

  /* language switch en/general */
  if(lang == 'en') {
    var url = enURL + cardName;
    var regExp = new RegExp(enREGEX, "gi");
  } else {
    var url = genURLpre + lang + genURLpos + cardName;
    var regExp = new RegExp(genREGEX, "gi");
  }

  /* fetches html code */
  var page = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
  if(page.getResponseCode() == 200){
    var cleanHTML = page.getContentText().replace(/(\r\n|\n|\r)/gm, "");

    /* fetches regex match */
    var res = regExp.exec(cleanHTML);
    Logger.log(res);
    if(res) return res[1];
  }
  return "error";
}
