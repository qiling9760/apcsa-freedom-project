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



<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->
