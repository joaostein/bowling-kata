'use strict';

var Bowling = function () {};

Bowling.prototype.result = function (rolls) {
  this.rolls = this.getFrames(rolls.split(''));
  return this.getScore();
};

Bowling.prototype.getScore = function () {
  var accumulator;
  var score = 0;

  for (var i = 0; i < this.rolls.length; i++) {
    if (i > 9)
      break;

    var currentFrame = this.rolls[i];
    var nextFrame = this.rolls[i + 1];
    accumulator = 0;

    var isStrike = this.isStrike(currentFrame[0]);
    var isSpare = this.isSpare(currentFrame[1]);

    if (isStrike || isSpare) {
      if (nextFrame)
        accumulator = this.getAccumulatorScore(isStrike, isSpare, nextFrame);
      score += (10 + accumulator);
      continue;
    }

    score += currentFrame[1] ? currentFrame[0] + currentFrame[1] : currentFrame[0];
  }

  return score;
};

Bowling.prototype.getFrames = function (rolls) {
  var singleFrame = [];
  var totalFrames = [];

  for (var i = 0; i < rolls.length; i++) {
    singleFrame.push(this.checkScoreType(rolls[i]));
    if (i % 2 !== 0 && i !== 0 || i === rolls.length - 1) {
      totalFrames.push(singleFrame);
      singleFrame = [];
    }
  }

  return totalFrames;
};

Bowling.prototype.getAccumulatorScore = function (isStrike, isSpare, nextFrame) {
  var accumulator = 0;
  var isStrikeOnNextFrame = this.isStrike(nextFrame[0]);

  if (isStrikeOnNextFrame)
    return accumulator = 10;
  if (isStrike)
    return accumulator = nextFrame[0] + nextFrame[1];
  if (isSpare)
    return accumulator = nextFrame[0];
};

Bowling.prototype.checkScoreType = function (score) {
  if (this.isSpare(score))
    return '/';
  if (this.isStrike(score))
    return 'X';
  if (score === '-')
    return 0;
  if (typeof score === 'string')
    return parseInt(score, 10);
};

Bowling.prototype.isStrike = function (input) {
  return input === 'X';
};

Bowling.prototype.isSpare = function (input) {
  return input === '/';
};

module.exports = Bowling;
