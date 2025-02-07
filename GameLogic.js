let EnemyEnabled=true;
let SoundState=0;
let Score = 0;
let Player = 1;
const field = 
[0,0,0,
 0,0,0,
 0,0,0
];
document.getElementById("SoundButton").addEventListener("click", MusicButtonChange(SoundState));
document.getElementById("Settings").addEventListener("click", SettingsPage);
document.getElementById("COM_Button1").addEventListener("click", ComputerControlledPlayer(EnemyEnabled,Player,field));
document.getElementById("COM_Button2").addEventListener("click", ComputerControlledPlayer(EnemyEnabled,Player,field));
function MusicButtonChange(SoundState) {
    if (SoundState==0) {
        document.getElementById("SoundButton").src
        SoundState=1;
    }else{
        if (SoundState==1) {

            SoundState=0
        }
    }
}

function winComparer(field) {
    // Winning conditions: indices for rows, columns, and diagonals
    const winningIndices = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    for (let Win of winningIndices) {
        const [a, b, c] = Win;

        // Check if all three positions are the same (1 or 2) and not 0
        if (field[a] !== 0 && field[a] === field[b] && field[b] === field[c]) {
            alert(`Player ${field[a]} you Win!`);
            TotalScore(Player);
            field.splice(0,9,0,0,0,0,0,0,0,0,0);
            document.querySelectorAll('button').forEach(function(button){
                button.innerHTML = "";
           });
            return field;
        }else{
            if (field.every(checkFieldFull)) {
                field.splice(0,9,0,0,0,0,0,0,0,0,0);
                document.querySelectorAll('button').forEach(function(button){
                    button.innerHTML = "";
               
                }); 
                return field;
            }
        }
    }

    return false; // No winner yet
}

function TotalScore(Player, Score) {
    let HeightWidthSetter = 9;
    let Side = document.getElementById("starArea" + Player);
    let Star = document.createElement('img');
    Star.src = 'Star.gif';
    let Stars = Side.getElementsByTagName('img');
    let StarNumber = Stars.length;

 
    for (let i = 0; i < StarNumber; i++) {
        HeightWidthSetter -= 0.6;
        if (HeightWidthSetter<=1.8) {
            HeightWidthSetter += 0.6;
        }
    }

    for (let i = 0; i < Stars.length; i++) {
        Stars[i].style.width = HeightWidthSetter + 'vw';
        Stars[i].style.height = HeightWidthSetter + 'vw';
    }

    Star.style.width = HeightWidthSetter + 'vw';
    Star.style.height = HeightWidthSetter + 'vw';
    Side.append(Star);

    return Score;
}
   
function ButtonClicked(button, field_position) {
    
    if (field[field_position] !== 0) {
        // Prevent overwriting an already selected button
        return;
    }
    if (Player===1) {
        field[field_position] = 1;
        button.innerHTML = "<span class='X_Change' style='color: blue'>X</span>";
        
        winComparer(field,Score);
        Player=2;
        
    
    } else {
        if (Player===2) {
        button.innerHTML = "<span class='O_Change' style='color: red'>O</span>";
        //ComputerControlledPlayer(EnemyEnabled,Player,field)
        field[field_position] = 2;
        winComparer(field,Score); 
        Player=1;  
        
        }
        
    }
}   

function SettingsPage() {
    document.getElementById("Game").style.display = "none";
    Sett=document.createElement("div");
    Sett.id = 'Setting_Menu';
}  

function RandomNumberGenerator(Seed) {
    let RandomNumber =Math.floor(Math.random()*Seed);
    return RandomNumber;
}

function ComputerControlledPlayer(EnemyEnabled, Player,field) {
    let occupiedFields = [];
    EnemyEnabled==true;
    if (EnemyEnabled==true){
        
        alert("Ich sehe nix");
        for (let i = 0; i < field.length; i++) { // Loop through the array
            if (field[i] === Player) { // Check if the value is 1
                occupiedFields.push(i);
                
                const remainingFields = field.filter(item => !occupiedFields.includes(item));
                if (remainingFields.length!=0) {
                    let placement=RandomNumberGenerator(remainingFields.length);
                    field[placement]=Player;
                    if (Player==1) {
                        placePlayer=document.getElementById("#But"+placement);
                        button.innerHTML = "<span class='X_Change' style='color: blue'>X</span>";
                        return EnemyEnabled;
                    } else {
                        if (Player==2) {
                            placePlayer=document.getElementById("#But"+placement);
                            placePlayer.innerHTML = "<span class='O_Change' style='color: red'>O</span>";
                            return EnemyEnabled;
                        }
                       
                    }
                }else{
                    return EnemyEnabled;
                }
                
            }
        }
        winComparer(field);
    }else{

        return;
    }
}

function checkFieldFull(check) {
    return check !==0;
}