var playerOne = true;
var board_elems = [];
var num_rows = 3;
var num_cols = num_rows;
var winLength = num_rows;

$("document").ready(function(){
    var width = 100/num_cols;
    var height = 100/num_rows;
    var rx = 5;
    var ry = rx;

    var redtile = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    redtile.setAttribute('rx', rx);
    redtile.setAttribute('ry', ry);
    redtile.setAttribute('width', width + "%");
    redtile.setAttribute('height', height + "%");

    for (var r = 0; r < num_rows; r++)
    {
        board_elems.push([]);
        for (var c = 0; c < num_cols; c++)
        {
            board_elems[r].push(redtile.cloneNode(true));
            board_elems[r][c].setAttribute('id', 'tile' + (r*num_cols + c) );
            board_elems[r][c].setAttribute('class', 'none tile');
            board_elems[r][c].setAttribute('stroke', 'black');
            board_elems[r][c].setAttribute('x', c*width + "%");
            board_elems[r][c].setAttribute('y', r*height + "%");
            board_elems[r][c].setAttribute('onclick', 'tileListener(this)');
            $('#board').append(board_elems[r][c]);
        }
    }
});

function tileListener(tile)
{
    tileClick(tile)
    checkWin()
}
function tileClick(tile)
{
    var isPlayerOne = tile.classList.contains("playerone")
    var isPlayerTwo = tile.classList.contains("playertwo")
    var isNone = tile.classList.contains("none")
    
    if ((isPlayerOne && playerOne) || (isPlayerTwo && !playerOne))
    {
        alert("Tile already selected by you.")
    }
    else if  ((isPlayerTwo && playerOne) || (isPlayerOne && !playerOne))
    {
        alert("Tile already selected by opponent.")
    }
    else if (isNone)
    {
        tile.classList.toggle("none")
        if (playerOne)
        {
            tile.classList.toggle("playerone")
        }
        else
        {
            tile.classList.toggle("playertwo")
        }
        playerOne = !playerOne;
    }

    //checkwin
}
function checkWin()
{
    //temp variable
    var player = [0, 0];
    var num_moves = 0;
    
    //checks rows
    for (var r= 0; r<num_rows; r++)
    {
        player = [0, 0];
        var row = '';
        for (var c= 0; c<num_cols; c++)
        {
            if (board_elems[r][c].classList.contains('playerone'))
            {
                player[1] = 0;
                player[0]+= 1;
                num_moves += 1;
                row += 'X'
            }
            if (board_elems[r][c].classList.contains('playertwo'))
            {
                player[0] = 0;
                player[1]+= 1;
                num_moves += 1;
                row += 'O'
            }
            if (board_elems[r][c].classList.contains('none'))
            {
                player[0] = 0;
                player[1] = 0;
                row += ' '
            }
            if (r != num_rows)
            {
                row += '|'
            }
            if (player[0] >= winLength || player[1] >= winLength)
            {
                break;
            }
        }
        console.log(row)
        if (player[0] >= winLength || player[1] >= winLength)
        {
            console.log('\n')
            break;
        }
    }
    // check columns if  necessary
    if (num_moves < num_rows*num_cols && player[0] < winLength && player[1] < winLength)
    {
        player = [0, 0];
        for (var c= 0; c<num_cols; c++)
        {
            for (var r= 0; r<num_rows; r++)
            {
                if (board_elems[r][c].classList.contains('playerone'))
                {
                    player[1] = 0;
                    player[0] += 1;
                }
                if (board_elems[r][c].classList.contains('playertwo'))
                {
                    player[0] = 0;
                    player[1] += 1;
                }
                if (board_elems[r][c].classList.contains('none'))
                {
                    player[0] = 0;
                    player[1] = 0;
                }
                if (player[0] >= winLength || player[1] >= winLength)
                {
                    break;
                }
            }
            if (player[0] >= winLength || player[1] >= winLength)
            {
                break;
            }
        }
    }
    // Output result
    if (player[0] >= winLength)
    {
        alert("Player One Wins")
        console.log("Player One Wins - (" + player[0] + ", " + player[1] + ")")
        return true;
    }
    else if (player[1] >= winLength)
    {
        alert("Player Two Wins")
        console.log("Player Two Wins - (" + player[0] + ", " + player[1] + ")")
        return true;
    }
    else if (num_moves >= num_rows*num_cols)
    {
        console.log("Tie - (" + player[0] + ", " + player[1] + ")")
        return true;
    }
    else
    {
        console.log("Game not over - (" + player[0] + ", " + player[1] + ")")
    }
}

function reset()
{

}