# Entry 1
##### 11/9/25

### My game
For this year's Freedom Project, I am going to make a **match-3 puzzle game**. My game is about rescuing a cat trapped inside a giant jelly. The giant jelly is made up of many jelly cubes, and each cube has a cat candy sitting on it. In every round, the cat appears in a different part of the jelly. The player needs match the cat candies to break the jelly and set the cat free. 

### My tool
My tool is [Phaser](https://docs.phaser.io/phaser/getting-started/installation). I want to use Phaser because it allows me to create sprites for my cat candies, and it can let the players interact with the sprites. 

### Phaser
I watched [Youtube tutorials](https://www.youtube.com/watch?v=gFXx7lgxK9A&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=2) on how to set up Phaser, but I used the CDN instead of installing Phaser onto my computer.

Before I can do anything, I need to create a Phaser game instance, so I can configure it later on. 
``` js
var game = new Phaser.Game(config);
```
I can define the basic of my game using `var config = {}`. 
``` js
var config = {
    width: 800,
    height: 600,
    scene: [Scene1, Scene2]
};
```
The `width` and `height` are the dimensions of my game. It is how big the game will take up the screen. The `scene` is where the elements live. It holds sprites, sounds, and how the game runs. There can be multiple scenes running at the same time. 

I learned how to load sprites using `preload () {}`. 
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

`this.add.image(#, #, nameOfImage)`; - This add the image to somewhere on the screen. The first number is the `x` coordinate, and the second number is the `y` coordinate. The last one is what image you want to add.

### EDP
I think I am in the **Research** and **Brainstorm** stages because I had an idea in mind for what I am going to make, but I am still thinking about what my game should include, and what I need from my tool to help me create my game.

### Skills
#### Collaboration
I had a friend who used Phaser last year as her tool for her Freedom Project, so I asked her what other sources I can use to learn Phaser, and she gave me that Youtube tutorial link. 

#### Problem decomposition 
I know that the player will play the game using their touchpad or mouse, so I need to find a function that allows them to interact with the sprites using the mouse. I also know that for the cat candies to break, they need to interact with each other, so I need to create a function that detects when they collide.


[Next](entry02.md)

[Home](../README.md)