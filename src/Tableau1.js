class Tableau1 extends Phaser.Scene{

//it's froggy time

    preload(){
        this.load.image('carre','asset/carre.png');
        this.load.image('cercle','asset/cercle.png');

    }

    create(){

        this.hauteur = 800
        this.largeur = 800
        this.speedX = 0
        while(this.speedY===0){
            this.speedY = 500*Phaser.Math.Between(-1,1)
        }
        this.speedX = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500

        //---------------------------------------------

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'cercle')
        this.balle.setDisplaySize(20, 20)
        this.balle.body.setBounce(1,1);
        this.balle.body.setAllowGravity(false)


        this.haut = this.physics.add.sprite(0, 0, 'carre').setOrigin(0, 0)
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true);
        this.haut.flipY=true;
        this.haut.flipX=true;

        this.gauche = this.physics.add.sprite(0, 0, 'carre').setOrigin(0, 0)
        this.gauche.setDisplaySize(20 ,this.hauteur)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true);

        this.droite = this.physics.add.sprite(780, 0, 'carre').setOrigin(0, 0)
        this.droite.setDisplaySize(20, this.hauteur)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true);

        for(let i=0;i<9;i++){
            this.brique = this.physics.add.sprite(i*61, 200, "carre").setDisplaySize(60,30).setOrigin(-2,2)
            this.physics.add.collider(this.balle, this.brique)
            this.brique.setImmovable(true);
        }
        for(let i=0;i<9;i++){
            this.brique = this.physics.add.sprite(i*61, 231, "carre").setDisplaySize(60,30).setOrigin(-2,2)
            this.physics.add.collider(this.balle, this.brique)
            this.brique.setImmovable(true);
        }
        for(let i=0;i<9;i++){
            this.brique = this.physics.add.sprite(i*61, 262, "carre").setDisplaySize(60,30).setOrigin(-2,2)
            this.physics.add.collider(this.balle, this.brique)
            this.brique.setImmovable(true);
        }
        for(let i=0;i<9;i++){
            this.brique = this.physics.add.sprite(i*61, 293, "carre").setDisplaySize(60,30).setOrigin(-2,2)
            this.physics.add.collider(this.balle, this.brique)
            this.brique.setImmovable(true);
        }
        for(let i=0;i<9;i++){
            this.brique = this.physics.add.sprite(i*61, 324, "carre").setDisplaySize(60,30).setOrigin(-2,2)
            this.physics.add.collider(this.balle, this.brique)
            this.brique.setImmovable(true);
        }

        this.player = this.physics.add.sprite(300, 700, 'carre').setOrigin(0, 0)
        this.player.setDisplaySize(200,20)
        this.player.body.setAllowGravity(false)
        this.player.setImmovable(true);

        let me = this;
        this.physics.add.collider(this.player, this.balle,function(){
            me.rebond(me.player)
        })


        this.physics.add.collider(this.balle, this.gauche)
        this.physics.add.collider(this.balle, this.droite)
        this.physics.add.collider(this.balle, this.haut)


        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.physics.add.collider(this.gauche, this.player)
        this.physics.add.collider(this.droite, this.player)
        this.physics.add.collider(this.haut, this.player)



        this.playerSpeed = 0


        /*if(this.balle<0)
        {
            this.textplayer.setText('Score = ' + this.scoreplayer);
        }*/


        this.balleAucentre();
        this.initKeyboard()

    }

    /*bord() {
        if(this.player.x>=780) {
            this.player.x = 780
        }
        if(this.player.x<=20) {
            this.player.x = 20
        }
    }*/

    rebond() {

        this.rando = this.balle.x - this.player.x
        this.coeff = this.rando / 100
        this.coeff = this.coeff * 10 - 5
        this.balle.setVelocityX(this.balle.body.velocity.x + this.coeff * 50)
        console.log(this.balle.x, this.balle.y)
    }



    balleAucentre(){
        this.balle.x = 400
        this.balle.y = 760
        this.speedX = 0

        this.balle.setVelocityY(Math.random()>0.5?-300:300)
        this.balle.setVelocityX(0)

        this.player.y=780
        this.player.x=300
    }

    /**
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    update(){
        if(this.balle.y > this.hauteur){
            this.balleAucentre()
        }

        this.player.x += this.playerSpeed
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.playerSpeed = 7
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.playerSpeed = -7
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.playerSpeed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.playerSpeed = 0
                    break;
            }
        });
    }
}

