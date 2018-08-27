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
var mButton = (function (_super) {
    __extends(mButton, _super);
    function mButton(text) {
        var _this = _super.call(this) || this;
        _this._label = "";
        _this.skinName = "resource/skins/mButtonSkin.exml";
        _this.addEventListener(egret.Event.COMPLETE, _this.onCreationComplement, _this);
        _this.label = text;
        return _this;
    }
    Object.defineProperty(mButton.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            if (this.labelDisplay) {
                this.labelDisplay.text = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    mButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.labelDisplay) {
            this.labelDisplay.text = this._label;
        }
    };
    mButton.prototype.onCreationComplement = function () {
        if (this.labelDisplay) {
            this.labelDisplay.text = this._label;
        }
    };
    return mButton;
}(eui.Component));
__reflect(mButton.prototype, "mButton");
//# sourceMappingURL=mButton.js.map