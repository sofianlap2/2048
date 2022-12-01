var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    board = [
        [0, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            const tile = document.createElement('div')
            tile.id = r.toString() + '-' + c.toString()
            let num = board[r][c]
            updateTile(tile, num)
            document.getElementById('board').append(tile)
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', function(e) {
    if(e.code === 'ArrowLeft') {
        slideLeft()
        setTwo()
    }
    if(e.code === 'ArrowRight') {
        slideRight()
        setTwo()
    }
    if(e.code === 'ArrowUp') {
        slideUp()
        setTwo()
    }
    if(e.code === 'ArrowDown') {
        slideDown()
        setTwo()
    }
    document.getElementById("score").innerText = score;
})

function slideLeft() {
    for(let r = 0; r < rows; r++) {
        let row = board[r]
        row = slide(row)
        board[r] = row
        for(let c = 0; c < rows; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideRight() {
    for(let r = 0; r < rows; r++) {
        let row = board[r].reverse()
        row = slide(row)
        board[r] = row.reverse()
        for(let c = 0; c < rows; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideUp() {
    for(let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row = slide(row)
        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideDown() {
    for(let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row.reverse();
        row = slide(row);
        row.reverse();
        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slide(row) {
    row = filteredZero(row)
    for(let c = 0; c < row.length - 1; c++) {
        if(row[c] === row[c+1]) {
            row[c] = row[c] * 2
            row[c+1] = 0
            score += row[c]
        }
    }
    row = filteredZero(row)
    while(row.length < rows) {
        row.push(0)
    }
    return row
}

function filteredZero(row) {
    return row.filter(el => el !== 0)
}

function hasEmptyTiles() {
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(board[i][j] === 0) return true
        }
    }
    return false
}

function setTwo() {
    let state = false
    if(hasEmptyTiles()) {
        while(!state) {
            let randomR = Math.floor(Math.random() * 4)
            let randomC = Math.floor(Math.random() * 4)
            
            if(board[randomR][randomC] == 0) {
                board[randomR][randomC] = 2
                let tile = document.getElementById(randomR.toString() + '-' + randomC.toString())
                tile.innerText = "2";
                tile.classList.add("x2");
                state = true
            }
        }
    }
}