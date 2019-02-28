import kitronik = kitronik_motor_driver



let Right_Detector = 0
let Left_Detector = 0
let black = 0
let white = 1


pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)

// 0 is the black line
// 1 is the white background
// motor1 is the left 3V DC motor
// motor2 is he right 3V DC motor

basic.forever(function () {
    Right_Detector = pins.digitalReadPin(DigitalPin.P2)
    Left_Detector = pins.digitalReadPin(DigitalPin.P1)
    if (Right_Detector == white && Left_Detector == black) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 30)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 30)
    } else if (Right_Detector == black && Left_Detector == black) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 30)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 15)
    } else if (Right_Detector == black && Left_Detector == white) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, 30)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, 15)
    } else if (Right_Detector == white && Left_Detector == white) {
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 15)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 30)
    }
}) 

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

// runForMS(10, 10, 10)
// runForMS(0, 0, 10)
// runForMS(-10, -10, 10)
// runForMS(0, 0, 10)
// venstre, højre, tid

input.onButtonPressed(Button.A, function () {
    runForMS(30, 30, 1000)
})