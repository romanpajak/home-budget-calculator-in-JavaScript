function addItem(x){
    let itemName=document.getElementById(x).getElementsByClassName("item-name")[0].value;
    let itemValue=document.getElementById(x).getElementsByClassName("item-amount")[0].value;
    //forms errors handling
    let formNamePlaceholder=document.getElementById(x).getElementsByClassName("item-name")[0].placeholder;
    let formAmountPlaceholder=document.getElementById(x).getElementsByClassName("item-amount")[0].placeholder;
    if(itemName===""&&itemValue===""){
    let warn=`Uzupełnij pola: ${formNamePlaceholder} i ${formAmountPlaceholder}`;
    showAlert(warn);
    return;
    }
    if(itemName===""){
    warn=`Uzupełnij pole ${formNamePlaceholder}`;
    showAlert(warn);
    return;
    }
    if(itemValue===""){
    warn=`Uzupełnij pole ${formAmountPlaceholder}`;
    showAlert(warn);
    return;
    }
    if(itemValue<=0){
        warn=`Pole ${formAmountPlaceholder} musi zawierać wartość liczbową powyżej 0`;
        showAlert(warn);
        return;
        }

    let newItem=document.createElement("div");
    let idName=x+"List";
    newItem.classList="item-row row h-auto m-2 pt-3 pb-3"
    let leftColumn=document.createElement("div");
    leftColumn.classList="row-details d-flex col h-auto";
    let newItemKind=document.createElement("p");
    newItemKind.classList="item-kind mb-0";
    newItemKind.innerHTML=itemName;
    leftColumn.appendChild(newItemKind);
    let newItemValue=document.createElement("p");
    newItemValue.classList="item-value mb-0"
    newItemValue.innerHTML=itemValue;
    leftColumn.appendChild(newItemValue);
    let rightColumn=document.createElement("div");
    rightColumn.classList="buttons-container col h-auto p-0 d-flex";
    let buttonsContainer=document.createElement("div");
    buttonsContainer.classList="buttons d-flex";
    rightColumn.appendChild(buttonsContainer);
    let leftButton=document.createElement("button");
    leftButton.type="button";
    leftButton.classList="btn btn btn-outline-success btn-sm";
    leftButton.innerHTML="Edytuj";
    leftButton.addEventListener("click",editItem);
    let rightButton=document.createElement("button");
    rightButton.type="button";
    rightButton.classList="delate-btn btn btn-outline-danger btn-sm";
    rightButton.innerHTML="Usuń";
    buttonsContainer.appendChild(leftButton);
    buttonsContainer.appendChild(rightButton);
    rightButton.addEventListener("click",delateItem);
    rightButton.innerHTML="Usuń";
    newItem.appendChild(leftColumn);
    newItem.appendChild(rightColumn);
    document.getElementById(idName).appendChild(newItem);
    getSum(x);
    totalBalance();
    document.getElementById(x).getElementsByTagName("form")[0].reset();
}

function delateItem(x){
    let parendId=this.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    this.parentNode.parentNode.parentNode.remove();
    getSum(parendId);
    totalBalance();
}

function getSum(x){
    let itemValuesLen=document.getElementById(x).getElementsByClassName("item-value").length;
    let valuesSum=0;
    for(let i=0;i<itemValuesLen;i++){
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
    if(totalSum===0){
        document.getElementById("headerDetails").innerHTML="Bilans wynosi zero";
    }
    if(totalSum<0){
        document.getElementById("headerDetails").innerHTML="Bilans jest ujemny. Jesteś na minusie " + totalSum+" złotych";
    }
}
//modal box functions
let modal = document.getElementById("modalBox");
let btn = document.getElementById("myBtn");
let btn1 = document.getElementById("btn-1");
let btn2 = document.getElementById("btn-2");
let modForm = document.getElementById("modalForm");
let modContent=document.getElementById("alertContent");
btn2.onclick = function() {
  modal.style.display = "none";
}
function showAlert(con){
modal.style.display="block";
modContent.style.display="block"
btn1.style.display="none";
modForm.style.display="none";
modContent.style.color="black";
modContent.innerHTML=con;
}
function editItem(){
modForm.style.display="block";
btn1.style.display="block";
let colId=this.parentNode.parentNode.parentNode.parentNode.parentNode.id;
let itemKind=this.parentNode.parentNode.parentNode.getElementsByClassName("item-kind")[0];
let itemValue=this.parentNode.parentNode.parentNode.getElementsByClassName("item-value")[0];
let modFormTxt=document.getElementById("modalFormTextInp");
let modFormNmb=document.getElementById("modalFormNumbInp");
modFormTxt.value=itemKind.innerHTML;
modFormNmb.value=itemValue.innerHTML;
modContent.style.display="none";
modal.style.display="block";
btn1.onclick=function(){
    if(modFormTxt.value===""||modFormNmb.value===""){
        modContent.style.display="block";
        modContent.style.color="red";
        modContent.innerHTML="Wartości w polach nie mogą być puste";
        return;
    }
itemKind.innerHTML=modFormTxt.value;
itemValue.innerHTML=modFormNmb.value;
modal.style.display = "none";
getSum(colId);
totalBalance();
}
}