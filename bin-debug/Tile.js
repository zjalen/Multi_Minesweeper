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
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        var _this = _super.call(this) || this;
        _this.value = 0;
        _this.state = 0;
        _this.width = _this.height = GameData.tile_width;
        _this.texture = RES.getRes("m_default");
        return _this;
    }
    Tile.prototype.changeState = function (state) {
        this.state = state;
        if (state === 0) {
            this.texture = RES.getRes("m_default");
        }
        else if (state === 1) {
            var val = this.value;
            if (val < 9) {
                this.texture = RES.getRes("m" + val);
            }
            else {
                this.texture = RES.getRes("m_mine");
            }
        }
        else if (state === 2) {
            this.texture = RES.getRes("m_flag");
        }
    };
    Tile.prototype.changeValue = function (value) {
        this.value = value;
    };
    Tile.prototype.boom = function () {
        this.state = 1;
        this.texture = RES.getRes("m_boom");
    };
    return Tile;
}(egret.Bitmap));
__reflect(Tile.prototype, "Tile");
//# sourceMappingURL=Tile.js.map