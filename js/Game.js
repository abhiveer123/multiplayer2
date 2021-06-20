class Game {
    constructor() { }
    update(state) {
        database.ref("/").update({
            gameState: state
        })

    }
    getState() {
        var gameStateref = database.ref("gameState")
        gameStateref.on("value", function (data) {
            gameState = data.val()
        })

    }
    async start() {
        if (gameState === 0) {
            player = new Player()
            var playercountref=await database.ref("playerCount").once("value")
            if(playercountref.exists()){
                playerCount=playercountref.val()
                               
             player.getCount()
            }   
     
            form = new Form()
            form.display()
        }
    }
    play() {
        form.hide()
        textSize(30)
        text("game start", 120, 100)
        Player.getPlayerInfo()
        var displayposition = 130
        for (var plr in allPlayers) {
            if (allPlayers !== undefined) {
                displayposition += 20
                textSize(15)
                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, displayposition)
                if(plr==="player"+player.index){
                    fill("red")
                }
                else{
                    fill("black")
                }
            }
        }

      if(keyIsDown(UP_ARROW)&&player.index!==null){
player.distance+=50
player.update()
      }
    }
}