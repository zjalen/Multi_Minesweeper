class mButton extends eui.Component {

    public labelDisplay:eui.Label;
    private _label:string = "";
	public constructor(text:string){
        super();
		this.skinName = "resource/skins/mButtonSkin.exml";
        this.addEventListener(egret.Event.COMPLETE, this.onCreationComplement, this);
        this.label = text;
    }

    public get label():string{
        return this._label;
    }
    public set label(value:string){
        this._label = value;
        if(this.labelDisplay){
            this.labelDisplay.text = value;
        }
    }
    protected childrenCreated():void{
        super.childrenCreated();
        if(this.labelDisplay){
            this.labelDisplay.text = this._label;
        }
    }

    private onCreationComplement() {
        if(this.labelDisplay){
            this.labelDisplay.text = this._label;
        }
    }
}