class Tile extends egret.Bitmap {
	public value:number = 0;
	public state:number = 0;
	public row:number;
	public column:number;
	public constructor() {
		super();
		this.width=this.height=GameData.tile_width;
		this.texture=RES.getRes("m_default");
	}

	public changeState(state:number) {
		this.state = state;
		if(state === 0){
			this.texture=RES.getRes("m_default");
		}else if(state === 1){
			let val = this.value;
			if(val < 9){
				this.texture=RES.getRes(`m${val}`);
			}else {
				this.texture=RES.getRes(`m_mine`);
			}
		}else if( state === 2){
			this.texture=RES.getRes("m_flag");
		}
	}

	public changeValue(value:number) {
		this.value = value;
	}

	public boom() {
		this.state = 1;
		this.texture=RES.getRes(`m_boom`);
	}
}