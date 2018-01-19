// Data print
setCommonData();
switch (getData('#company')) {
  case '11st':
    set11st();
    break;
  case 'auction':
    setAuction();
    break;
  case 'gmarket':
    setGmarket();
    break;
  case 'interpark':
    setInterpark();
    break;
  default:
    break;
}

/**
* Common
*/
function setCommonData() {
  getDataText('#cardType');
  getDataText('#approvalNo');
  getDataText('#transDate');
  getDataText('#description');
  getDataText('#shopName');
  getDataText('#master');
  getDataText('#shopNo');
  getDataText('#sellerPhoneNo');
  getDataText('#sellerAddress');
}

/**
* 11st
*/
function set11st() {
  var order_no = getData('#transDate').replace(/-/gi, '') + getRandomInt(1000000, 9999999);
  $('#seqNo').text(order_no + '_' + order_no + getRandomInt(1000000, 9999999) +'_1');
  $('#orderNo').text(order_no);
  $('#cardNo').text(getData('#cardNo1') + getData('#cardNo2') + '**' + getData('#cardNo3') + getData('#cardNo4'));

  getDataMoney('#total');
  getDataMoney('#amount');
  getDataMoney('#taxes');
}

/**
* Auction
*/
function setAuction() {
  $('#approvalDate').text(getData('#transDate'));
  $('#cardNo').text(getData('#cardNo1') + '-' + getData('#cardNo2') + '**-' + getData('#cardNo3') + '-' + getData('#cardNo4'));

  getDataText('#purchaserId');
  getDataText('#purchaserName');
  getDataText('#total');
  getDataText('#amount');
  getDataText('#taxes');
}

/**
* Gmarket
*/
function setGmarket() {
  $('#orderNo').text(getRandomInt(1000000000, 9999999999) + '/' + getRandomInt(1000000000, 9999999999));
  $('#transTime').text('오후 ' + getRandomInt(6,11) + ':' + getRandomInt(10,59) + ':' + getRandomInt(10,59));
  $('#cardNo').text(getData('#cardNo1') + '-' + getData('#cardNo2') + '**-' + getData('#cardNo3') + '-' + getData('#cardNo4'));
  $('#description').text(getData('#description').substr(0, 38));

  getDataText('#total');
  getDataText('#amount');
  getDataText('#taxes');
}

/**
* Interpark
*/
function setInterpark() {
  getDataText('#purchaserName');
  $('#cardNo').text(getData('#cardNo1') + getData('#cardNo2') + '**********');
  $('#transTime').text(getRandomInt(16,23) + ':' + getRandomInt(10,59) + ':' + getRandomInt(10,59) + '.0');

  getDataMoney('#total');
  getDataMoney('#amount');
  getDataMoney('#taxes');
}
