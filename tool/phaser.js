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

        this.roachCat.on("dragend", () => {
            this.dragend(this.roachCat);
        });

        this.catFood.on("dragend", () => {
            this.dragend(this.catFood);
        });
    }

    swapCandies(c1, c2) {
        // Store original positions
        var tempX = c1.originalX;
        var tempY = c1.originalY;

        // Swap original positions
        c1.originalX = c2.originalX;
        c1.originalY = c2.originalY;

        c2.originalX = tempX;
        c2.originalY = tempY;

        // Move sprites to their new original positions
        c1.setPosition(c1.originalX, c1.originalY);
        c2.setPosition(c2.originalX, c2.originalY);
    }


    dragend(dragged) {
        var other ;
        if(dragged == this.roachCat){
            other = this.catFood;
        } else {
            other = this.roachCat;
        }

        const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
            dragged.getBounds(),
            other.getBounds()
        );

        if (overlap) {
            this.swapCandies(dragged, other);
        } else {
            dragged.setPosition(dragged.originalX, dragged.originalY);
        }
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

