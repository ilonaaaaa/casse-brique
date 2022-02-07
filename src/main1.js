let gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    backgroundColor: '#00000',
    parent: 'game',
    disableWebAudio: true,
    physics: {
        default: 'arcade',
    },
    scene: new Tableau1()

};
let game = new Phaser.Game(gameConfig);
