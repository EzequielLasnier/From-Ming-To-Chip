const rpio = require('rpio');

// Configuration Constants
const STEPS_PER_REV = 3200; // Change to 200 if not using microstepping
const PIN_STEP = 11;
const PIN_DIR = 13;

rpio.open(PIN_STEP, rpio.OUTPUT, rpio.LOW);
rpio.open(PIN_DIR, rpio.OUTPUT, rpio.LOW);

let currentStepPosition = 0;

/**
 * Moves the physical vase to a specific degree
 * @param {number} targetDegrees - Range 0 to 360
 */
function moveMotorToDegree(targetDegrees) {
    const targetSteps = Math.floor((targetDegrees / 360) * STEPS_PER_REV);
    let stepsToMove = targetSteps - currentStepPosition;

    if (stepsToMove === 0) return;

    // Set Direction (Clockwise vs Counter-Clockwise)
    rpio.write(PIN_DIR, stepsToMove > 0 ? rpio.HIGH : rpio.LOW);
    stepsToMove = Math.abs(stepsToMove);

    // Pulse the STEP pin
    for (let i = 0; i < stepsToMove; i++) {
        rpio.write(PIN_STEP, rpio.HIGH);
        rpio.usleep(800); // Speed control: Lower = Faster
        rpio.write(PIN_STEP, rpio.LOW);
        rpio.usleep(800);
    }

    currentStepPosition = targetSteps;
}