class Scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }

    preload() {
        this.load.image("roachCat", "sprites/roachCat.PNG");
        this.load.image("catFood", "sprites/catFood.PNG");
    }

    create() {
        // create roachCat
        this.roachCat = this.add.image(200, 200, "roachCat");
        this.roachCat.setScale(0.1);
        this.roachCat.setInteractive({ draggable: true });
        this.roachCat.on("drag", function(pointer, dragX, dragY){
            this.roachCat.setPosition(dragX, dragY);
        }, this);

        this.roachCat.originalX = this.roachCat.x;
        this.roachCat.originalY = this.roachCat.y;


        // create catFood
        this.catFood = this.add.image(200, 400, "catFood");
        this.catFood.setScale(0.1);
        this.catFood.setInteractive({ draggable: true });
        this.catFood.on("drag", function(pointer, dragX, dragY){
            this.catFood.setPosition(dragX, dragY);
        }, this);

        this.catFood.originalX = this.catFood.x;
        this.catFood.originalY = this.catFood.y;

        this.physics.add.existing(this.roachCat);
        this.physics.add.existing(this.catFood);

        this.physics.add.overlap(this.roachCat, this.catFood, this.swapCandies, null, this);
    };

    swapCandies(c1, c2) {

        // Store c1’s original position
        let tempX = c1.originalX;
        let tempY = c1.originalY;

        // Swap their original positions
        c1.originalX = c2.originalX;
        c1.originalY = c2.originalY;
        c2.originalX = tempX;
        c2.originalY = tempY;

        // move them to their new positions
        c1.x = c1.originalX;
        c1.y = c1.originalY;
        c2.x = c2.originalX;
        c2.y = c2.originalY;
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: [Scene1]
};

new Phaser.Game(config);

