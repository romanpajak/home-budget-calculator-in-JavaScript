function addItem(x){
    let itemName=document.getElementById(x).getElementsByClassName("item-name")[0].value;
    let itemValue=document.getElementById(x).getElementsByClassName("item-amount")[0].value;
    let newItem=document.createElement("div");
    newItem.className="item-row row h-auto m-2 pt-3 pb-3"
    //left column
    let leftColumn=document.createElement("div");
    leftColumn.className="row-details d-flex col h-auto";
    let newItemKind=document.createElement("p");
    newItemKind.className="item-kind mb-0";
    newItemKind.innerHTML=itemName;
    leftColumn.appendChild(newItemKind);
    let newItemValue=document.createElement("p");
    newItemValue.className="item-value mb-0"
    newItemValue.innerHTML=itemValue;
    leftColumn.appendChild(newItemValue);
    //right column
    let rightColumn=document.createElement("div");
    rightColumn.classList="buttons-container col h-auto p-0 d-flex";
    let buttonsContainer=document.createElement("div");
    buttonsContainer.className="buttons d-flex";
    rightColumn.appendChild(buttonsContainer);
    let leftButton=document.createElement("button");
    leftButton.type="button";
    leftButton.classList="btn btn btn-outline-success btn-sm";
    leftButton.innerHTML="Edytuj";
    let rightButton=document.createElement("button");
    rightButton.type="button";
    rightButton.id="delate-btn";
    rightButton.classList="btn btn-outline-danger btn-sm";
    rightButton.innerHTML="Usuń";
    buttonsContainer.appendChild(leftButton);
    buttonsContainer.appendChild(rightButton);
    onClickFunc=document.createAttribute("onclick")
    onClickFunc.value="delateItem(this)";
    rightButton.setAttributeNode(onClickFunc)
    rightButton.innerHTML="Usuń";
    newItem.appendChild(leftColumn);
    newItem.appendChild(rightColumn);
    //getElementById(x)
    let idName=x+"List";
    document.getElementById(idName).appendChild(newItem);
    getSum(x);
    totalBalance();


}
//getFormValues do usunięcia

function getFormValues(){
    let incomeAmount;
    let incomeKind;
    incomeAmount=document.getElementById("incomeAmount").value;
    incomeKind=document.getElementById("incomeName").value;
    let newItem;
    newItem=document.createElement("div");
    newItem.id="incomeItem";
    newItem.className="item-row row h-auto m-2 pt-3 pb-3"

    let leftColumn;
    leftColumn=document.createElement("div");
    leftColumn.className="row-details d-flex col h-auto";
    let newIncomeKind;
    newIncomeKind=document.createElement("p");
    newIncomeKind.id="incomeKind";
    newIncomeKind.className="item-kind mb-0";
    newIncomeKind.innerHTML=incomeKind;
    leftColumn.appendChild(newIncomeKind);
    let newIncomeValue;
    newIncomeValue=document.createElement("p");
    newIncomeValue.id="incomeValue";
    newIncomeValue.className="item-value mb-0"
    newIncomeValue.innerHTML=incomeAmount;
    leftColumn.appendChild(newIncomeValue);
    
    let rightColumn;
    rightColumn=document.createElement("div");
    rightColumn.classList="buttons-container col h-auto p-0 d-flex";
    let buttonsContainer;
    buttonsContainer=document.createElement("div");
    buttonsContainer.className="buttons d-flex";
    rightColumn.appendChild(buttonsContainer);
    let leftButton;
    leftButton=document.createElement("button");
    leftButton.type="button";
    leftButton.classList="btn btn btn-outline-success btn-sm";
    leftButton.innerHTML="Edytuj";
    let rightButton;
    rightButton=document.createElement("button");
    rightButton.type="button";
    rightButton.id="delate-btn";
    rightButton.classList="btn btn-outline-danger btn-sm";
    rightButton.innerHTML="Usuń";
    buttonsContainer.appendChild(leftButton);
    buttonsContainer.appendChild(rightButton);
    
    //funkcja onclick
    onClickFunc=document.createAttribute("onclick")
    onClickFunc.value="delateItem(this)";
    rightButton.setAttributeNode(onClickFunc)
    rightButton.innerHTML="Usuń";
    
    // 
    newItem.appendChild(leftColumn);
    newItem.appendChild(rightColumn);

    
    
    //dodawanie do listy
    document.getElementById("incomesList").appendChild(newItem);
    
    //zliczanie 
    getSum('incomes');
    totalBalance();



}

function delateItem(e){
   
    e.parentNode.parentNode.parentNode.remove();
    getSum('incomes');
    totalBalance();
}

function getSum(x){
    let itemValuesLen;
    itemValuesLen=document.getElementById(x).getElementsByClassName("item-value").length;
    let valuesSum=0;
    for(i=0;i<itemValuesLen;i++){
        valuesSum+=parseInt(document.getElementById(x).getElementsByClassName("item-value")[i].innerHTML);
        
    }
    document.getElementById(x).getElementsByClassName("price")[0].innerHTML=valuesSum;
}
function totalBalance(){
    let incomesSum=parseInt(document.getElementsByClassName("price")[0].innerHTML);
    let expencesSum=parseInt(document.getElementsByClassName("price")[1].innerHTML);
    let totalSum=incomesSum-expencesSum;
    if(totalSum>0){
        document.getElementById("headerDetails").innerHTML="Możesz jeszcze wydać "+totalSum+" złotych";
    }
    if(totalSum==0){
        document.getElementById("headerDetails").innerHTML="Bilans wynosi zero";
    }
    if(totalSum<0){
        document.getElementById("headerDetails").innerHTML="Bilans jest ujemny. Jesteś na minusie " + totalSum+" złotych";
    }

}