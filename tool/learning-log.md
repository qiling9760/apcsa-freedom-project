# Tool Learning Log

## Tool: Phaser

## Project: Cat Crush

---

### 10/5/25:
I linked **Math.js** to my HTML file using CDN.
- `math.evaluate()` is solving the expression.
``` JS
var num = math.evaluate('(2+3)/4');
console.log(num); // 1.5
```
It can take in variables and solve.
``` JS
var x = {x:2};
var num = math.evaluate('(2*x)/4', x );
console.log(num)
```
The second argument need to be an object, like `{ x: 2 }`. It does not work when I just write `var x = 2`.

- `math.parse()` is breaking down the expression into pieces.
``` JS
math.parse('2 * x^3');
```
- OperatorNode: *, ^
- ConstantNode: 2
- SymbolNode: x

### 11/2/25:
I decided to change my project to my backup idea, which is a candy crush game. I will use the cats I have from last year's project to make my game. 

`preload () {}` - define the asserts for the scene. 
``` js
preload() {
    this.load.image("roachCat", "sprites/roachCat.PNG");
}
```
The first `""` is how you refer to this image, and the second `""` is the source of the image. 

`create(){}` - add objects to the scene. This runs only once at the beginning of the scene. 
``` js
create() {
    this.roachCat = this.add.image(400, 350, "roachCat");
}
```
`this.XXX` - It creates a property of the scene. `this` means the current scene. The `XXX` is the property name. We can use it to store data. It is like a variable. 

`this.add.image(#, #, nameOfImage);` - This add the image to somewhere on the screen. The first number is the `x` coordinate, and the second number is the `y` coordinate. The last one is what image you want to add. 

### 11/16/25
I added my `roachCat` to the screen but it is too big. 

`.setScale() ` - set the scale of the sprite. A number greater than 1 increase the size, and a number less than 1 decrease the size.
``` js
create() {
    this.roachCat = this.add.image(200, 200, "roachCat");
    this.roachCat.setScale(0.1);
}
```
You set the scale of the sprite in the `create()` function. I need to use `this.roachCat.setScale()` and not just `roachCat.setScale()` because `roachCat` is a property of the scene. It is not a global variable. 

I need to make my sprites interactive, so I can use my mouse to control it. 

`.setInteractive()` - allow a sprite to be interactive

`.setInteractive({ draggable: true })` - allow me to drag the sprite

I try to copy the code from the documentation but it does not work.
``` js
this.roachCat.on('dragstart', function(pointer, dragX, dragY){
}, scope);
this.roachCat.on("drag", function(pointer, dragX, dragY){
    roachCat.setPosition(dragX, dragY);
}, scope);
this.roachCat.on('dragend', function(pointer, dragX, dragY, dropped){
}, scope);
```
I figure out the `scope` should be `this` by searching online because it is the scene that I am refering to. 

### 11/24/25
I figured that I only need the `drag` to drag my sprites. 
``` js
this.roachCat.on("drag", function(pointer, dragX, dragY){
    this.roachCat.setPosition(dragX, dragY);
}, this);
```
My previous code does not work because I forgot about the `this.`.
- `setPosition(x,y)`: set the position of the sprite to be that coordinate. 

I try to add candy to the game, so I made rows and columns. 
``` js
this.candy = []; // store the candies
this.x = 100; // fist candy's x
this.y = 100; // second candy's y
this.row = 5; // total row
this.col = 5; // total cal
``` 
``` js
for(let row = 0; row<this.row; row ++){
    this.candy[row] = []; // this create an array for each row of candies
}

for (let row = 0; row < this.row; row++) {
    for (let col = 0; col < this.col; col++) {
        let candy = this.add.image(this.x,this.y, "roachCat");
        this.y = this.y+200;
        candy.setInteractive({ draggable: true });
        row = itsRow; // store its row
        col = itsCol; // store its column
        this.candy[itsRow][itsCol] = candy;
    }
    this.y = 100;
    this.x = this.x+200;
}
```
This does not work. Only one candy appears.  

### 12/7/25
I need to swap my candies, so when they overlap, there positions will swap. 

`this.physics.add.existing(sprite)` add a physics body to an existing sprite. With physics body, I can check if they overlap or collide. 

`this.physics.add.overlap(sprite1, sprite2, overlapCallback, processCallback, scene)` checks if two sprites touch.  

`overlapCallback` is the function that runs when the two sprites overlap.   
`processCallback` check a condition before the `overlapCallback` run. If the condition is false, the `overlapCallback` function will not run. True then run. 

``` js
this.physics.add.overlap(this.roachCat, this.catFood, this.swapCandies, null, this);

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
```
The sprites glitched when I try to swap them. 

### 12/14/25
The sprites glitched because `overlap` runs every frame, so `cat1` was swapping with `cat2` dozens of time per second. 

I was also dragging the sprites while it was swapping, so even after the cat swapped, its position was set back to be my pointer's position. 

I need to use a function other than overlap. A function that will only detect their collision once. The dection should also happen after I finish dragging the cat. 

I need to find the boundary of my sprites, so when their boundaries touch, they swap. 

`sprite.getBounds()` get the bound of the sprite. It returns a rectangle. 
`Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB)` checks the intersection of two rectangles. Return `true` if they intersection, return `false` if not. 

``` js
var overlap = Phaser.Geom.Intersects.RectangleToRectangle(
    this.roachCat.getBounds(),
    this.catFood.getBounds()
);

if (overlap) { // swap if they overlap
    this.swapCandies(this.roachCat, this.catFood);
} else {
    // don't swap
    this.roachCat.setPosition(
        this.roachCat.originalX,
        this.roachCat.originalY
    );
    this.catFood.setPosition(
        this.catFood.originalX,
        this.catFood.originalY
    );
};
```
The cats only swap when I drag `roachCat`, but nothing happen when I drag `catFood`. 

### 1/4/26
The bug is I only give `roachCat` the `draggend` function and did not give it to `catFood`. 
``` js
dragend(dragged) {
    var other;
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
```

When I drag `roachCat`, the other object will be `catFood`, and when I drag `catFood`, the other object will be `roachCat`. Then the dragging object will swap position with the other object when they overlap. 

`setPosition(x,y)` - set the position of the sprite. 

``` js
this.roachCat.on("dragend", () => {
    this.dragend(this.roachCat);
});

this.catFood.on("dragend", () => {
    this.dragend(this.catFood);
});
```
``` js
swapCandies(c1, c2) {
    // Store current positions
    var tempX = c1.x;
    var tempY = c1.y;

    // Swap positions
    c1.setPosition(c2.x, c2.y);
    c2.setPosition(tempX, tempY);

    // update originals
    c1.originalX = c1.x;
    c1.originalY = c1.y;
    c2.originalX = c2.x;
    c2.originalY = c2.y;
}
```
When the objects swap positions, they were too close to each other. They did not swap their original positions, instead, they swap their current posistions, which is after I dragged the object. 

``` js
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
```
In here, I store the original position instead of the current position. Then I update their original posisitons, so the next swap is based on the previous swap and not based on the beggining of the game. Lastly, the objects are swapped. 

### 1/15/26
I need to make a grid of tiles. Each tile I need their `x` and `y` positions. I will make a 10x10 grid, and use an array to hold each tile's information. I used a `for loop` to add the tiles and store their information.
``` js
create() {
    var gridRows = 10;
    var gridCols = 10;
    var tileSize = 100;
    this.grid = [];


    for (var r = 0; r<gridRow; r++){
        this.grid[r] = [] // each row will have cols, [0,1,2,3] r=0
                                                    //[0,1,2,3] r=1;
                                                    // c1c2c3c4
        for (var c = 0; c<gridCol; c++){
            var x = c * tileSize; 
            var y = r * tileSize;
            var tile = this.add.image(x, y, "roachCat");
            tile.setScale(0.1);
            tile.setInteractive({ draggable: true });
            this.grid[r][c] = tile; // this.grid[2][4] is the tile on row 2 column 4
        }
    }
}
```
The sprites did not show up. 

### 3/8/26
I tried to make a grid of sprites using a `for`loop with only one sprite. 
``` js
for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {

        this.add.image(col, row, "roachCat");

    }
}
```
This code did not work because I only see half of a sprite filling up the whole screen. So I change it's scale to 0.1. But this also did not work because I only see a half of a sprite on the top left corner of the screen. Then I realize the x and y are only increasing by 1, so all the sprites must be hidden under the first sprite. 
``` js
for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {

        this.add.image(col*150, row*150, "roachCat").setScale(0.1).setOrigin(0,0);

    }
}
```
This time, the sprites in the first column only have half of their bodies in the screen, so I search online "sprite on top left corner only shows half phaser" and I found [this](https://www.html5gamedevs.com/topic/36033-setorigin-for-placement-or-for-pivotoffset-point/). So I used `setOrigin(0,0)`.

I will make an array of sprites, and when adding sprites to the grid, it will pick a random sprite from the array. 
``` js
var candy = ["roachCat", "catFood"];
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
            var num = Math.floor(Math.random() * 2);
            var cat = candy[num];
            this.add.image(col*150, row*150, cat).setScale(0.1).setOrigin(0,0);

        }
}
```

<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->
