# Entry 3
##### 2/8/26

### Context
I want to build a **match-3 puzzle game** using cats as the characters. My idea was to make my game look like it has three layers. One layer was the cat king, which was the bottom layer. The second layer was the jelly, and it covered the cat king. Finally, the top layer, which the players would interact with, was the cat candy. The player need to match the cat candies and destory the jelly to save the cat king. My minimum valuable product for this project was just the cat candy layer, and I will create it using [phaser](https://docs.phaser.io/phaser/getting-started/what-is-phaser). 

### Tool
Before the winter break, I found a bug in my code. My sprites swap positions when I drag one sprite, but it did not when I drag the other. During the winter break, I realized that it was because I did not give the `draggend` function to my other sprite. So I create a function that will swap the position of the sprite that I am dragging right now with the sprite that I drag to. 

``` js
dragend(dragged) {
    var other; 
    if(dragged == this.roachCat){
        other = this.catFood;
    } else {
        other = this.roachCat;
    }

    const overlap = Phaser.Geom.Intersects.RectangleToRectangle( // checks if the two sprites overlap or not by checking if their bounds intersect
        dragged.getBounds(),
        other.getBounds()
    );

    if (overlap) {
        this.swapCandies(dragged, other); // swap when overlap 
    } else {
        dragged.setPosition(dragged.originalX, dragged.originalY); // go back to original when do not overlap
    }
}
```

From the [Phaser documentation](https://docs.phaser.io/api-documentation/namespace/physics-matter-components-transform#setposition), I learned a better way to change the positions of my sprites.  
`setPosition(x,y)` - set the position of the sprite.

``` js
this.roachCat.on("dragend", () => {
    this.dragend(this.roachCat);
});

this.catFood.on("dragend", () => {
    this.dragend(this.catFood);
});
```
When both sprites are assigned with the `dragend` function, they will swap positions no matter which one is dragged. 

But when they swap their posistions, they were too close to each other. I found out that it was because the sprites were swapping their current position, not their original position. 
``` js
 // Swap positions
    c1.setPosition(c2.x, c2.y); // current position 
    c2.setPosition(tempX, tempY);
```
So I change the order to swap their original posistions first then set their positions to their new original posistions. 

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
### Plan
I want to make a 5*5 grid of sprites using my tool. I think I will use nested array and loops to help me add different sprites into the grid. I also need to make some changes to my functions, so that it is not specific to only two sprites but with all of the sprites no matter which one I drag. 

### EDP
I am on the **Brainstorm** and **Plan** stages because I already thought up what functions I am going to use, and I need to plan out how to use them. 

### Skills
#### Attention to detail
For the `swapCandies` function, I update each sprite’s original position first, then move them to their new original positions. This ensures each swap is based on the previous one and not from the beginning of the game. 

#### Logical reasoning
In the `dragend` function, when I drag `roachCat`, the other object will be `catFood`, and when I drag `catFood`, the other object will be `roachCat`. Then the dragging object will swap position with the other object when they overlap.



[Previous](entry02.md) | [Next](entry04.md)

[Home](../README.md)