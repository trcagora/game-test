////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	var gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.width = w;
	gameCanvas.height = h;
	
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, instructionContainer, resultContainer, moveContainer, confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;

$.players = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	buttonTypeContainer = new createjs.Container();
	buttonPlayerContainer = new createjs.Container();
	buttonLocalContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	customContainer = new createjs.Container();
	playersContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	statusContainer = new createjs.Container();
	boardContainer = new createjs.Container();
	boardDesignContainer = new createjs.Container();
	boardIconContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	confirmContainer = new createjs.Container();
	
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	bgP = new createjs.Bitmap(loader.getResult('backgroundP'));
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	logoP = new createjs.Bitmap(loader.getResult('logoP'));

	buttonClassic = new createjs.Bitmap(loader.getResult('buttonClassic'));
	centerReg(buttonClassic);

	buttonCustom = new createjs.Bitmap(loader.getResult('buttonCustom'));
	centerReg(buttonCustom);

	buttonOnePlayer = new createjs.Bitmap(loader.getResult('buttonOnePlayer'));
	centerReg(buttonOnePlayer);

	buttonTwoPlayer = new createjs.Bitmap(loader.getResult('buttonTwoPlayer'));
	centerReg(buttonTwoPlayer);

	buttonLocal = new createjs.Bitmap(loader.getResult('buttonLocal'));
	centerReg(buttonLocal);

	buttonOnline = new createjs.Bitmap(loader.getResult('buttonOnline'));
	centerReg(buttonOnline);

	buttonStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonStart);

	//custom
	itemCustom = new createjs.Bitmap(loader.getResult('itemPop'));
	itemCustomP = new createjs.Bitmap(loader.getResult('itemPopP'));

	customTitleTxt = new createjs.Text();
	customTitleTxt.font = "60px bpreplaybold";
	customTitleTxt.color = '#fff';
	customTitleTxt.textAlign = "center";
	customTitleTxt.textBaseline='alphabetic';
	customTitleTxt.text = textDisplay.customTitle;

	sizeTxt = new createjs.Text();
	sizeTxt.font = "35px bpreplaybold";
	sizeTxt.color = '#7e5217';
	sizeTxt.textAlign = "center";
	sizeTxt.textBaseline='alphabetic';
	sizeTxt.text = textDisplay.share;

	itemNumberSize = new createjs.Bitmap(loader.getResult('itemNumber'));
	centerReg(itemNumberSize);

	buttonSizeL = new createjs.Bitmap(loader.getResult('buttonMinus'));
	centerReg(buttonSizeL);
	buttonSizeR = new createjs.Bitmap(loader.getResult('buttonPlus'));
	centerReg(buttonSizeR);

	buttonCustomStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonCustomStart);

	customContainer.addChild(itemCustom, itemCustomP, customTitleTxt, buttonCustomStart, itemNumberSize, buttonSizeL, buttonSizeR, sizeTxt);

	//players
	vsTxt = new createjs.Text();
	vsTxt.font = "80px bpreplaybold";
	vsTxt.color = '#fff';
	vsTxt.textAlign = "center";
	vsTxt.textBaseline='alphabetic';
	vsTxt.text = textDisplay.vs;

	for(var n=0; n<2; n++){
		$.players['playerContainer'+ n] = new createjs.Container();

		$.players['playerBg'+ n] = new createjs.Bitmap(loader.getResult('itemPlayer'));
		centerReg($.players['playerBg'+ n]);

		$.players['player'+ n] = new createjs.Text();
		$.players['player'+ n].font = "18px bpreplaybold";
		$.players['player'+ n].color = '#fff';
		$.players['player'+ n].textAlign = "center";
		$.players['player'+ n].textBaseline='alphabetic';
		$.players['player'+ n].text = textDisplay.player1;
		$.players['player'+ n].x = 0;
		$.players['player'+ n].y = 65;

		$.players['playerIconContainer'+ n] = new createjs.Container();

		$.players['playerContainer'+ n].addChild($.players['playerBg'+ n], $.players['player'+ n], $.players['playerIconContainer'+ n]);
		playersContainer.addChild($.players['playerContainer'+ n]);
	}

	buttonPlayersStart = new createjs.Bitmap(loader.getResult('buttonStart'));
	centerReg(buttonPlayersStart);

	buttonPlayersIcon = new createjs.Bitmap(loader.getResult('buttonTheme'));
	centerReg(buttonPlayersIcon);

	buttonPlayersSwitch = new createjs.Bitmap(loader.getResult('buttonSwitch'));
	centerReg(buttonPlayersSwitch);

	playersContainer.addChild(vsTxt, buttonPlayersStart, buttonPlayersIcon, buttonPlayersSwitch);
	
	//game
	itemStatus = new createjs.Shape();

	statusTxt = new createjs.Text();
	statusTxt.font = "28px bpreplaybold";
	statusTxt.color = '#000';
	statusTxt.textAlign = "center";
	statusTxt.textBaseline='alphabetic';
	statusTxt.y = 11;

	statusContainer.addChild(itemStatus, statusTxt);

	for(var n=0; n<2; n++){
		$.players['gamePlayerContainer'+ n] = new createjs.Container();

		$.players['gamePlayerBg'+ n] = new createjs.Bitmap(loader.getResult('itemGamePlayer'));
		centerReg($.players['gamePlayerBg'+ n]);

		$.players['gamePlayer'+ n] = new createjs.Text();
		$.players['gamePlayer'+ n].font = "18px bpreplaybold";
		$.players['gamePlayer'+ n].color = '#fff';
		$.players['gamePlayer'+ n].textAlign = "center";
		$.players['gamePlayer'+ n].textBaseline='alphabetic';
		$.players['gamePlayer'+ n].text = textDisplay.player1;
		$.players['gamePlayer'+ n].y += 78;

		$.players['gameTimer'+ n] = new createjs.Text();
		$.players['gameTimer'+ n].font = "20px bpreplaybold";
		$.players['gameTimer'+ n].color = '#fff';
		$.players['gameTimer'+ n].textAlign = "center";
		$.players['gameTimer'+ n].textBaseline='alphabetic';
		$.players['gameTimer'+ n].text = textDisplay.player1;
		$.players['gameTimer'+ n].y += 53;

		$.players['gamePlayerWin'+ n] = new createjs.Text();
		$.players['gamePlayerWin'+ n].font = "23px bpreplaybold";
		$.players['gamePlayerWin'+ n].color = '#E8B679';
		$.players['gamePlayerWin'+ n].textAlign = "left";
		$.players['gamePlayerWin'+ n].textBaseline='alphabetic';
		$.players['gamePlayerWin'+ n].text = 0;
		$.players['gamePlayerWin'+ n].y += 5;

		$.players['gameTurn'+ n] = new createjs.Text();
		$.players['gameTurn'+ n].font = "20px bpreplaybold";
		$.players['gameTurn'+ n].color = '#fff';
		$.players['gameTurn'+ n].textAlign = "center";
		$.players['gameTurn'+ n].textBaseline='alphabetic';
		$.players['gameTurn'+ n].text = 0;
		$.players['gameTurn'+ n].y += 130;

		$.players['gameIconContainer'+ n] = new createjs.Container();

		$.players['gamePlayerContainer'+ n].addChild($.players['gamePlayerBg'+ n], $.players['gameIconContainer'+ n], $.players['gamePlayer'+ n], $.players['gameTimer'+ n], $.players['gamePlayerWin'+ n], $.players['gameTurn'+ n]);
		gameContainer.addChild($.players['gamePlayerContainer'+ n]);
	}

	boardStroke = new createjs.Shape();
	
	//result
	itemResult = new createjs.Bitmap(loader.getResult('itemPop'));
	itemResultP = new createjs.Bitmap(loader.getResult('itemPopP'));
	
	buttonContinue = new createjs.Bitmap(loader.getResult('buttonContinue'));
	centerReg(buttonContinue);
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "25px bpreplaybold";
	resultShareTxt.color = '#fff';
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.text = textDisplay.share;
	
	resultTitleTxt = new createjs.Text();
	resultTitleTxt.font = "60px bpreplaybold";
	resultTitleTxt.color = '#fff';
	resultTitleTxt.textAlign = "center";
	resultTitleTxt.textBaseline='alphabetic';
	resultTitleTxt.text = textDisplay.resultTitle;
	
	resultDescTxt = new createjs.Text();
	resultDescTxt.font = "45px bpreplaybold";
	resultDescTxt.lineHeight = 35;
	resultDescTxt.color = '#000';
	resultDescTxt.textAlign = "center";
	resultDescTxt.textBaseline='alphabetic';
	resultDescTxt.text = '';
	
	
	buttonFacebook = new createjs.Bitmap(loader.getResult('buttonFacebook'));
	buttonTwitter = new createjs.Bitmap(loader.getResult('buttonTwitter'));
	buttonWhatsapp = new createjs.Bitmap(loader.getResult('buttonWhatsapp'));
	centerReg(buttonFacebook);
	createHitarea(buttonFacebook);
	centerReg(buttonTwitter);
	createHitarea(buttonTwitter);
	centerReg(buttonWhatsapp);
	createHitarea(buttonWhatsapp);
	
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemPop'));
	itemExitP = new createjs.Bitmap(loader.getResult('itemPopP'));
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	
	popTitleTxt = new createjs.Text();
	popTitleTxt.font = "60px bpreplaybold";
	popTitleTxt.color = "#fff";
	popTitleTxt.textAlign = "center";
	popTitleTxt.textBaseline='alphabetic';
	popTitleTxt.text = textDisplay.exitTitle;
	
	popDescTxt = new createjs.Text();
	popDescTxt.font = "40px bpreplaybold";
	popDescTxt.lineHeight = 50;
	popDescTxt.color = "#000";
	popDescTxt.textAlign = "center";
	popDescTxt.textBaseline='alphabetic';
	popDescTxt.text = textDisplay.exitMessage;
	
	confirmContainer.addChild(itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
	confirmContainer.visible = false;

	//room
	roomContainer = new createjs.Container();
	nameContainer = new createjs.Container();

	gameLogsTxt = new createjs.Text();
	gameLogsTxt.font = "20px bpreplaybold";
	gameLogsTxt.color = "#ccc";
	gameLogsTxt.textAlign = "center";
	gameLogsTxt.textBaseline='alphabetic';
	gameLogsTxt.text = '';
	
	if(guide){
		guideline = new createjs.Shape();	
		guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
	}
	
	buttonTypeContainer.addChild(buttonClassic, buttonCustom);
	buttonPlayerContainer.addChild(buttonOnePlayer, buttonTwoPlayer);
	buttonLocalContainer.addChild(buttonLocal, buttonOnline);
	mainContainer.addChild(logo, logoP, buttonTypeContainer, buttonPlayerContainer, buttonLocalContainer, buttonStart);
	boardContainer.addChild(boardDesignContainer, boardIconContainer, boardStroke, statusContainer);
	gameContainer.addChild(boardContainer);
	resultContainer.addChild(itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt);
	
	if(shareEnable){
		resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
	}
	
	canvasContainer.addChild(bg, bgP, mainContainer, nameContainer, roomContainer, customContainer, playersContainer, gameContainer, gameLogsTxt, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
	stage.addChild(canvasContainer);
	
	changeViewport(viewport.isLandscape);
	resizeGameFunc();
}

function changeViewport(isLandscape){
	if(isLandscape){
		//landscape
		stageW=landscapeSize.w;
		stageH=landscapeSize.h;
		contentW = landscapeSize.cW;
		contentH = landscapeSize.cH;
	}else{
		//portrait
		stageW=portraitSize.w;
		stageH=portraitSize.h;
		contentW = portraitSize.cW;
		contentH = portraitSize.cH;
	}
	
	gameCanvas.width = stageW;
	gameCanvas.height = stageH;
	
	canvasW=stageW;
	canvasH=stageH;
	
	changeCanvasViewport();
}

function changeCanvasViewport(){
	if(canvasContainer!=undefined){
		boardContainer.x = canvasW/2;
		boardContainer.y = canvasH/2;

		if(viewport.isLandscape){
			bg.visible = true;
			bgP.visible = false;

			logo.visible = true;
			logoP.visible = false;

			if(customSettings.enable){
				buttonClassic.x = (canvasW/2) - 140;
				buttonClassic.y = canvasH/100 * 75;

				buttonCustom.x = (canvasW/2) + 140;
				buttonCustom.y = canvasH/100 * 75;
				buttonCustom.visible = true;
			}else{
				buttonClassic.x = canvasW/2;
				buttonClassic.y = canvasH/100 * 75;
				buttonCustom.visible = false;
			}

			buttonOnePlayer.x = canvasW/2 - 140;
			buttonOnePlayer.y = canvasH/100 * 75;

			buttonTwoPlayer.x = canvasW/2 + 140;
			buttonTwoPlayer.y = canvasH/100 * 75;

			buttonLocal.x = canvasW/2 - 140;
			buttonLocal.y = canvasH/100 * 75;

			buttonOnline.x = canvasW/2 + 140;
			buttonOnline.y = canvasH/100 * 75;

			buttonStart.x = canvasW/2;
			buttonStart.y = canvasH/100 * 75;

			//custom
			itemCustom.visible = true;
			itemCustomP.visible = false;

			customTitleTxt.x = canvasW/2;
			customTitleTxt.y = canvasH/100 * 37;

			buttonCustomStart.x = canvasW/2;
			buttonCustomStart.y = canvasH/100 * 68;
			
			buttonSizeL.x = canvasW/2 - 200;
			buttonSizeR.x = canvasW/2 + 200;
			itemNumberSize.x = canvasW/2;
			sizeTxt.x = canvasW/2;
			itemNumberSize.y = buttonSizeL.y = buttonSizeR.y = canvasH/100 * 50;
			sizeTxt.y = itemNumberSize.y + 15;

			//players
			vsTxt.x = canvasW/2;
			vsTxt.y = canvasH/2;

			$.players['playerContainer'+ 0].x = canvasW/2 - 250;
			$.players['playerContainer'+ 1].x = canvasW/2 + 250;
			$.players['playerContainer'+ 0].y = $.players['playerContainer'+ 1].y = canvasH/2;

			buttonPlayersIcon.x = canvasW/2 - 50;
			buttonPlayersIcon.y = canvasH/100 * 60;

			buttonPlayersSwitch.x = canvasW/2 + 50;
			buttonPlayersSwitch.y = canvasH/100 * 60;

			buttonPlayersStart.x = canvasW/2;
			buttonPlayersStart.y = canvasH/100 * 75;

			//game
			$.players['gamePlayerContainer'+ 0].x = canvasW/2 - 380;
			$.players['gamePlayerContainer'+ 1].x = canvasW/2 + 380;
			$.players['gamePlayerContainer'+ 0].y = $.players['gamePlayerContainer'+ 1].y = canvasH/2;
			
			//result
			itemResult.visible = true;
			itemResultP.visible = false;
			
			buttonFacebook.x = canvasW/100*43;
			buttonFacebook.y = canvasH/100*57;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*57;
			buttonWhatsapp.x = canvasW/100*57;
			buttonWhatsapp.y = canvasH/100*57;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 68;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 52;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 37;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 45;
			
			//exit
			itemExit.visible = true;
			itemExitP.visible = false;

			buttonConfirm.x = (canvasW/2) - 140;
			buttonConfirm.y = (canvasH/100 * 68);
			
			buttonCancel.x = (canvasW/2) + 140;
			buttonCancel.y = (canvasH/100 * 68);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 37;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 45;

			//room
			$('#roomWrapper').removeClass('forPortrait');
			$('#notificationHolder').removeClass('forPortrait');
			$('#roomlists').attr('size', 10);
			$('#namelists').attr('size', 10);
			$('#roomLogs').attr('rows', 10);
		}else{
			boardContainer.x = canvasW/2;
			boardContainer.y = canvasH/100 * 37;

			bg.visible = false;
			bgP.visible = true;

			logo.visible = false;
			logoP.visible = true;

			if(customSettings.enable){
				buttonClassic.x = (canvasW/2)
				buttonClassic.y = canvasH/100 * 73;

				buttonCustom.x = (canvasW/2)
				buttonCustom.y = canvasH/100 * 85;
				buttonCustom.visible = true;
			}else{
				buttonClassic.x = canvasW/2;
				buttonClassic.y = canvasH/100 * 75;
				buttonCustom.visible = false;
			}

			buttonOnePlayer.x = canvasW/2;
			buttonOnePlayer.y = canvasH/100 * 73;

			buttonTwoPlayer.x = canvasW/2;
			buttonTwoPlayer.y = canvasH/100 * 85;
			
			buttonLocal.x = canvasW/2;
			buttonLocal.y = canvasH/100 * 73;

			buttonOnline.x = canvasW/2;
			buttonOnline.y = canvasH/100 * 85;

			buttonStart.x = canvasW/2;
			buttonStart.y = canvasH/100 * 75;

			//custom
			itemCustom.visible = false;
			itemCustomP.visible = true;

			customTitleTxt.x = canvasW/2;
			customTitleTxt.y = canvasH/100 * 40;

			buttonCustomStart.x = canvasW/2;
			buttonCustomStart.y = canvasH/100 * 64;
			
			buttonSizeL.x = canvasW/2 - 200;
			buttonSizeR.x = canvasW/2 + 200;
			itemNumberSize.x = canvasW/2;
			sizeTxt.x = canvasW/2;
			itemNumberSize.y = buttonSizeL.y = buttonSizeR.y = canvasH/100 * 50;
			sizeTxt.y = itemNumberSize.y + 15;

			//players
			vsTxt.x = canvasW/2;
			vsTxt.y = canvasH/2;

			$.players['playerContainer'+ 0].x = canvasW/2 - 180;
			$.players['playerContainer'+ 1].x = canvasW/2 + 180;
			$.players['playerContainer'+ 0].y = $.players['playerContainer'+ 1].y = canvasH/2;

			buttonPlayersIcon.x = canvasW/2 - 50;
			buttonPlayersIcon.y = canvasH/100 * 60;

			buttonPlayersSwitch.x = canvasW/2 + 50;
			buttonPlayersSwitch.y = canvasH/100 * 60;

			buttonPlayersStart.x = canvasW/2;
			buttonPlayersStart.y = canvasH/100 * 75;

			//game
			$.players['gamePlayerContainer'+ 0].x = canvasW/2 - 150;
			$.players['gamePlayerContainer'+ 1].x = canvasW/2 + 150;
			$.players['gamePlayerContainer'+ 0].y = $.players['gamePlayerContainer'+ 1].y = canvasH/100 * 77;
			
			//result
			itemResult.visible = false;
			itemResultP.visible = true;
			
			buttonFacebook.x = canvasW/100*39;
			buttonFacebook.y = canvasH/100*56;
			buttonTwitter.x = canvasW/2;
			buttonTwitter.y = canvasH/100*56;
			buttonWhatsapp.x = canvasW/100*61;
			buttonWhatsapp.y = canvasH/100*56;
			
			buttonContinue.x = canvasW/2;
			buttonContinue.y = canvasH/100 * 64;
	
			resultShareTxt.x = canvasW/2;
			resultShareTxt.y = canvasH/100 * 52;
	
			resultTitleTxt.x = canvasW/2;
			resultTitleTxt.y = canvasH/100 * 40;
	
			resultDescTxt.x = canvasW/2;
			resultDescTxt.y = canvasH/100 * 47;
			
			//exit
			itemExit.visible = false;
			itemExitP.visible = true;

			buttonConfirm.x = (canvasW/2) - 130;
			buttonConfirm.y = (canvasH/100 * 64);
			
			buttonCancel.x = (canvasW/2) + 130;
			buttonCancel.y = (canvasH/100 * 64);

			popTitleTxt.x = canvasW/2;
			popTitleTxt.y = canvasH/100 * 40;
			
			popDescTxt.x = canvasW/2;
			popDescTxt.y = canvasH/100 * 48;

			//room
			$('#roomWrapper').addClass('forPortrait');
			$('#notificationHolder').addClass('forPortrait');
			$('#roomlists').attr('size', 8);
			$('#namelists').attr('size', 8);
			$('#roomLogs').attr('rows', 6);
		}
	}
}



/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		
		buttonSettings.x = (canvasW - offset.x) - 50;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 65;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);
		}

		resizeSocketLog()
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}