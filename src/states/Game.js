/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#EDEEC9';
    }
    preload() {
        this.load.tilemap('mapJson', '../assets/map/sample_map2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('Roguelike', '../assets/Spritesheet/roguelikeSheet_transparent.png');
        this.load.spritesheet('player', '../assets/images/BODY_male.png',16,16,9);
    }

    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        const map = game.add.tilemap('mapJson');
        map.addTilesetImage('Roguelike', 'Roguelike');
        console.log(map);
        const layer = map.createLayer('Ground/terrain');
        const overlayLayer = map.createLayer('Ground overlay');
        const objectsLayer = map.createLayer('Objects');
        this.objectsLayer = objectsLayer;
        const otherLayer = map.createLayer('Doors/windows/roof');
        layer.resizeWorld();
        overlayLayer.resizeWorld();
        objectsLayer.resizeWorld();
        otherLayer.resizeWorld();
        // map.setCollisionByIndex(5);
        map.setCollisionBetween(1, 10000, true, this.objectsLayer);
        this.cursors = game.input.keyboard.createCursorKeys();
        this.p = game.add.sprite(300, 100, 'player');
        this.p.animations.add('walk');
        this.p.animations.play('walk', 20, true);
        game.physics.enable(this.p);
        game.physics.arcade.gravity.y = 0;
        this.camera.follow(this.p);
    }

    update() {
        const p = this.p;
        const cursors = this.cursors;
        game.physics.arcade.collide(p, this.objectsLayer);
        p.body.velocity.x=0;
        p.body.velocity.y=0;
        if (cursors.up.isDown) {
            p.body.velocity.y = -200;
        }
        
        if (cursors.left.isDown) {
            p.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            p.body.velocity.x = 150;
        } else if (cursors.down.isDown) {
            p.body.velocity.y = 150
        } else if (cursors.up.isDown) {
            p.body.velocity.y = -150
        }
        // if (cursors.left.isDown) {
        //     game.camera.x -= 4;
        // } else if (cursors.right.isDown) {
        //     game.camera.x += 4;
        // }
        // 
        // if (cursors.up.isDown) {
        //     game.camera.y -= 4;
        // } else if (cursors.down.isDown) {
        //     game.camera.y += 4;
        // }
    }

    render() {
        if (__DEV__) {}
    }
}