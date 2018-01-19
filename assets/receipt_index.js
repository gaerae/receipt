$(function() {
  // Initialization
  companyChange();
  //getFeed();
  $('#formReset').click(function() {
    event.preventDefault();
    $('form').each(function() {
      this.reset();
      companyChange();
    })
  });

  // Date Format
  //$('#transDate').datepicker({format:'yyyy-mm-dd'});
  $("#transDate").flatpickr();

  // Window open event
  $('#formReceipt').submit(function() {
    event.preventDefault();
    var url = './forms/'+$('#company').val()+'.html';
    var popReceipt =
    window.open(url,'popReceipt','width=600,height=600,left=0,top=0,scrollbars=auto');
  });

   // Get product
  $('#search').click(function() {
    if($('#url').val()) {
      getContents($('#url').val());
    } else {
      alert('not product url :(');
    }
  });

});

/**
* Company view setting
*/
function companyChange() {
  var company = $('#company').val();

  // Check Field: id, name
  if ( company === 'auction' ) {
      $('#purchaserIdDisplay').css('display','');
      $('#purchaserNameDisplay').css('display','');
  } else if ( company === 'interpark' || company === 'megabox') {
    $('#purchaserIdDisplay').css('display','none');
    $('#purchaserNameDisplay').css('display','');
  } else {
    $('#purchaserIdDisplay').css('display','none');
    $('#purchaserNameDisplay').css('display','none');
  }

  // Check Field: Seller info
  if ( company === 'megabox' ) {
    $('#shopNameDisplay').css('display','none');
    $('#shopNoDisplay').css('display','none');
    $('#sellerAddressDisplay').css('display','none');
    $('#expiryDisplay').css('display','');
  } else {
    $('#shopNameDisplay').css('display','');
    $('#shopNoDisplay').css('display','');
    $('#sellerAddressDisplay').css('display','');
    $('#expiryDisplay').css('display','none');
  }

  // Check Field: Card number
  if ( company === 'auction' || company === 'gmarket' || company === '11st' ) {
    $('#cardNo2').attr('maxLength','2');
    $('#cardNo4').val('');
    $('#cardNo3').val('****');
    $('#cardNo3').attr('readonly', true);
    $('#cardNo4').removeAttr('readonly');
  } else {
    $('#cardNo2').attr('maxLength','4');
    $('#cardNo3').val('****');
    $('#cardNo3').attr('readonly', true);
    $('#cardNo4').val('****');
    $('#cardNo4').attr('readonly', true);
  }

  // Check Field: Product search
  //if ( company == '11st' || company == 'gmarket') {
  if ( company === '11st') {
    $('#searchBox').css('display','');
  } else {
    $('#searchBox').css('display','none');
  }

  // Check Field: Card Approval number
  $('#approvalNo').val(getRandomInt(10000000, 99999999));
}

/**
* Price Setting
*/
function setSalePrice (taxType) {
  var price = $('#total').val().replace(/,/g, '');
  var taxPercent = 10;
  var taxType = (taxType) ? taxType : 1;

  if (taxType === '1') {
    // taxation
    if (taxPercent > 99.9) {
      alert('The maximum tax rate is less than 100%.');
    }
    $('#total').val(priceFormat(price));
    $('#amount').val(priceFormat(price - (price / (1 + (taxPercent / 100)) * (taxPercent / 100))));
    $('#taxes').val(priceFormat(price / (1 + (taxPercent / 100)) * (taxPercent / 100)));
  } else {
    // tax exemption
    $('#total').val(priceFormat(price));
    $('#amount').val(priceFormat(price));
    $('#taxes').val('0');
  }
}

/**
* Price format
*/
function priceFormat (price, decimal, sections) {
  price = parseFloat(('' + price).replace(/,/g, ''));

  var re = '\\d(?=(\\d{' + (sections || 3) + '})+' + (decimal > 0 ? '\\.' : '$') + ')';
  return price.toFixed(Math.max(0, ~~decimal)).replace(new RegExp(re, 'g'), '$&,');
}

/**
* Shop number format
*/
function makeDash () {
  var val = $('#shopNo').val().replace(/-/g, '');
  var DashedNo = $('#shopNo').val().replace(/-/g, '');

  if (val.length === 10) {
    DashedNo = val.substring(0,3) + '-' + val.substring(3,5) + '-' + val.substring(5);
  } else if (val.length === 13) {
    DashedNo = val.substring(0,6) + '-' + val.substring(5);
  }

  $('#shopNo').val(DashedNo);
}

/**
* Product contents searching
*/
function getContents(sProductUrl) {
  sProductUrl = sProductUrl.replace('^', '%5E');
  $('#eSearching').css('display', 'block');
  var receiptApi = 'https://51v9ro9wbapv.runkit.sh/11st/'+encodeURIComponent(sProductUrl);

  $.ajax({
      url: receiptApi,
      dataType: 'json',
      success: function(data) {
        $('#description').val(data.description);
        $('#total').val(data.total);
        $('#shopName').val(data.shopName);
        $('#master').val(data.master);
        $('#shopNo').val(data.shopNo);
        $('#sellerPhoneNo').val(data.sellerPhoneNo);
        $('#sellerAddress').val(data.sellerAddress);
        setSalePrice();
        makeDash();
      },
      error: function(data) {
        alert('searching error :(');
        console.log(msg);
      },
      complete: function() {
        $('#eSearching').css('display', 'none');
      }
  });
}

/**
* Open market product feed list click event
*/
function getFeedEvent(url) {
  $('#company').val('11st');
  companyChange();
  $('#url').val(decodeURIComponent(url));
  getContents($('#url').val());
}

/**
* Open market product feed
*/
function getFeed() {
  var feed = new Array();
  feed[0] = {category:'bicycle', url:'http://www.11st.co.kr/rss/best.tmall?categoryNo=246025'};
  feed[1] = {category:'fishing_rod', url:'http://www.11st.co.kr/rss/best.tmall?categoryNo=15923'};
  feed[2] = {category:'badminton_tennis', url:'http://www.11st.co.kr/rss/best.tmall?categoryNo=254203'};
  feed[3] = {category:'tent', url:'http://www.11st.co.kr/rss/best.tmall?categoryNo=245150'}

  for(var feedCnt=0; feedCnt < feed.length; feedCnt++) {
    getFeedPrint(feed[feedCnt].category, feed[feedCnt].url);
  }
}

/**
* Open market product feed lists
*/
function getFeedPrint(category, url) {
  $.ajax({
    type: 'GET',
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    error: function(){
      alert('Unable to load feed, Incorrect path or invalid feed');
    },
    success: function(data){
      var entries = data.responseData.feed.entries;
      var printCnt = 0;
      for(var loofCnt=0; loofCnt < entries.length && printCnt < 8; loofCnt++) {
        var item = entries[loofCnt];
        var content = '';
        var price = item.author.replace('[11번가] ', '').replace(',', '').replace('원', '');
        if(price >= 100000) {
          content += '<a href="#" class="list-group-item" onclick="getFeedEvent(\'' + encodeURIComponent(item.link) + '\')">';
          content += '<h6 class="list-group-item-heading">' + item.author + '</h6>';
          content += '<p class="list-group-item-text">' + item.title + '</p></a>';
          $('#' + category + '_list').append(content);
          printCnt++;
        }
      }
    }
  });
}
