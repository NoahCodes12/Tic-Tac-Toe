let EnemyEnabled=false;
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

function WinComparer(field,Score) {
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
            field.splice(0,8,0,0,0,0,0,0,0,0,0);
            document.querySelectorAll('button').forEach(function(button){
                button.innerHTML = "";
           });
            return field;
        }
    }

    return false; // No winner yet
}

function TotalScore(Player, Score) {
    let HeightWidthSetter = 9;
    let Side = document.getElementById("WinBoard" + Player);
    let Star = document.createElement('img');
    Star.src = 'Star.gif';
    let Stars = Side.getElementsByTagName('img');
    let StarNumber = Stars.length;

 
    for (let i = 0; i < StarNumber; i++) {
        HeightWidthSetter -= 0.6;
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
        
        WinComparer(field,Score);
        Player=2;
        
    
    } else {
        if (Player===2) {
        button.innerHTML = "<span class='O_Change' style='color: red'>O</span>";
        ComputerControlledPlayer(EnemyEnabled,field_position)
        field[field_position] = 2;
        WinComparer(field,Score); 
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
function ComputerControlledPlayer(EnemyEnabled, field_position,field) {
    if (EnemyEnabled==true){
        
    }else{
        return;
    }
}
