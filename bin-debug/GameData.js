var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    GameData.initData = function (area_width, rows, columns, mines_number) {
        GameData.field_rows = rows;
        GameData.field_columns = columns;
        GameData.mines_number = mines_number;
        GameData.tile_width = Math.round(area_width / GameData.field_columns * 100) / 100;
        GameData.sign_number = 0;
        GameData.clear_number = 0;
        GameData.is_GameOver = false;
        // 生成初始数组
        GameData.mine_field = new Array();
        for (var i = 0; i < GameData.field_rows; i++) {
            GameData.mine_field[i] = new Array();
            for (var j = 0; j < GameData.field_columns; j++) {
                GameData.mine_field[i].push([0, 0]);
            }
        }
        // console.log(GameData.mine_field);
        // 随机生成地雷
        var place_mines = 0;
        var random_row, random_col;
        while (place_mines < GameData.mines_number) {
            random_row = Math.floor(Math.random() * GameData.field_rows);
            random_col = Math.floor(Math.random() * GameData.field_columns);
            if (GameData.mine_field[random_row][random_col][0] === 0) {
                GameData.mine_field[random_row][random_col] = [9, 0];
                place_mines++;
            }
        }
        // console.log(GameData.mine_field);
        // 随机根据地雷数据生成周围提示
        for (var i = 0; i < GameData.field_rows; i++) {
            for (var j = 0; j < GameData.field_columns; j++) {
                if (GameData.mine_field[i][j][0] === 9) {
                    for (var h = -1; h <= 1; h++) {
                        for (var w = -1; w <= 1; w++) {
                            if (GameData.tileValue(i + h, j + w) !== 9 && GameData.tileValue(i + h, j + w) !== -1) {
                                GameData.mine_field[i + h][j + w][0] += 1;
                            }
                        }
                    }
                }
            }
        }
    };
    GameData.tileValue = function (row, column) {
        if (GameData.mine_field[row] === undefined || GameData.mine_field[column] === undefined) {
            return -1;
        }
        else {
            return GameData.mine_field[row][column][0];
        }
    };
    // 判断是否已经标记
    GameData.checkSign = function (row, column) {
        if (GameData.mine_field[row][column][1] === 0) {
            return false;
        }
        return true;
    };
    // 判断是否成功
    GameData.isWin = function () {
        if (GameData.clear_number === (GameData.field_rows * GameData.field_columns - GameData.mines_number)) {
            return true;
        }
        var num = 0;
        var open = 0;
        for (var i = 0; i < GameData.mine_field.length; i++) {
            var sign = GameData.mine_field[i];
            for (var j = 0; j < sign.length; j++) {
                var tile = sign[j];
                if (tile[0] === 9 && tile[1] === 2) {
                    num += 1;
                }
                else if (tile[0] !== 9 && tile[1] === 1) {
                    open += 1;
                }
            }
        }
        if (num === GameData.mines_number || open === (GameData.field_rows * GameData.field_columns - GameData.mines_number)) {
            return true;
        }
        else {
            return false;
        }
    };
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map