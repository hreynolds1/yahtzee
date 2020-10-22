function getcount(array,value) {
    count = 0
    array.forEach((v) => (v === value && count++));
    return count;
}
function removeElement(elementId) {//vibe check
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
function consecutive(array){
    consec=true
    for (x in array){
        if (!(x==0 || array[x]==array[x-1]+1)){
            consec=false
        }
    }
    return consec
}
function makeunique(array){
    unique=[]
    for (x in array){
        if (unique.includes(array[x])){
            array.splice(x,1)
        } else {
            unique.push(array[x])
        }
    }
    return array
}
function distinct(array){
    unique=[]
    for (x in array){
        if (!(unique.includes(array[x]))){
            unique.push(array[x])
        }
    }
    return unique.length;
}
function sum(array){
    total=0
    for (x in array){
        total+=array[x]
    }
    return total;
}
function randint(low, high) {
    return Math.round((Math.random() * (high-low))+low)
}
function choice(li) {
    return li[randint(0,li.length-1)];
}
function rolldie(die){
    roll=randint(1,6)
    die.src=""+roll+".png"
    die.hidden=false
    die.numval=roll
    die.active=true
    die.classList.remove("inactive")
}
var rollcount=0;
var pointcount=0;
function rolldice(){
    for (i in dice){if (dice[i].active){rolldie(dice[i])}}
    rollcount++
    if (rollcount==3){
        rollcount=0
        document.getElementById("roll").hidden=true
    }
    //console.log("Rolled "+dice[i])
}
function toggledie(die){
    die.active=!(die.active)
    if (die.active){die.classList.remove("inactive")} else {die.classList.add("inactive")}
}
function startgame(){
    document.getElementById("startgame").hidden=true
    rolldice()
    document.getElementById("scoresheet1").hidden=false
    document.getElementById("scoresheet2").hidden=false
    document.getElementById("roll").hidden=false
    document.getElementById("explanation").hidden=false
}
function points(ele){
    pointscore=getscore(ele.id)
    ele.innerHTML=pointscore
    if (pointscore>0){ele.classList.add("green")}else{ele.classList.add("red")}
}
function resetele(ele){
    ele.classList.remove("green")
    ele.classList.remove("red")
    ele.innerHTML="Fill"
}
function getscore(key){
    dicevals=[die1.numval,die2.numval,die3.numval,die4.numval,die5.numval]
    switch (key){
        case "aces":
            score=getcount(dicevals,1)
            break;
        case "twos":
            score=2*getcount(dicevals,2)
            break;
        case "threes":
            score=3*getcount(dicevals,3)
            break;
        case "fours":
            score=4*getcount(dicevals,4)
            break;
        case "fives":
            score=5*getcount(dicevals,5)
            break;
        case "sixes":
            score=6*getcount(dicevals,6)
            break;
        case "3kind":
            score=0
            for (x in dicevals){
                if (getcount(dicevals,dicevals[x])>=3){
                    score=sum(dicevals)
                }
            }
            break;
        case "4kind":
            score=0
            for (x in dicevals){
                if (getcount(dicevals,dicevals[x])>=4){
                    score=sum(dicevals)
                }
            }
            break;
        case "fullhouse":
            if (distinct(dicevals)<=2){score=25}else{score=0}
            break;
        case "smstraight":
            sorted=makeunique(dicevals.sort())
            while (sorted.length<6){
                sorted.push(0)
            }
            if (consecutive(sorted.slice(0,3)) || consecutive(sorted.slice(1,4)) || consecutive(sorted.slice(2,5))){score=30}else{score=0}
            break;
        case "lgstraight":
            sorted=makeunique(dicevals.sort())
            while (sorted.length<6){
                sorted.push(0)
            }
            if (consecutive(sorted.slice(0,4)) || consecutive(sorted.slice(1,5))){score=40}else{score=0}
            break;
        case "yahtzee":
            if (distinct(dicevals)==1){score=50}else{score=0}
            break;
        case "chance":
            score=sum(dicevals)
            break;
        case "yahbonus":
            if (distinct(dicevals)==1 && document.getElementById("yahtzeeval").innerHTML==50){score=100}else{throw "nah"}
            break;
    }
    return score;
}
uppersubtotal=0
uppertotal=0
lowertotal=0
grandtotal=0
function fill(ele){
    parentele=document.getElementById(ele.id+"val")
    
    pointcount+=1
    if (["aces","twos","threes","fours","fives","sixes"].indexOf(ele.id)>-1){
        parentele.innerHTML=getscore(ele.id)
        uppersubtotal+=getscore(ele.id)
        document.getElementById("uppersubtotal").innerHTML=uppersubtotal
        if (uppersubtotal>63){document.getElementById("bonus1val").innerHTML=35}else{document.getElementById("bonus1val").innerHTML=0}
        document.getElementById("uppertotal1").innerHTML=uppersubtotal+parseInt(document.getElementById("bonus1val").innerHTML)
        document.getElementById("uppertotal2").innerHTML=uppersubtotal+parseInt(document.getElementById("bonus1val").innerHTML)
    } else {
        parentele.innerHTML=getscore(ele.id)
        lowertotal+=getscore(ele.id)
        document.getElementById("lowertotal").innerHTML=lowertotal
    }
    grandtotal=lowertotal+uppersubtotal+parseInt(document.getElementById("bonus1val").innerHTML)
    document.getElementById("grandtotal").innerHTML=grandtotal
    document.getElementById("roll").hidden=false
    if (pointcount==13){
        removeElement("die1")
        removeElement("die2")
        removeElement("die3")
        removeElement("die4")
        removeElement("die5")
        document.getElementById("roll").hidden=true
        document.getElementById("explanation").hidden=true
        document.getElementById("score").innerHTML="Score: "+grandtotal
    }
    for (i in dice){rolldie(dice[i])}
}
die1=document.getElementById("die1")
die2=document.getElementById("die2")
die3=document.getElementById("die3")
die4=document.getElementById("die4")
die5=document.getElementById("die5")
dice=[die1,die2,die3,die4,die5]
for (i in dice){
    dice[i].active=true
}
die1.onclick=function() {toggledie(die1)}
die2.onclick=function() {toggledie(die2)}
die3.onclick=function() {toggledie(die3)}
die4.onclick=function() {toggledie(die4)}
die5.onclick=function() {toggledie(die5)}
