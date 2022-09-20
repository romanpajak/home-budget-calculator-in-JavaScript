function addItem(x){
    let itemName=document.getElementById(x).getElementsByClassName("item-name")[0].value;
    let itemValue=document.getElementById(x).getElementsByClassName("item-amount")[0].value;
    let newItem=document.createElement("div");
    let idName=x+"List";
    let idItemsCounter=document.getElementById(idName).getElementsByClassName("item-row").length
    newItem.id=x+"Row"+idItemsCounter;
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
    onClickFunc.value="delateItem(this,\'"+x+"\')";
    rightButton.setAttributeNode(onClickFunc)
    rightButton.innerHTML="Usuń";
    newItem.appendChild(leftColumn);
    newItem.appendChild(rightColumn);
    
    document.getElementById(idName).appendChild(newItem);
    getSum(x);
    totalBalance();
}

function delateItem(e,x){
    e.parentNode.parentNode.parentNode.remove();
    getSum(x);
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