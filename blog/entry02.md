# Entry 2
##### 12/21/25

### Context
My game is a **match-3 puzzle game** with cats. The player needs to match the cats together in order to break a giant jelly to save the cat king. My tool is [phaser](https://docs.phaser.io/phaser/getting-started/what-is-phaser). It can help me make an 2D interactive game. 

### Tool 
Previously, I added my sprites to the screen. However, the image is too big, so I need to reset the scale of my sprites. 

`.setScale()` set the scale of the sprite. A number greater than 1 increase the size, and a number less than 1 decrease the size.
`this.roachCat.setScale(0.1);`

I need to make my sprites interactive, so I can use my mouse to control it. 

`.setInteractive()` allow a sprite to be interactive.  
`.setInteractive({ draggable: true })` makes a sprite draggable. 

When I drag my sprites, their position should be where my mouse is. 

`setPosition(x,y)` sets the position of the sprite to be that coordinate.

``` js
this.roachCat.on("drag", function(pointer, dragX, dragY){
    this.roachCat.setPosition(dragX, dragY);
}, this);
```
The `drag` means when the sprite is being dragged. `pointer` is the information of the mouse, such as the `x` and `y` coordinates of the mouse. `dragX, dragY` are the new `x` and `y` coordinates of the sprite, and they are based on the mouse's `x` and `y` coordinates. `this` means the current scene. 

I want my sprites to switch places when they touches, so I need to set their position to be the position of each other. 

First, I need to find a way to see if the sprites collide. 

`Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB)` checks the intersection of two rectangles.   
`sprite.getBounds()` gets the bound of the sprite. 

``` js
var overlap = Phaser.Geom.Intersects.RectangleToRectangle(
    this.roachCat.getBounds(),
    this.catFood.getBounds()
);
```
This code checks if the bounds of the sprites intersect, which can tell me if they collide or not. 

If they collide, their position will change.

``` js
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
...
swapCandies(c1, c2) {
    // Store current positions
    let tempX = c1.x;
    let tempY = c1.y;

    // Swap positions
    c1.x = c2.x;
    c1.y = c2.y;
    c2.x = tempX;
    c2.y = tempY;
}
```

### Goal 
When I drag `roachCat` to touch `catFood`, the sprites swap. But when I drag `catFood` to touch `roachCat`, nothing happens. My goal over the winter break is to solve this bug. I also want to add more sprites into the game to make a grid that is similar to a typical match-3 game. 

### EDP
I think I am in the **Research** and **Brainstorm** stages because I am breaking down my game into smaller parts and and searching  functions that I can use in my game. 

### Skills 
#### Debugging
At first, I tried to use `.overlap()` to perform actions when my sprites overlap. But it did not work because `.overlap()` runs every frame, so `cat1` was swapping with `cat2` dozens of time per second, which caused a glitch. I was also dragging the sprites while it was swapping, so even after the cat swapped, its position was set back to be my pointer's position. So, I found another function which is `Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB)` to detect the intersection of my sprites. 

#### How to Google 
Because phaser has multiple pages of documentation, I ask on Google `What function on phaser that I can use for detecting collisions?` to limit my choices. I found `.collider`, `.overlap`, and finally `Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB)` on [reddit](https://www.reddit.com/r/learnprogramming/comments/df8272/how_to_detect_collisions_in_my_javascript_phaser/). 



[Previous](entry01.md) | [Next](entry03.md)

[Home](../README.md)