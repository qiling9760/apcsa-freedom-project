# Entry 4
##### 3/15/26

### Context
I want to make a **match-3 puzzle game** where the player can move the sprites around to cancel the sprites. My tool is [phaser](https://docs.phaser.io/phaser/getting-started/what-is-phaser), and my sprites are cats. 

### Tool
My game needs a 10x10 grid of sprites, where each cell contains a cat sprite chosen from several different cat types. The game should randomly assign one of the cat sprites to every cell at the start of the game. The sprites should be evenly spread out in each row and column. 

I first tried to make a grid of sprites using a `for` loop with only one sprite. 

``` java
for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
        this.add.image(col, row, "roachCat");
    }
}
```
This code did not work because I only saw one sprite, and this sprite was too big that it filled up the whole screen, so I changed the scale of the sprites to 0.1. This time it also did not work because I still only see one sprite, and it is on the top left corner of the screen, and only half of it was in the screen. Then I realized the x and y are only increasing by 1, so all the sprites must be hidden under the first sprite.

``` java
for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
        this.add.image(col*150, row*150, "roachCat").setScale(0.1).setOrigin(0,0);
    }
}
```
This time, the sprites formed a 10x10 grid and filled up the screen, but the sprites in the first column only have half of their bodies showed up in the screen. I search online - "sprite on top left corner only shows half phaser" and I found [this explaination](https://www.html5gamedevs.com/topic/36033-setorigin-for-placement-or-for-pivotoffset-point/). So I used `setOrigin(0,0)` on the sprites.

I created an array to hold my sprites. When making the grid, the loop will randomly select the sprites from that array. 
``` java
var candy = ["roachCat", "catFood"];
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
            var num = Math.floor(Math.random() * 2);
            var cat = candy[num];
            this.add.image(col*150, row*150, cat).setScale(0.1).setOrigin(0,0);
        }
}
```

### EDP
I am on the **Create a prototype** stage because I already know what I am going to need for my game, and I am trying to add them to my game.

### Skills 
#### Debugging
When there was a bug, I change my code part by part to find where the error was. When changing the code did not work, I add new code. It was the size of the sprite that went wrong, so I added `.scale` to make it smaller.  

#### How to Google
When there was a bug, I summarized the problem and search on Google. I looked at different websites and tested out different solutions. And finally, I found the one that helped. 

[Previous](entry03.md) | [Next](entry05.md)

[Home](../README.md)