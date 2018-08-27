class GameData {

	// 行列数量
	public static field_rows:number;
	public static field_columns:number;

	// 地雷数量
	public static mines_number:number;
	// 地雷格子宽度(宽高相等)
	public static tile_width:number;

	// 地雷数组[[[0,0],[0,0]],[[0,0],[0,0]]],行列二维数组，元素也是一个数组，包含两个值，一个数值(0-9)，一个状态(0关,1开,2标记)
	public static mine_field:Array<any>;

	// 标记地雷数
	public static sign_number:number;

	// 排除的非地雷数量
	public static clear_number:number;

	// 游戏结束标志
	public static is_GameOver:boolean;

	public static initData(area_width:number, rows:number, columns:number, mines_number:number): any {
		GameData.field_rows = rows;
		GameData.field_columns = columns;
		GameData.mines_number = mines_number;
		GameData.tile_width = Math.round(area_width/GameData.field_columns*100)/100;

		GameData.sign_number = 0;
		GameData.clear_number = 0;
		GameData.is_GameOver = false;


		// 生成初始数组
		GameData.mine_field = new Array();
		for(let i=0; i< GameData.field_rows; i++){
			GameData.mine_field[i] = new Array();
			for(let j = 0; j<GameData.field_columns; j++){
				GameData.mine_field[i].push([0,0]);
			}
		}
		// console.log(GameData.mine_field);

		// 随机生成地雷
		let place_mines:number = 0;
		let random_row,random_col:number;
		while(place_mines<GameData.mines_number){
			random_row = Math.floor(Math.random()* GameData.field_rows);
			random_col = Math.floor(Math.random()* GameData.field_columns);
			if(GameData.mine_field[random_row][random_col][0] === 0){
				GameData.mine_field[random_row][random_col] = [9,0];
				place_mines++;
			}
		}

		// console.log(GameData.mine_field);

		// 随机根据地雷数据生成周围提示
		for(let i=0; i<GameData.field_rows;i++){
			for(let j=0; j<GameData.field_columns;j++){
				if(GameData.mine_field[i][j][0] === 9){
					for(let h=-1;h<=1;h++){
						for(let w=-1;w<=1;w++){
							if(GameData.tileValue(i+h,j+w)!==9 && GameData.tileValue(i+h,j+w)!==-1){
								GameData.mine_field[i+h][j+w][0] += 1;
							}
						}
					}
				}
			}
		}
	}

	public static tileValue(row:number,column:number):number {
		if(GameData.mine_field[row] === undefined||GameData.mine_field[column] === undefined){
			return -1;
		}else{
			return GameData.mine_field[row][column][0];
		}
	}

	// 判断是否已经标记
	public static checkSign(row:number, column:number):boolean {
		if(GameData.mine_field[row][column][1] === 0){
			return false;
		}
		return true;
	}

	// 判断是否成功
	public static isWin():boolean {
		if(GameData.clear_number === (GameData.field_rows * GameData.field_columns - GameData.mines_number)){
			return true;
		}
		let num:number = 0;
		let open:number = 0;
		for(let i=0; i< GameData.mine_field.length; i++){
			let sign = GameData.mine_field[i];
			for(let j=0; j<sign.length;j++){
				let tile = sign[j];
				if(tile[0] === 9 && tile[1] === 2){
					num +=1;
				}else if(tile[0] !== 9 && tile[1] === 1){
					open += 1;
				}
			}
		}

		if(num === GameData.mines_number || open === (GameData.field_rows * GameData.field_columns - GameData.mines_number)){
			return true;
		}else {
			return false;
		}
	}
}