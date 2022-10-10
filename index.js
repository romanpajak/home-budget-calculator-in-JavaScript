function addItem(columnId){
    let itemName=document.getElementById(columnId).getElementsByClassName("item-name")[0].value;
    let itemValue=document.getElementById(columnId).getElementsByClassName("item-amount")[0].value;
    //----FORMS ERROR HANDLING----
    //if any input is empty
    let formNamePlaceholder=document.getElementById(columnId).getElementsByClassName("item-name")[0].placeholder;
    let formAmountPlaceholder=document.getElementById(columnId).getElementsByClassName("item-amount")[0].placeholder;
    
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
    //if input number empty or contains string
    if(itemValue===""){
    warn=`Uzupełnij pole ${formAmountPlaceholder} wpisując poprawną wartość np. 12.34`;
    document.getElementById(columnId).getElementsByClassName("item-amount")[0].value="";
    showAlert(warn);
    return;
    }
    //if decimal is leading 0
    itemValue=itemValue.replace(/^0*/g,"").replace(/^(\.|\,)/g,"0.");
    if(itemValue<=0){
        warn=`Pole ${formAmountPlaceholder} musi zawierać wartość liczbową powyżej 0`;
        showAlert(warn);
        document.getElementById(columnId).getElementsByClassName("item-amount")[0].value="";
        return;
    }
    //if input number starts from dot or colon
    if (itemValue.indexOf(".")===0||itemValue.indexOf(",")===0){
        warn=`Uzupełnij pole ${formAmountPlaceholder} wpisując poprawną wartość np. 12.34`;
        document.getElementById(columnId).getElementsByClassName("item-amount")[0].value="";
        return
    }
    //decimals number
    let decimalPosition=itemValue.indexOf(".");
    if (decimalPosition>0){
       if (itemValue.length-decimalPosition>3){
        warn=`Pole ${formAmountPlaceholder} nie może zawierać więcej niż 2 miejsca po przecinku.`;
        showAlert(warn);
        document.getElementById(columnId).getElementsByClassName("item-amount")[0].value="";
        return;
       }
    }else{
    itemValue=`${itemValue}.00`;
    }
    let newItem=document.createElement("div");
    let idName=columnId+"List";
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
    getSum(columnId);
    totalBalance();
    document.getElementById(columnId).getElementsByTagName("form")[0].reset();
}

function delateItem(){
    let parendId=this.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    this.parentNode.parentNode.parentNode.remove();
    getSum(parendId);
    totalBalance();
}

function getSum(x){
    let itemValuesLen=document.getElementById(x).getElementsByClassName("item-value").length;
    let valuesSum=0;
    for(let i=0;i<itemValuesLen;i++){
        let itemValueContent=document.getElementById(x).getElementsByClassName("item-value")[i].innerHTML;
        valuesSum+=parseFloat(itemValueContent);
    }
    document.getElementById(x).getElementsByClassName("price")[0].innerHTML=valuesSum.toFixed(2);
}
function totalBalance(){
    let incomesSum=parseFloat(document.getElementsByClassName("price")[0].innerHTML);
    let expencesSum=parseFloat(document.getElementsByClassName("price")[1].innerHTML);
    let totalSum=parseFloat(incomesSum)-parseFloat(expencesSum);
    if (totalSum!==0){
    totalSum=totalSum.toFixed(2);
    }else{
        totalSum=0;
    }
    if(totalSum>0){
        document.getElementById("headerDetails").innerHTML=`Możesz jeszcze wydać ${totalSum} złotych`;
    }
    if(totalSum===0){
        document.getElementById("headerDetails").innerHTML="Bilans wynosi zero";
    }
    if(totalSum<0){
        document.getElementById("headerDetails").innerHTML=`Bilans jest ujemny. Jesteś na minusie ${totalSum} złotych`;
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
function showAlert(warningText){
modal.style.display="block";
modContent.style.display="block"
btn1.style.display="none";
modForm.style.display="none";
modContent.style.color="black";
modContent.innerHTML=warningText;
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
    function showWarning(content){
        modContent.style.display="block";
        modContent.style.color="red";
        modContent.innerHTML=content;
    }
    btn1.onclick=function(){
        let modFormTxtVal=modFormTxt.value;
        let modFormNmbVal=modFormNmb.value;
        //Form errors handling are repeated from addItem function
        if(modFormTxtVal===""&&modFormNmbVal===""){
            showWarning("Wartości w polach nie mogą być puste");
            return;
        }
        if(modFormNmbVal===""){
            showWarning("Uzupełnij pole Kwota wpisując poprawną wartość np. 12.34");
            modFormNmb.value="";
            return;
        }
        modFormNmbVal=modFormNmbVal.replace(/^0*/g,"").replace(/^(\.|\,)/g,"0.");
        if(modFormNmbVal<=0){
            showWarning("Pole Kwota musi zawierać wartość liczbową powyżej 0");
            modFormNmb.value="";
            return;
        }
        if(modFormNmbVal.indexOf(".")===0||modFormNmbVal.indexOf(",")===0){
            showWarning("Uzupełnij pole wpisując poprawną wartość np. 12.34");
            return;
        }
        let decimalPos=modFormNmbVal.indexOf(".");
        if (decimalPos>0){
            if(modFormNmbVal.length-decimalPos>3){
               showWarning("Pole  nie może zawierać więcej niż 2 miejsca po przecinku.");
               modFormNmb.value="";
               return;
            }
        }else{
            modFormNmbVal=`${modFormNmbVal}.00`; 
        }
    itemKind.innerHTML=modFormTxtVal;
    itemValue.innerHTML=modFormNmbVal;
    modal.style.display = "none";
    getSum(colId);
    totalBalance();
    }
}
