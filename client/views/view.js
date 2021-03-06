var boardDimensions = {
  height: 750,
  width: 1550
};

/**********************************************************
  MAP VIEW
**********************************************************/

var map = () => {
  d3.select('.map').html('');

  var board = d3.select('.map').append('svg')
    .attr('class', 'map')
    .attr('width', boardDimensions.width)
    .attr('height', boardDimensions.height)
    .style('background-image', 'url("../../img/onett.jpg")');

  /**********************************************************
    NESS
  **********************************************************/

  var ness = {
    character: null, 
    get: () => {
      $.ajax({
        url: 'http://localhost:8080/heroes',
        type: 'GET',
        success: function(data) {
          console.log('We found Ness!', data);
          ness.character = data;
          ness.place(ness.character);
        },
        error: function(data) {
          console.log('Where in the world is Ness???');
        }
      });
    },
    place: (hero) => {
      board.selectAll('.ness')
        .data(hero, function(d) { return d; })
        .enter() 
        .append('image')
        .attr('class', 'ness')
        .attr('x', 807)
        .attr('y', 225)
        .attr('height', 30)
        .attr('width', 30)
        .attr('xlink:href', '../../img/ness-walking-down.gif') 
        .on('mouseover', () => {
          board.selectAll('.ness')
            .attr('xlink:href', '../../img/ness-peace.png');
        })
        .on('mouseout', () => {
          board.selectAll('.ness')
            .attr('xlink:href', '../../img/ness-walking-down.gif');
        })
        .on('click', () => {
          console.log(d3.select(this).attr('x') - 10);
        });
    },
    move: {
      left: () => {
        board.selectAll('.ness')
          .attr('x', +board.selectAll('.ness').attr('x') - 4)
          .attr('xlink:href', '../../img/ness-walking-left.gif');
      },
      up: () => {
        board.selectAll('.ness')
          .attr('y', +board.selectAll('.ness').attr('y') - 4)
          .attr('xlink:href', '../../img/ness-walking-up.gif');
      },
      // TO DO: trim edges on ness-walking-right.gif
      right: () => {
        board.selectAll('.ness')
          .attr('x', +board.selectAll('.ness').attr('x') + 4)
          .attr('xlink:href', '../../img/ness-walking-right.gif');
      },
      down: () => {
        board.selectAll('.ness')
          .attr('y', +board.selectAll('.ness').attr('y') + 4)
          .attr('xlink:href', '../../img/ness-walking-down.gif');
      }
    }
  };

  // Move Ness
  d3.select('body')
    .on('keydown', () => {
      if (d3.event.keyCode === 37) {
        ness.move.left();
      } else if (d3.event.keyCode === 38) {
        ness.move.up();
      } else if (d3.event.keyCode === 39) {
        ness.move.right();
      } else if (d3.event.keyCode === 40) {
        ness.move.down();
      }
    });

  /**********************************************************
    VEHICLES
  **********************************************************/

  var runawayFive = {
    place: () => {
      board.selectAll('.runawayFive').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'runawayFive')
        .attr('x', 270)
        .attr('y', 225)
        .attr('height', 80)
        .attr('width', 80)
        .attr('xlink:href', '../img/runaway5.png');
    },
    move: () => {
      board.selectAll('.runawayFive')
        .transition().duration(14000)
        .attr('x', 1900)
        .attr('y', 225);
    }
  };

  var recycleTruck = {
    place1: () => {
      board.selectAll('.recycle').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'recycle')
        .attr('x', 1900)
        .attr('y', 210)
        .attr('height', 80)
        .attr('width', 80)
        .attr('xlink:href', '../img/recycle-truck-left.png');
    },
    moveLeft1: () => {
      board.selectAll('.recycle')
        .transition().duration(8000)
        .attr('x', 1150)
        .attr('y', 210);
    },
    remove: () => {
      board.selectAll('.recycle').remove();
    },
    place2: () => {
      board.selectAll('.recycle').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'recycle')
        .attr('x', 1140)
        .attr('y', 230)
        .attr('height', 65)
        .attr('width', 65)
        .attr('xlink:href', '../img/recycle-truck-downleft.png');
    },
    moveDown1: () => {
      board.selectAll('.recycle')
        .transition().duration(4000)
        .attr('x', 805)
        .attr('y', 565);
    },
    place3: () => {
      board.selectAll('.recycle').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'recycle')
        .attr('x', 805)
        .attr('y', 550)
        .attr('height', 80)
        .attr('width', 80)
        .attr('xlink:href', '../img/recycle-truck-left.png');
    },
    moveLeft2: () => {
      board.selectAll('.recycle')
        .transition().duration(4000)
        .attr('x', 535)
        .attr('y', 550);
    },
    place4: () => {
      board.selectAll('.recycle').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'recycle')
        .attr('x', 535)
        .attr('y', 550)
        .attr('height', 65)
        .attr('width', 65)
        .attr('xlink:href', '../img/recycle-truck-downleft.png');
    },
    moveDown2: () => {
      board.selectAll('.recycle')
        .transition().duration(4000)
        .attr('x', 250)
        .attr('y', 850);
    }
  };

  var placeVehicles = function() {
    recycleTruck.place1();
    runawayFive.place();
    runawayFive.move();
    
    recycleTruck.moveLeft1();
    setTimeout(function() {
      recycleTruck.remove();
    },8000);
    setTimeout(function() {
      recycleTruck.place2();
    }, 8000);
    setTimeout(function() {
      recycleTruck.moveDown1();
    }, 8200);
    setTimeout(function() {
      recycleTruck.remove();
    },12000);
    setTimeout(function() {
      recycleTruck.place3();
    }, 12000);
    setTimeout(function() {
      recycleTruck.moveLeft2();
    }, 12000);
    setTimeout(function() {
      recycleTruck.remove();
    }, 16000);
    setTimeout(function() {
      recycleTruck.place4();
    }, 16000);
    setTimeout(function() {
      recycleTruck.moveDown2();
    }, 16000);
  };

  /**********************************************************
    ENEMIES
  **********************************************************/

  var enemiesArray = [];

  var getEnemies = function() {
    $.ajax({
      url: 'http://localhost:8080/enemies',
      type: 'GET',
      success: function(data) {
        console.log('Successfully retrieved enemy data!', data);
        enemiesArray = enemiesArray.concat(data);
        placeEnemy(enemiesArray);
      },
      error: function(data) {
        console.log('Failed getting data...');
      }
    });
  };

  var placeEnemy = function(enemiesArray) {
    board.selectAll('.enemy')
      .data(enemiesArray, function(d) { return d; })
      .enter()
      .append('image')
      .attr('class', 'enemy')
      .attr('x', Math.floor(Math.random() * Number(boardDimensions.width)))
      .attr('y', Math.floor(Math.random() * Number(boardDimensions.height)))
      .attr('height', function(d) { return d.imgHeight; })
      .attr('width', function(d) { return d.imgWidth; })
      .attr('xlink:href', function(d) { return d.img; });
  };

  /**************************************************************
    COLLISION
  **************************************************************/

  var distance = function(playerX, playerY, enemyX, enemyY) {
    var x = playerX - enemyX;
    var y = playerY - enemyY;
    var dist = Math.floor(Math.sqrt((x * x) + (y * y)));

    return dist;
  };

  var collision = function() {
    var playerX = +board.selectAll('.ness').attr('x');
    var playerY = +board.selectAll('.ness').attr('y');

    var enemyX = +board.selectAll('.enemy').attr('x');
    var enemyY = +board.selectAll('.enemy').attr('y');

    var dist = distance(playerX, playerY, enemyX, enemyY);

    if (dist < 175) {
      // Move enemies
      board.selectAll('.enemy')
        .data(enemiesArray, function(d) { return d; })
        .transition().duration(250)
        .attr('class', 'enemies')
        .attr('x', playerX)
        .attr('y', playerY);

      clearInterval(collisionInterval);

      setTimeout(function() {
        switchToBattle();
      }, 350);
    }
  };

  var collisionInterval = setInterval(collision, 100);

  /**********************************************************
    INITIALIZE
  **********************************************************/  

  var initialize = () => {
    ness.get();
    // ness.place();
    placeVehicles();
    runawayFive.move();
    getEnemies();
    collisionInterval;
  };

  initialize();

};















/**********************************************************
  BATTLE VIEW
**********************************************************/

var battle = () => {
  d3.select('.battle').html('');

  var board = d3.select('.battle').append('svg')
    .attr('class', 'map')
    .attr('width', boardDimensions.width)
    .attr('height', boardDimensions.height)
    .style('background-image', 'url("../img/battle-bg.jpg")');

  var nessBattle = {
    place: () => {
      board.selectAll('.nessBattle').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'nessBattle')
        .attr('x', 700)
        .attr('y', 550)
        .attr('height', 200)
        .attr('width', 200)
        .attr('xlink:href', '../img/ness-battle.png');
    }
  };

  var pokey = {
    place: () => {
      board.selectAll('.pokey').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'pokey')
        .attr('x', 550)
        .attr('y', 120)
        .attr('height', 350)
        .attr('width', 500)
        .attr('xlink:href', 'http://walkthrough.starmen.net/earthbound/image/enemies/heavilyarmedpokey.png')
        .on('click', function() {
          battleMenu.place();
        });
    }
  };

  var battleMenu = {
    place: () => {
      board.selectAll('.battleMenu').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'battleMenu')
        .attr('x', 2)
        .attr('y', -101)
        .attr('height', 350)
        .attr('width', 500)
        .attr('xlink:href', '../img/battle-menu.png')
        .on('click', function() {
          smash.place();
          setInterval(smash.remove, 1000);
        });
    }
  };

  var smash = {
    place: () => {
      board.selectAll('.smash').data([{x: 0, y: 0}])
        .enter() 
        .append('image')
        .attr('class', 'smash')
        .attr('x', 550)
        .attr('y', 150)
        .attr('height', 350)
        .attr('width', 500)
        .attr('xlink:href', '../img/smash.gif');
    },
    remove: () => {
      board.selectAll('.smash').remove();
    }
  };

  var hitPoints = {
    place: () => {
      // board.selectAll('.hp').data([{x: 0, y: 0}])
      //   .enter() 
      //   .append('image')
      //   .attr('class', 'hp')
      //   .attr('x', 400)
      //   .attr('y', 400)
      //   .attr('height', 350)
      //   .attr('width', 500)
      //   .attr('xlink:href', '../img/battle-menu.png');
    }
  };

  var initialize = () => {
    nessBattle.place();
    pokey.place();
  };

  initialize();
};

/**********************************************
  SWITCH VIEW FUNCTIONS
**********************************************/

var switchToMap = function() {
  window.location = '#/map';
  setTimeout(function() {
    map();
  }, 100);
};

var switchToBattle = function() {
  window.location = '#/battle';
  setTimeout(function() {
    battle();
  }, 100)
};













