/* 
    Proyecto cubitos

*/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    //this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'http://labs.phaser.io/assets/skies/bigsky.png');
    this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png');
    this.load.image('red', 'http://labs.phaser.io/assets/particles/red.png');
    this.load.image('suelo', 'assets/suel.png')
    //this.load.image('block', 'assets/sprites/block.png');

    /*
        Musica del juego
    */

    //this.load.audio('theme', 'https://labs.phaser.io/assets/audio/sd-ingame1.wav');

    this.load.spritesheet('dude',
        'http://labs.phaser.io/assets/sprites/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

}

function create() {

    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);

    //this.add.image(400, 300, 'sky');
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);
    this.add.image(0, 0, 'sky').setOrigin(0);
    this.add.image(1920, 0, 'sky').setOrigin(0).setFlipX(true);
    this.add.image(0, 1080, 'sky').setOrigin(0).setFlipY(true);
    this.add.image(1920, 1080, 'sky').setOrigin(0).setFlipX(true).setFlipY(true);

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'suelo').setScale(20, 0.2).refreshBody();

    platforms.create(600, 400, 'suelo');
    platforms.create(50, 250, 'suelo');
    platforms.create(750, 220, 'suelo');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    player.body.setGravityY(300);
    this.cameras.main.startFollow(player, platforms, 0.05, 0.05);
    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();



}

function update() {

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

}

