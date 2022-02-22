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

let score = 0
let scoreText

function ColisionDiamante(player, diamante) {
    diamante.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}

function meta(player, bomb) {
     
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
    alert(`tu puntuacion fue: ${score}`)
    if(gameOver === true)location.reload() ;
}

function preload() {
    
    this.load.image('sky', 'http://labs.phaser.io/assets/skies/bigsky.png');
    this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png');
    this.load.image('red', 'http://labs.phaser.io/assets/particles/red.png');
    this.load.image('suelo', 'assets/plataformas.png')
    this.load.image('bg', 'assets/nieve.jpg');
    this.load.image('diamante', 'http://labs.phaser.io/assets/sprites/diamond.png');
    this.load.image('meta', 'assets/meta.png');
    // sprite
    this.load.spritesheet('dude',
        'assets/du.png',
        { frameWidth: 40.6, frameHeight: 48 }
    );

}

function create() {

    this.cameras.main.setBounds(0, 0, 1280 * 2, 720 * 2);

    //this.add.image(400, 300, 'sky');
    this.physics.world.setBounds(0, 0, 1280 * 2, 720 * 2);
    this.add.image(0, 0, 'bg').setOrigin(0);
    this.add.image(1280, 0, 'bg').setOrigin(0).setFlipX(true);
    this.add.image(0, 720, 'bg').setOrigin(0).setFlipY(true);
    this.add.image(1280, 720, 'bg').setOrigin(0).setFlipX(true).setFlipY(true);

    platforms = this.physics.add.staticGroup();

    /*
        plataformas grandes
    */

    platforms.create(400, 568, 'suelo').setScale(4, 0.5).refreshBody();
    platforms.create(600, 728, 'suelo').setScale(4, 0.5).refreshBody();
    platforms.create(970, 980, 'suelo').setScale(6, 0.5).refreshBody();
    platforms.create(1000, 1300, 'suelo').setScale(100, 0.5).refreshBody();
    /*
        plataformas chiquitas
    */

    platforms.create(600, 400, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(1700, 300, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(1200, 250, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(750, 220, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(2100, 180, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(120, 200, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(1500, 470, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(1600, 590, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(2300, 555, 'suelo').setScale(1, 0.2).refreshBody();
    platforms.create(400, 1200, 'suelo').setScale(1, 0.2).refreshBody();

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 3 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    player.body.setGravityY(300);
    this.physics.add.collider(player, platforms);
    //camara para que siga al jugador
    this.cameras.main.startFollow(player, platforms, 0.05, 0.05);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    //creacion del cursor, para mover el personaje
    cursors = this.input.keyboard.createCursorKeys();
    //grupo statico de diamantes
    diamantes = this.physics.add.staticGroup()
    /*
        creacion de los diamentes y colocacion
    */
    for (let index = 0; index < 200; index++) {
        
        diamantes.create(Phaser.Math.Between(0, 2300), Phaser.Math.Between(0, 1200), 'diamante').setScale(0.8, 0.8).refreshBody();

    }
    
    this.physics.add.collider(diamantes, platforms);
    this.physics.add.collider(player, diamantes, ColisionDiamante, null, this);

    metas = this.physics.add.staticGroup();

    metas.create(2300, 350, 'meta').setScale(0.1, 0.1).refreshBody();
    this.physics.add.collider(metas, platforms);

    this.physics.add.collider(player, metas, meta, null, this);

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
        player.setVelocityY(-630);
    }

}

