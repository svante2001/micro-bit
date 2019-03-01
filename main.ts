//run for ms

import kitronik = kitronik_motor_driver;

let Left_Detector = 0
let Right_Detector = 0

pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)


function runForMS(motor1: number, motor2: number, ms: number) {
    let running = true;
    control.inBackground(() => {
        if (motor1 === 0) {
            kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor1)
        } else if (motor1 < 0) {
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1,
                kitronik_motor_driver.MotorDirection.Reverse,
                Math.abs(motor1))
        } else {
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1,
                kitronik_motor_driver.MotorDirection.Forward,
                motor1);
        }
        if (motor2 === 0) {
            kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor2)
        } else if (motor2 < 0) {
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2,
                kitronik_motor_driver.MotorDirection.Reverse,
                Math.abs(motor2))
        } else {
            kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor2,
                kitronik_motor_driver.MotorDirection.Forward,
                motor2)
        }
        while (running) {
            basic.pause(1)
        }
        kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor1)
        kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor2)
    })
    basic.pause(ms)
    running = false
}

// Left motor, right motor, time in MS, see examples below
// runForMS(10, 10, 10)
// runForMS(0, 0, 10)
// runForMS(-10, -10, 10)
// runForMS(0, 0, 10)

input.onButtonPressed(Button.A, function () {
    runForMS(30, 30, 1000)
})