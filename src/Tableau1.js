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
        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
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

        this.brique = this.physics.add.sprite(600, 300, 'carre').setOrigin(0, 0)
        this.brique.setDisplaySize(60, 30)
        this.brique.setImmovable(true);

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
        this.physics.add.collider(this.balle, this.brique)

        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.physics.add.collider(this.gauche, this.player)
        this.physics.add.collider(this.droite, this.player)


        this.playerSpeed = 0


        /*if(this.balle<0)
        {
            this.scoreplayer2 +=1;
            this.textplayer1.setText('Player 1 = ' + this.scoreplayer1);

        }

        this.joueurGauche = new Joueur('Froppy','joueurGauche')
        this.joueurDroite = new Joueur('Crappy','joueurDroite')
        window.toto=this.joueurGauche;
        console.log(this.joueurGauche)*/


        this.balleAucentre();
        this.initKeyboard()

    }

    rebond(player) {

        this.rando = this.balle.y - player.y
        this.coeff = this.rando / 100
        this.coeff = this.coeff * 10 - 5
        this.balle.setVelocityY(this.balle.body.velocity.y + this.coeff * 50)
        console.log(this.balle.x, this.balle.y)
    }



    balleAucentre(){
        this.balle.x = 400
        this.balle.y = 760
        this.speedX = 0

        this.balle.setVelocityY(Math.random()>0.5?-300:300)
        this.balle.setVelocityX(0)

        this.player.y=780
    }

    /**
     *
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
            this.balle.setY(760)
        }

        this.player.y += this.playerSpeed
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.right:
                    me.playerSpeed = -10
                    break;
                case Phaser.Input.Keyboard.KeyCodes.left:
                    me.playerSpeed = 10
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.right:
                    me.playerSpeed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.left:
                    me.playerSpeed = 0
                    break;
            }
        });
    }
}

