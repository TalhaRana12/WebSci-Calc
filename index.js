
let display= document.querySelector(".display");
function insertValue(val)
{
    if(val==="pi")
        val=Math.PI.toString();
    if(val==="e")
        val=Math.E.toString();

    if(val==="^2") 
        return display.innerHTML+="**2";
    if(val==="^3")
        return display.innerHTML+="**3";
    
    display.innerHTML+=val;
}



document.querySelectorAll("button[data-val]").forEach(btn => {
    btn.addEventListener("click", () => {
        insertValue(btn.dataset.val);
    });
});


document.querySelector(".clear").addEventListener("click", () => {
    display.innerHTML="";
    display.classList.remove("error");
});


document.querySelector("#backspace").addEventListener("click", ()=>{
    display.innerHTML=display.innerHTML.slice(0,-1);
});

document.querySelector(".equal").addEventListener("click",()=>{
    try{

        let expression = display.innerHTML;

        // Convert functions to JS Math functions
        expression = expression.replace(/sin/g, "Math.sin");
        expression = expression.replace(/cos/g, "Math.cos");
        expression = expression.replace(/tan/g, "Math.tan");
        expression = expression.replace(/log/g, "Math.log10");
        expression = expression.replace(/ln/g, "Math.log");
        expression = expression.replace(/sqrt/g, "Math.sqrt");
        // to remove the equal sign at the end because use class instead of id
        expression=expression.slice(0,-1);
        let result = eval(expression);
        display.innerHTML = result;
    }
    catch(error)
    {
        display.innerHTML="ERROR";
        display.classList.add("error");
    }
});


// for keyboard control

document.addEventListener("keydown", (e) => {
    let key=e.key;

    // check number
    if(!isNaN(key))
        return insertValue(key);

    // basic operator
    if(["+","-","*","/",".","(",")"].includes(key))
        return insertValue(key);

    // for equal
    if(key==="Enter"){
        e.preventDefault();
        document.querySelector(".equal").click();
        return;
    }

    // for backspace
    if(key==="Backspace"){
        document.querySelector("#backspace").click();
        return;
    }

    // for clear
    if(key==="Delete"){
        document.querySelector(".clear").click();
        return;
    }


    // for power and trignometric fun
    if(key==="^"){
        document.addEventListener("keyup",(event)=>{
            if(event.key==="2")
                return insertValue("**2");
               if(event.key==="3")
                return insertValue("**3");
        },{once:true});
        return;
    }
    // shortcut key for trignometric function
    let shortcut={
        "s":"sin(",
        "c":"cos(",
        "t":"tan(",
        "l":"log10(",
        "n":"ln("
    }

    if(shortcut[key])
    {
        return insertValue(shortcut[key]);
    }

    if(key.toLowerCase()==="p")
        return insertValue("pi");
    if(key.toLowerCase()==="e")
        return insertValue("e");

    e.preventDefault();  // stop the default behavior
});