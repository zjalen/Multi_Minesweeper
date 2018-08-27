var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SingleSence = (function (_super) {
    __extends(SingleSence, _super);
    function SingleSence() {
        var _this = _super.call(this) || this;
        // 皮肤加载完毕并显示后回调
        // this.addEventListener(egret.Event.COMPLETE, this.onCreationComplement, this);
        // UI子控件创建完毕后回调
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onCreationComplement, _this);
        _this.skinName = "resource/skins/SingleSence.exml";
        return _this;
    }
    SingleSence.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SingleSence.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    SingleSence.prototype.onCreationComplement = function () {
        if (this.mine_area) {
            this.init();
        }
    };
    SingleSence.prototype.init = function () {
        this.mine_area.width = this.mine_area.height = this.stage.stageWidth;
        // 初始化游戏数据，容器宽度，行，列， 地雷数
        GameData.initData(this.mine_area.width - 62, 10, 10, 20);
        this.createButtonBar();
        this.startGame();
    };
    SingleSence.prototype.startGame = function () {
        this.mine_area.removeChildren();
        this.createMap();
        this.lb_state.text = "正在排雷中";
        this.lb_mines_number.text = "" + GameData.mines_number;
        this.lb_sign_number.text = "0";
    };
    SingleSence.prototype.createMap = function () {
        var tile;
        for (var i = 0; i < GameData.field_rows; i++) {
            for (var j = 0; j < GameData.field_columns; j++) {
                tile = new Tile();
                tile.name = "tile_" + i + "_" + j;
                tile.x = j * tile.width + 32;
                tile.y = i * tile.height + 32;
                tile.row = i;
                tile.column = j;
                tile.changeValue(GameData.mine_field[i][j][0]);
                this.mine_area.addChild(tile);
                tile.touchEnabled = true;
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
            }
        }
    };
    SingleSence.prototype.createButtonBar = function () {
        this.btn_group.width = this.mine_area.width;
        this.btn_sign = new mButton("标记地雷");
        this.btn_cancel_sign = new mButton("取消标记");
        this.btn_sign.currentState = this.btn_cancel_sign.currentState = "up";
        this.btn_sign.height = this.btn_cancel_sign.height = this.btn_group.height;
        this.btn_sign.width = this.btn_cancel_sign.width = (this.btn_group.width - 120) / 2;
        this.btn_sign.y = this.btn_cancel_sign.y = 0;
        this.btn_sign.x = 40;
        this.btn_cancel_sign.x = this.btn_sign.width + 80;
        this.btn_group.addChild(this.btn_sign);
        this.btn_group.addChild(this.btn_cancel_sign);
        this.btn_sign.touchEnabled = this.btn_cancel_sign.touchEnabled = true;
        this.btn_sign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.btn_cancel_sign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    // 区块点击方法
    SingleSence.prototype.onTileTouch = function (event) {
        if (!GameData.is_GameOver) {
            var tile = event.currentTarget;
            var tile_value = tile.value;
            var row = tile.row;
            var column = tile.column;
            // console.log(`行:${row}_列:${column}_值:${val}`);
            if (this.btn_sign.currentState === "down") {
                if (tile.state === 0) {
                    this.btn_sign.currentState = "up";
                    tile.changeState(2);
                    this.btn_sign.label = "标记地雷";
                    this.lb_state.text = "正在排雷中";
                    GameData.mine_field[row][column][1] = 2;
                    GameData.sign_number += 1;
                    this.lb_mines_number.text = "" + (GameData.mines_number - GameData.sign_number);
                    this.lb_sign_number.text = "" + GameData.sign_number;
                    if (GameData.sign_number === GameData.mines_number) {
                        if (GameData.isWin()) {
                            GameData.is_GameOver = true;
                            this.lb_state.text = "恭喜你，清除完毕";
                            this.showGameOver();
                        }
                    }
                }
                return;
            }
            else if (this.btn_cancel_sign.currentState === "down") {
                if (tile.state === 2) {
                    this.btn_cancel_sign.currentState = "up";
                    tile.changeState(0);
                    this.btn_cancel_sign.label = "取消标记";
                    this.lb_state.text = "正在排雷中";
                    GameData.mine_field[row][column][1] = 0;
                    GameData.sign_number -= 1;
                    this.lb_mines_number.text = "" + (GameData.mines_number - GameData.sign_number);
                    this.lb_sign_number.text = "" + GameData.sign_number;
                    if (GameData.sign_number === GameData.mines_number) {
                        if (GameData.isWin()) {
                            GameData.is_GameOver = true;
                            this.lb_state.text = "恭喜你，清除完毕";
                            this.showGameOver();
                        }
                    }
                }
                return;
            }
            tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
            tile.touchEnabled = false;
            if (tile_value === 0) {
                this.floodFill(tile);
            }
            else if (tile_value < 9) {
                this.cleanTile(tile);
            }
            else if (tile_value === 9) {
                tile.boom();
                this.lb_state.text = "爆炸了，你输了";
                GameData.is_GameOver = true;
                this.showGameOver();
            }
        }
    };
    // 按钮点击方法
    SingleSence.prototype.onButtonClick = function (event) {
        var btn = event.currentTarget;
        if (GameData.is_GameOver) {
            if (btn === this.btn_restart) {
                this.mine_area.removeChild(this.btn_restart);
                this.init();
            }
            return;
        }
        if (btn === this.btn_sign) {
            if (this.btn_sign.currentState === "up") {
                this.btn_sign.currentState = "down";
                this.btn_sign.label = "正在标记";
                this.btn_cancel_sign.label = "取消标记";
                this.btn_cancel_sign.currentState = "up";
                this.lb_state.text = "正在标记地雷";
            }
            else {
                this.btn_sign.currentState = "up";
                this.btn_sign.label = "标记地雷";
            }
        }
        else if (btn === this.btn_cancel_sign) {
            if (this.btn_cancel_sign.currentState === "up") {
                this.btn_cancel_sign.currentState = "down";
                this.btn_cancel_sign.label = "正在取消";
                this.btn_sign.label = "标记地雷";
                this.btn_sign.currentState = "up";
                this.lb_state.text = "正在取消标记";
            }
            else {
                this.btn_cancel_sign.currentState = "up";
                this.btn_cancel_sign.label = "取消标记";
            }
        }
    };
    // 递归打开安全区域
    SingleSence.prototype.floodFill = function (tile) {
        tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
        tile.touchEnabled = false;
        this.cleanTile(tile);
        var row = tile.row;
        var col = tile.column;
        GameData.mine_field[row][col][1] = 1;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && (i === 0 || j === 0)) {
                    var new_tile = this.mine_area.getChildByName("tile_" + (row + i) + "_" + (col + j));
                    if (new_tile) {
                        if (new_tile.state === 0) {
                            if (new_tile.value === 0) {
                                this.floodFill(new_tile);
                            }
                            else if (new_tile.state === 0) {
                                GameData.mine_field[row + i][col + j][1] = 1;
                                this.cleanTile(new_tile);
                            }
                        }
                    }
                }
            }
        }
    };
    // 展开安全区域，判断是否全部安全
    SingleSence.prototype.cleanTile = function (tile) {
        tile.changeState(1);
        GameData.clear_number += 1;
        if (GameData.isWin()) {
            GameData.is_GameOver = true;
            this.lb_state.text = "恭喜你，清除完毕";
            this.showGameOver();
            return;
        }
    };
    // 游戏结束展示地雷
    SingleSence.prototype.showGameOver = function () {
        for (var i = 0; i < GameData.field_rows; i++) {
            for (var j = 0; j < GameData.field_columns; j++) {
                var tile = this.mine_area.getChildByName("tile_" + i + "_" + j);
                tile.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileTouch, this);
                tile.touchEnabled = false;
                if (tile.state === 0) {
                    if (tile.value === 9) {
                        tile.changeState(1);
                    }
                }
            }
        }
        this.btn_restart = new mButton("再来一局");
        this.btn_restart.width = 200;
        this.btn_restart.height = 100;
        this.btn_restart.alpha = 0.8;
        this.btn_restart.currentState = "up";
        this.btn_restart.y = (this.mine_area.height - this.btn_restart.height) / 2;
        this.btn_restart.x = (this.mine_area.width - this.btn_restart.width) / 2;
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.btn_restart.labelDisplay.textColor = 0xff0000;
        this.mine_area.addChild(this.btn_restart);
    };
    return SingleSence;
}(eui.Component));
__reflect(SingleSence.prototype, "SingleSence", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SingleSence.js.map