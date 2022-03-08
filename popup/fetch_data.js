
const apiBaseUrl = 'https://vjpartners.co.in/ongoing/v7_new_clone_2/vj-sales-dashboard-live/public/api/'

function fetchAndAppend(pageID){

  // fetch(`https://reqres.in/api/users?page=${pageID}`)
  fetch(`${apiBaseUrl}nsdl_dt`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let users = data;
    const tbtn = document.getElementById('tbtn');
    const mainTbl = document.getElementById('mainTable');
    const mainTblBody = document.createElement('tbody');
    // const mainTbl_body = document.querySelector('#mainTable tbody');
    let cnt=1;
    users.map(function(author) {
      var row = document.createElement('tr');
      var td= document.createElement('td');
      // var cellText = document.createTextNode("cell in row");
      var id = document.createTextNode(`${cnt}`);
      var transferee = document.createTextNode(`${author.PAN_purchaser}`);
      // var transferor = document.createTextNode(`${author.PAN_seller}`);
      var project = document.createTextNode(`${author.project}`);
      var agreementDt = document.createTextNode(`${author.agmt_day}/${author.agmt_month}/${author.agmt_year}`);
      // author.agmt_month-author.agmt_year
      var customerName = document.createTextNode(`${author.customerName}`);



      var td= document.createElement('td');
      td.appendChild(id);
      row.appendChild(td);

      var td= document.createElement('td');
      td.appendChild(customerName);
      row.appendChild(td);

      var td= document.createElement('td');
      td.appendChild(transferee);
      row.appendChild(td);

      var td= document.createElement('td');
      td.appendChild(agreementDt);
      row.appendChild(td);

      var td= document.createElement('td');
      td.appendChild(project);
      row.appendChild(td);

      var td= document.createElement('td');
      var btn= document.createElement('button');

      btn.innerHTML = "Append"; 

      // btn.setAttribute('data-form_1','{"pan1":"cplpb9653l","pan2":"cplpb9653l"}');
      btn.setAttribute('data-form_1',JSON.stringify(author));
      btn.setAttribute('class','click-me btn btn-sm btn-outline-primary');
      btn.addEventListener("click", function () {});
      td.appendChild(btn);

      var btn1= document.createElement('button');
      btn1.innerHTML = "Done"; 
      // btn1.setAttribute('data-filled',JSON.stringify(author.PAN_purchaser));
      // btn1.setAttribute('class','');
      // btn1.setAttribute('onClick','nsdlDataFilled(this)');
      setAttributes(btn1, {'class':'clicked-me btn btn-sm btn-outline-success ml-2', 'data-filled':JSON.stringify(author.PAN_purchaser), 'data-toggle':'modal', 'data-target':'#exampleModal'})
      btn1.addEventListener("click", function () {});
      td.appendChild(btn1);
      row.appendChild(td);
      // tbtn.innerHTML = `${author.email}`;

      mainTblBody.appendChild(row)

      cnt=cnt+1;
    });

    mainTbl.appendChild(mainTblBody)

  })

 }

 fetchAndAppend(1)

 const setAttributes = (el, options) => {
  Object.keys(options).forEach(function(attr) {
    el.setAttribute(attr, options[attr]);
  })
}