(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  // function insertBeast(beastURL, fields) {
  //   removeExistingBeasts();
  //   console.log(fields.PAN_seller);
  //   // let beastImage = document.createElement("img");
  //   // beastImage.setAttribute("src", beastURL);
  //   // beastImage.style.height = "100vh";
  //   // beastImage.className = "beastify-image";
  //   document.getElementById("email").value = fields.PAN_seller;
  //   // document.body.appendChild(beastImage);
  // }

  function insertBeast(beastURL, fields) {

    // console.log(getWordsForAmt(100000));

    console.log(fields.PAN_purchaser);
    document.getElementById('0021').checked=true
    document.getElementById('Indian').checked=true

    document.querySelector('input[name=PAN_purchaser]').value = fields.PAN_purchaser
    document.querySelector('input[name=PAN_purchaser_confirm]').value = fields.PAN_purchaser_confirm
    document.querySelector('input[name=purchaserPANCategory]').value = 'Individual'
    document.querySelector('input[name=PAN_seller]').value = fields.PAN_seller
    document.querySelector('input[name=PAN_seller_confirm]').value = fields.PAN_seller
    document.querySelector('input[name=sellerPANCategory]').value = 'Firm and/or Limited Liability Partnership'
    
    document.querySelector('input[name=Add_Line2]').value = fields.Add_Line2
    document.querySelector('input[name=Add_Line1]').value = fields.Add_Line1
    document.querySelector('input[name=Add_Line5]').value = fields.Add_Line5

    document.querySelector("select[name=Add_State]").value=fields.Add_State
    document.querySelector('input[name=Add_PIN]').value = fields.Add_PIN
    document.querySelector('input[name=Add_EMAIL]').value = fields.Add_EMAIL
    document.querySelector('input[name=Add_MOBILE]').value = fields.Add_MOBILE
    document.querySelector("select[name=Buyer]").value=fields.Buyer

    document.querySelector('input[name=transferer_Add_Line5]').value = fields.transferer_Add_Line5
    document.querySelector("select[name=transferer_Add_State]").value=fields.transferer_Add_State
    document.querySelector('input[name=transferer_Add_PIN]').value = fields.transferer_Add_PIN
    document.querySelector('input[name=transferer_Add_EMAIL]').value = fields.transferer_Add_EMAIL
    document.querySelector('input[name=transferer_Add_MOBILE]').value = fields.transferer_Add_MOBILE
    document.querySelector("select[name=Seller]").value=fields.Seller

    // 3rd page
    document.querySelector("select[name=propertyType]").value=fields.propertyType
    document.querySelector('input[name=p_Add_Line5]').value = fields.p_Add_Line5
    document.querySelector("select[name=p_Add_State]").value=fields.p_Add_State
    document.querySelector('input[name=p_Add_PIN]').value = fields.p_Add_PIN
    document.querySelector("select[name=agmt_day]").value=fields.agmt_day
    document.querySelector("select[name=agmt_month]").value=fields.agmt_month // less 1
    document.querySelector("select[name=agmt_year]").value=fields.agmt_year
    document.querySelector('input[name=totalPropertyValue]').value = fields.totalPropertyValue
    document.querySelector("select[name=paymentType]").value=fields.paymentType
    document.getElementById("pymntDay").value=fields.pymntDay
    document.getElementById("pymntMonth").value=fields.pymntMonth // less 1
    document.getElementById("pymntYear").value=fields.pymntYear
    document.getElementById("deductionDay").value=fields.deductionDay
    document.getElementById("deductionMonth").value=fields.deductionMonth
    document.getElementById("deductionYear").value=fields.deductionYear

    document.getElementById("tds_higher_rate").value=fields.tds_higher_rate

    document.querySelector("select[name=Crores]").value=fields.Crores
    document.querySelector('input[name=CRORES]').value = fields.CRORES
    document.querySelector("select[name=Lakh]").value=fields.Lakh
    document.querySelector('input[name=LAKH]').value = fields.LAKH
    document.querySelector("select[name=Thousands]").value=fields.Thousands
    document.querySelector('input[name=THOUSANDS]').value = fields.THOUSANDS
    document.querySelector("select[name=Hundreds]").value=fields.Hundreds
    document.querySelector('input[name=HUNDREDS]').value = fields.HUNDREDS
    document.querySelector("select[name=Tens]").value=fields.Tens
    document.querySelector('input[name=TENS]').value = fields.TENS
    document.querySelector("select[name=Ones]").value=fields.Ones
    document.querySelector('input[name=ONES]').value = fields.ONES

    document.querySelector('input[name=value_entered_user]').value = fields.value_entered_user

    document.querySelector('input[name=TDS_rate]').value = fields.TDS_rate
    document.querySelector('input[name=TDS_amt]').value = fields.TDS_amt

    document.querySelector('input[name=totalPayment]').value = fields.totalPayment
    document.querySelector('textarea[name=value_in_words]').value = getWordsForAmt(document.querySelector('input[name=totalPayment]').value)
    
    document.querySelector('input[name=value_entered_user]').onblur()
    document.querySelector("a[href='#next']").click()
  }


  function getWordsForAmt(amt) {

    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    if ((amt = amt.toString()).length > 9) return 'overflow';
    n = ('000000000' + amt).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    console.log(n);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]])+ 'Crores' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]])+ 'Lakhs ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]])+ 'Thousands ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]])+ 'Hundreds ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';

    // return [str1,str2, str3, str4,str5];
    // return str1+' '+str2+' '+str3+' '+str4+' '+str5;
    return str;

  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  browser.runtime.onMessage.addListener((message) => {
    console.log(JSON.parse(message.nid));
    if (message.command === "beastify") {
      insertBeast(message.beastURL, JSON.parse(message.nid));
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });

})();