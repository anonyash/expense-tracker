//1
const balance = document.getElementById(
    "balance"
  );
  const money_plus = document.getElementById(
    "money-plus"
  );
  const money_minus = document.getElementById(
    "money-minus"
  );
  const list = document.getElementById("list");
  const form = document.getElementById("form");
  const text = document.getElementById("text");
  const amount = document.getElementById("amount");
  // const dummyTransactions = [
  //   { id: 1, text: "Flower", amount: -20 },
  //   { id: 2, text: "Salary", amount: 300 },
  //   { id: 3, text: "Book", amount: -10 },
  //   { id: 4, text: "Camera", amount: 150 },
  // ];
  
  // let transactions = dummyTransactions;
  
  //last 
  const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
  
  let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
  
  //5
  let cur = "₹" //   "$"    "₹"
 



  
  //Add Transaction
  function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('please add category and amount')
    }else if(amount.value < 0){ alert('please enter a valid amount') }else{
      let togg = document.getElementById('expen');
      let sig = togg.checked? "-" : "+";
      if(sig == "-"){
        const transaction = {
          id:generateID(),
          text:text.value,
          amount: -amount.value,
          sig:"-"
        }
        console.log(`tran: ${transaction}`)
        transactions.push(transaction);
        addTransactionDOM(transaction);}else{
        const transaction = {
          id:generateID(),
          text:text.value,
          amount: +amount.value,
          sig:"+"
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
      }
        
      updateValues();
      updateLocalStorage();
      text.value='';
      amount.value='';
    }
  }
  
  
  //5.5
  //Generate Random ID
  function generateID(){
    return Math.floor(Math.random()*1000000000);
  }
  
  //2
  
  
  function toggl(){
  let togg = document.getElementById('expen');
  console.log(togg.checked);
  }

  let sig2

  function updTransactionDOM(transaction) {
    
    //GET sign
    let sign2 = sig2[0];
    const item = document.createElement("li");
  
    //Add Class Based on Value
    item.classList.add(
      sig2[0] =="-"? "minus" : "plus"
    );
    console.log( item.classList)
    item.innerHTML = `
      ${transaction.text} <span>${sign2}${Math.abs(
      transaction.amount
    )}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
    sig2.shift();
  }




  
  //##########################_______chart and data visualisation___________#########################
  const labels = [];
  const data = [];

  const barChartCtx = document.getElementById('barChart').getContext('2d');
  const pieChartCtx = document.getElementById('pieChart').getContext('2d');

  const barChart = new Chart(barChartCtx, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Values', data, backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple'] }] },
  });

  const pieChart = new Chart(pieChartCtx, {
      type: 'pie',
      data: { labels, datasets: [{ data, backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple'] }] },
  });

  function addData() {
      const label = document.getElementById("text").value;
      const value = document.getElementById("amount").value;

      if (label && value) {
          labels.push(label);
          data.push(Number(value));
          barChart.update();
          pieChart.update();
          console.log("chart updated")

          // document.getElementById('labelInput').value = '';
          // document.getElementById('valueInput').value = '';
      }
  }
















  let togg = document.getElementById('expen');
  let tru = togg.checked
  let sig = tru? "-" : "+";
  //Add Trasactions to DOM list
  function addTransactionDOM(transaction) {
    
    //GET sign
    const sign = sig;
    const item = document.createElement("li");
  
    //Add Class Based on Value
    item.classList.add(
      togg.checked? "minus" : "plus"
    );
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
      `;
    list.appendChild(item);
  }
  
  //4
  
  //Update the balance income and expence
  function updateValues() {
    const amounts = transactions.map(
      (transaction) => transaction.amount
    );
    const total = amounts
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense =
      (amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
      -1).toFixed(2);
    sig2 = transactions.map(
        (transaction) => transaction.sig
    );

      console.log(sig2)
      console.log(expense)
      balance.innerText=`${cur}${total}`;
      money_plus.innerText = `${cur}${income}`;
      money_minus.innerText = `${cur}${expense}`;
  }
  
  
  //6 
  
  //Remove Transaction by ID
  function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
  }
  //last
  //update Local Storage Transaction
  function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
  }
  
  //3
  
  //Init App
  function Init() {
    list.innerHTML = "";
    updateValues();
    transactions.forEach(updTransactionDOM);
    
    
  }
  
  Init();
  
  form.addEventListener('submit',addTransaction);